"use client";
import { useEffect, useRef, useState } from "react";

// A small terminal that types out compiling and running a PDS lab program.
const SCRIPT = [
  { cmd: "gcc lab4_arrays.c -o lab4" },
  { cmd: "./lab4", out: ["Enter n: 5", "Enter 5 numbers: 4 9 1 7 3", "Sorted: 1 3 4 7 9"] },
  { cmd: "gcc lab6_linked_list.c -o lab6" },
  { cmd: "./lab6", out: ["Inserted: 10 -> 20 -> 30", "Reversed: 30 -> 20 -> 10"] },
];

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState("");
  const box = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLines(SCRIPT.flatMap((s) => [{ p: true, t: s.cmd }, ...(s.out || []).map((t) => ({ t }))]));
      return;
    }
    let cancelled = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (!cancelled) {
        setLines([]);
        for (const step of SCRIPT) {
          for (let i = 1; i <= step.cmd.length && !cancelled; i++) {
            setTyping(step.cmd.slice(0, i));
            await wait(45);
          }
          await wait(300);
          if (cancelled) return;
          setTyping("");
          setLines((l) => [...l, { p: true, t: step.cmd }]);
          for (const t of step.out || []) {
            await wait(260);
            if (cancelled) return;
            setLines((l) => [...l, { t }]);
          }
          await wait(700);
        }
        await wait(2500);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [lines, typing]);

  return (
    <div className="overflow-hidden rounded-[6px] bg-[#08090d]">
      <div className="flex items-center gap-1.5 border-b border-[#1e2333] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-[#94a3b8]">~/pds-lab</span>
      </div>
      <div ref={box} className="h-56 overflow-hidden p-4 font-mono text-[13px] leading-6">
        {lines.map((l, i) => (
          <p key={i} className={l.p ? "text-[#f8fafc]" : "text-[#94a3b8]"}>
            {l.p && <span className="text-[var(--accent)]">$ </span>}
            {l.t}
          </p>
        ))}
        <p className="text-[#ece9e1]">
          <span className="text-[var(--accent)]">$ </span>
          {typing}
          <span className="ml-px inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#ece9e1]" />
        </p>
      </div>
    </div>
  );
}
