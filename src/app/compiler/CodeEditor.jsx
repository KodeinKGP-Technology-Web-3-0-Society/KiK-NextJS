"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import { buildItems, directiveItems, headerNames, memberItems } from "./completions";

hljs.registerLanguage("c", c);
hljs.registerLanguage("cpp", cpp);

const LINE = 22; // px; the textarea and the highlight layer must use exactly this
const PAD = 14;
const GUTTER = 48; // w-12
const ROWS = 8;
const ROW_H = 28;

const KIND = {
  function: { tag: "ƒ", cls: "text-amber-200 bg-amber-200/10" },
  type: { tag: "T", cls: "text-indigo-300 bg-indigo-300/10" },
  keyword: { tag: "K", cls: "text-sky-300 bg-sky-300/10" },
  macro: { tag: "M", cls: "text-fuchsia-300 bg-fuchsia-300/10" },
  snippet: { tag: "S", cls: "text-emerald-300 bg-emerald-300/10" },
  variable: { tag: "v", cls: "text-slate-300 bg-slate-300/10" },
  member: { tag: "m", cls: "text-cyan-300 bg-cyan-300/10" },
  header: { tag: "H", cls: "text-orange-300 bg-orange-300/10" },
  directive: { tag: "#", cls: "text-fuchsia-300 bg-fuchsia-300/10" },
};
const KIND_RANK = { snippet: 0, variable: 1, function: 2, type: 2, macro: 2, member: 2, header: 2, directive: 2, keyword: 3 };

// true when the caret sits inside a comment, string or character literal
function inNonCode(before) {
  if (before.lastIndexOf("/*") > before.lastIndexOf("*/")) return true;
  const line = before.slice(before.lastIndexOf("\n") + 1);
  let quote = null;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quote) {
      if (ch === "\\") i++;
      else if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "/" && line[i + 1] === "/") return true;
  }
  return !!quote;
}

// how well `label` matches what was typed: lower is better, null = no match
function matchScore(label, typed) {
  if (!typed) return 1;
  if (label.startsWith(typed)) return 0;
  const l = label.toLowerCase();
  const t = typed.toLowerCase();
  if (l.startsWith(t)) return 1;
  if (t.length < 3) return null; // fuzzy matching only once there is enough to go on
  let i = 0;
  for (const ch of l) if (ch === t[i] && ++i === t.length) return 2; // subsequence, e.g. "pb" -> push_back
  return null;
}

let cachedCharWidth = { key: "", w: 8 };
function charWidth(ta) {
  const cs = getComputedStyle(ta);
  const font = `${cs.fontSize} ${cs.fontFamily}`;
  if (cachedCharWidth.key !== font) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.font = font;
    cachedCharWidth = { key: font, w: ctx.measureText("MMMMMMMMMM").width / 10 };
  }
  return cachedCharWidth.w;
}

// A lightweight code editor: a transparent <textarea> on top of a syntax-highlighted layer.
// Supports Tab, auto-indent, Ctrl/Cmd+Enter to run, error markers, and VS Code style suggestions.
const CodeEditor = forwardRef(function CodeEditor({ value, onChange, lang, onRun, errorLines = [] }, ref) {
  const taRef = useRef(null);
  const codeRef = useRef(null);
  const gutterRef = useRef(null);
  const boxRef = useRef(null);
  const listRef = useRef(null);
  const skipRefresh = useRef(false);
  const [sug, setSug] = useState(null); // { items, index, start, x, y }

  const symbols = useMemo(() => buildItems(lang).symbols, [lang]);

  const html = useMemo(() => {
    try {
      return hljs.highlight(value, { language: lang }).value + "\n ";
    } catch {
      return value.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "\n ";
    }
  }, [value, lang]);

  const lineCount = value.split("\n").length;

  const sync = () => {
    const ta = taRef.current;
    if (!ta) return;
    if (codeRef.current) codeRef.current.style.transform = `translate(${-ta.scrollLeft}px, ${-ta.scrollTop}px)`;
    if (gutterRef.current) gutterRef.current.style.transform = `translateY(${-ta.scrollTop}px)`;
  };

  useImperativeHandle(ref, () => ({
    goTo(line, col = 1) {
      const ta = taRef.current;
      if (!ta) return;
      const lines = ta.value.split("\n");
      let pos = 0;
      for (let i = 0; i < Math.min(line - 1, lines.length - 1); i++) pos += lines[i].length + 1;
      pos += Math.max(0, col - 1);
      ta.focus();
      ta.setSelectionRange(pos, pos);
      ta.scrollTop = Math.max(0, (line - 4) * LINE);
      sync();
    },
  }));

  // keep the highlighted row of the popup in view
  useEffect(() => {
    if (!sug || !listRef.current) return;
    const row = listRef.current.children[sug.index];
    row?.scrollIntoView({ block: "nearest" });
  }, [sug?.index, sug?.items]);

  const insert = (text) => {
    const ta = taRef.current;
    ta.focus();
    // execCommand keeps the browser's undo history intact
    if (!document.execCommand("insertText", false, text)) {
      const { selectionStart: s, selectionEnd: e } = ta;
      onChange(ta.value.slice(0, s) + text + ta.value.slice(e));
      requestAnimationFrame(() => ta.setSelectionRange(s + text.length, s + text.length));
    }
  };

  // ---- suggestions -------------------------------------------------------------------------
  const close = () => setSug(null);

  const refresh = (force = false) => {
    const ta = taRef.current;
    if (!ta || document.activeElement !== ta) return close();
    const pos = ta.selectionStart;
    if (ta.selectionEnd !== pos) return close();
    const text = ta.value;
    const before = text.slice(0, pos);
    const lineStart = before.lastIndexOf("\n") + 1;
    const lineText = before.slice(lineStart);

    let items = null;
    let start = pos;
    let typed = "";

    let m;
    if ((m = lineText.match(/^\s*#\s*include\s*([<"])([\w/.+]*)$/))) {
      typed = m[2];
      start = pos - typed.length;
      const closer = m[1] === "<" ? ">" : '"';
      const next = text[pos];
      items = headerNames(lang).map((h) => ({
        label: h,
        kind: "header",
        detail: "header",
        insert: next === closer ? h : h + closer,
      }));
    } else if ((m = lineText.match(/^\s*#(\w*)$/))) {
      typed = m[1];
      start = pos - typed.length;
      items = directiveItems.map((d) => (d.label === "include" ? { ...d, insert: "include <", reopen: true } : d));
    } else if (inNonCode(before)) {
      return close();
    } else if ((m = lineText.match(/(?:\.|->)(\w*)$/))) {
      typed = m[1];
      start = pos - typed.length;
      items = memberItems;
    } else if ((m = lineText.match(/(?<![\w.])([A-Za-z_]\w*)$/)) || (force && (m = [""]))) {
      typed = m[1] || "";
      if (typed.length < 2 && !force) return close();
      start = pos - typed.length;
      const seen = new Set();
      const local = [];
      for (const w of text.matchAll(/[A-Za-z_]\w*/g)) {
        if (w.index <= pos && w.index + w[0].length >= pos) continue; // the word being typed
        if (w[0].length < 2 || seen.has(w[0])) continue;
        seen.add(w[0]);
        local.push({ label: w[0], kind: "variable", detail: "in this file" });
      }
      // symbols win over same-named identifiers found in the file
      items = [...symbols, ...local.filter((l) => !symbols.some((s) => s.label === l.label))];
    } else {
      return close();
    }

    const ranked = [];
    for (const it of items) {
      const score = matchScore(it.label, typed);
      if (score === null) continue;
      if (it.label === typed && it.kind !== "snippet") continue; // already fully typed
      ranked.push({ it, score });
    }
    ranked.sort(
      (a, b) =>
        a.score - b.score ||
        KIND_RANK[a.it.kind] - KIND_RANK[b.it.kind] ||
        a.it.label.length - b.it.label.length ||
        a.it.label.localeCompare(b.it.label)
    );
    const list = ranked.slice(0, 60).map((r) => r.it);
    if (list.length === 0) return close();

    // pixel position of the caret
    const cw = charWidth(ta);
    const lineIdx = before.split("\n").length - 1;
    const col = start - lineStart;
    const boxW = boxRef.current?.clientWidth ?? 600;
    const boxH = boxRef.current?.clientHeight ?? 500;
    const popW = 330;
    const popH = Math.min(list.length, ROWS) * ROW_H + 6;
    let x = GUTTER + 12 + col * cw - ta.scrollLeft - 8;
    let y = PAD + (lineIdx + 1) * LINE - ta.scrollTop + 2;
    if (y + popH > boxH) y = Math.max(4, PAD + lineIdx * LINE - ta.scrollTop - popH - 2); // flip above the line
    x = Math.max(GUTTER + 4, Math.min(x, boxW - popW - 6));

    setSug((prev) => ({
      items: list,
      index: prev && prev.start === start && prev.items[prev.index]?.label === list[0]?.label ? prev.index : 0,
      start,
      x,
      y,
    }));
  };

  const accept = (item) => {
    const ta = taRef.current;
    if (!ta || !sug) return;
    const caret = ta.selectionStart;
    ta.focus();
    ta.setSelectionRange(sug.start, caret);

    const lineStart = ta.value.lastIndexOf("\n", sug.start - 1) + 1;
    const indent = (ta.value.slice(lineStart, sug.start).match(/^[ \t]*/) || [""])[0];
    let text = item.insert ?? item.label;
    const marker = text.indexOf("$0");
    text = text.replace("$0", "").replace(/\n/g, "\n" + indent);
    // account for the indent added before the marker
    const caretOffset = marker === -1 ? text.length : marker + (text.slice(0, marker).split("\n").length - 1) * indent.length;

    skipRefresh.current = true;
    close();
    insert(text);
    const target = sug.start + caretOffset;
    requestAnimationFrame(() => {
      ta.setSelectionRange(target, target);
      skipRefresh.current = false;
      if (item.reopen) refresh(false);
    });
  };

  const onKeyDown = (e) => {
    const ta = e.currentTarget;

    if (sug) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const n = sug.items.length;
        setSug({ ...sug, index: (sug.index + (e.key === "ArrowDown" ? 1 : -1) + n) % n });
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          accept(sug.items[sug.index]);
          return;
        }
      }
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
    }

    if ((e.ctrlKey || e.metaKey) && e.key === " ") {
      e.preventDefault();
      refresh(true);
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onRun?.();
      return;
    }
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      insert("    ");
      return;
    }
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const { selectionStart: s, selectionEnd: end, value: v } = ta;
      const lineStart = v.lastIndexOf("\n", s - 1) + 1;
      const indent = (v.slice(lineStart, s).match(/^[ \t]*/) || [""])[0];
      const before = v[s - 1];
      const after = v[end];
      e.preventDefault();
      if (before === "{" && after === "}") {
        insert(`\n${indent}    \n${indent}`);
        requestAnimationFrame(() => {
          const p = s + 1 + indent.length + 4;
          ta.setSelectionRange(p, p);
        });
      } else {
        insert(`\n${indent}${before === "{" ? "    " : ""}`);
      }
    }
  };

  const errSet = new Set(errorLines);

  return (
    <div ref={boxRef} className="relative h-full min-h-[420px] overflow-hidden bg-[#0a0c11] font-mono text-[13.5px]">
      {/* line numbers */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 overflow-hidden border-r border-[#1e2333] bg-[#0d0f15] text-right text-[#475569]">
        <div ref={gutterRef} style={{ paddingTop: PAD }}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={i}
              style={{ height: LINE, lineHeight: `${LINE}px` }}
              className={`pr-3 ${errSet.has(i + 1) ? "bg-red-500/15 font-semibold text-red-400" : ""}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* highlighted layer */}
      <div className="pointer-events-none absolute inset-y-0 right-0 left-12 overflow-hidden">
        <pre
          ref={codeRef}
          aria-hidden="true"
          className="cmp-code m-0 whitespace-pre text-[#e2e8f0]"
          style={{ padding: PAD, paddingLeft: 12, lineHeight: `${LINE}px`, tabSize: 4 }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      {/* the real, transparent input. Font properties are set one by one: the `font` shorthand
          would reset line-height and make the caret drift away from the text. */}
      <textarea
        ref={taRef}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (skipRefresh.current) return;
          refresh(false);
        }}
        onScroll={() => {
          sync();
          if (sug) close();
        }}
        onKeyDown={onKeyDown}
        onKeyUp={(e) => {
          if (["ArrowLeft", "ArrowRight", "Home", "End", "Backspace"].includes(e.key)) {
            if (e.key === "Backspace") return; // onChange already re-ran the suggestions
            close();
          }
        }}
        onClick={close}
        onBlur={close}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        wrap="off"
        aria-label="Code editor"
        aria-autocomplete="list"
        className="absolute inset-y-0 right-0 left-12 resize-none overflow-auto whitespace-pre bg-transparent text-transparent caret-[#f8fafc] outline-none selection:bg-sky-400/30"
        style={{
          padding: PAD,
          paddingLeft: 12,
          fontFamily: "inherit",
          fontSize: "inherit",
          lineHeight: `${LINE}px`,
          letterSpacing: "normal",
          tabSize: 4,
        }}
      />

      {/* suggestions */}
      {sug && (
        <div
          role="listbox"
          aria-label="Suggestions"
          className="absolute z-20 w-[330px] overflow-hidden rounded-md border border-[#2a3147] bg-[#11141d] py-[3px] shadow-[0_12px_32px_rgba(0,0,0,0.55)]"
          style={{ left: sug.x, top: sug.y }}
          onMouseDown={(e) => e.preventDefault()} // keep focus in the editor
        >
          <div ref={listRef} className="overflow-y-auto" style={{ maxHeight: ROWS * ROW_H }}>
            {sug.items.map((it, i) => {
              const k = KIND[it.kind] || KIND.variable;
              const on = i === sug.index;
              return (
                <div
                  key={it.kind + it.label}
                  role="option"
                  aria-selected={on}
                  onClick={() => accept(it)}
                  onMouseMove={() => on || setSug((s) => s && { ...s, index: i })}
                  style={{ height: ROW_H }}
                  className={`flex cursor-pointer items-center gap-2.5 px-2.5 text-[12.5px] ${
                    on ? "bg-[var(--accent)]/15 text-[#f8fafc]" : "text-[#cbd5e1]"
                  }`}
                >
                  <span className={`inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded text-[11px] font-semibold ${k.cls}`}>
                    {k.tag}
                  </span>
                  <span className="shrink-0 font-medium">{it.label}</span>
                  <span className="min-w-0 flex-1 truncate text-right text-[11px] text-[#64748b]">{it.detail}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});

export default CodeEditor;
