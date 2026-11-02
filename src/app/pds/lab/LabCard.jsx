import { useState } from "react";
import Link from "next/link";
import { CheckSquare, Square, Star, ArrowUpRight } from "lucide-react";
import { readList, writeList } from "./storage";

export default function LabCard({ qna, topic, subTopic, ind }) {
  const key = `${topic}-${subTopic}-${ind}`;

  const getInitialState = (type) => {
    return readList(type).includes(key);
  };

  const [isFav, setIsFav] = useState(() => getInitialState("favourites"));
  const [isComp, setIsComp] = useState(() => getInitialState("completed"));

  const updateLocal = (type, newState) => {
    if (typeof window === "undefined") return;
    const saved = readList(type);
    const updated = newState
      ? [...new Set([...saved, key])]
      : saved.filter((item) => item !== key);
    writeList(type, updated);
    // Dispatch a storage event so sibling components / header stats update in real-time
    window.dispatchEvent(new Event("pds-storage-updated"));
  };

  const toggleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFav((prev) => {
      const next = !prev;
      updateLocal("favourites", next);
      return next;
    });
  };

  const toggleCompleted = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsComp((prev) => {
      const next = !prev;
      updateLocal("completed", next);
      return next;
    });
  };

  const path = `/pds/lab/${topic}/${subTopic}/${ind}`;
  const rawQuestion = (qna?.Question || "")
    .replace(/^[\d]+\.\s*/, "")
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const displayText =
    rawQuestion.length > 95 ? `${rawQuestion.slice(0, 95)}...` : rawQuestion;

  const ratingRaw = (qna?.rating || "medium").toLowerCase();
  const ratingConfig = {
    easy: {
      label: "Easy",
      badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    },
    hard: {
      label: "Hard",
      badge: "border-rose-500/30 bg-rose-500/10 text-rose-400",
    },
    medium: {
      label: "Medium",
      badge: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    },
  }[ratingRaw] || {
    label: "Medium",
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  };

  return (
    <tr className="group border-b border-[#1e2333]/70 transition-colors hover:bg-[#161a26]/70 last:border-none">
      {/* Completion Checkbox */}
      <td
        className="w-10 cursor-pointer py-3.5 pl-4 pr-1 text-left align-middle"
        onClick={toggleCompleted}
        title={isComp ? "Mark as incomplete" : "Mark as completed"}
      >
        <button
          type="button"
          onClick={toggleCompleted}
          className="flex items-center justify-center focus:outline-none"
          aria-label={isComp ? "Mark incomplete" : "Mark completed"}
        >
          {isComp ? (
            <CheckSquare size={17} className="text-[var(--accent)]" />
          ) : (
            <Square size={17} className="text-[#475569] transition-colors group-hover:text-[#94a3b8]" />
          )}
        </button>
      </td>

      {/* Problem Index Number */}
      <td className="w-12 py-3.5 px-2 text-left align-middle">
        <span className="font-mono text-xs font-semibold text-[#64748b] transition-colors group-hover:text-[var(--accent)]">
          #{String(ind + 1).padStart(2, "0")}
        </span>
      </td>

      {/* Problem Description Statement */}
      <td className="py-3.5 px-3 text-left align-middle">
        <Link
          href={path}
          className={`text-sm font-medium transition-colors sm:text-[14.5px] line-clamp-1 block ${
            isComp
              ? "text-[#64748b] line-through decoration-[#475569]/70 group-hover:text-[#94a3b8]"
              : "text-[#f1f5f9] group-hover:text-[var(--accent)]"
          }`}
          target="_blank"
        >
          {displayText}
        </Link>
      </td>

      {/* Difficulty Level Tag */}
      <td className="w-24 py-3.5 px-3 text-right sm:text-center align-middle whitespace-nowrap">
        <span
          className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-wide ${ratingConfig.badge}`}
        >
          {ratingConfig.label}
        </span>
      </td>

      {/* Solve Link & Star Bookmark */}
      <td className="w-24 py-3.5 pl-2 pr-4 text-right align-middle whitespace-nowrap">
        <div className="flex items-center justify-end gap-2.5">
          <Link
            href={path}
            target="_blank"
            className="hidden items-center gap-1 font-mono text-xs text-[#64748b] transition-colors hover:text-[var(--accent)] group-hover:text-[#94a3b8] sm:inline-flex"
            title="Open question workspace"
          >
            <span>Solve</span>
            <ArrowUpRight size={13} className="text-[#64748b] transition-colors group-hover:text-[var(--accent)]" />
          </Link>
          <button
            type="button"
            onClick={toggleFavourite}
            className="p-1 text-[#475569] transition-colors hover:text-amber-400 focus:outline-none"
            title={isFav ? "Remove from favorites" : "Save to favorites"}
            aria-label="Toggle favorite"
          >
            <Star
              size={17}
              className={`transition-all ${
                isFav
                  ? "fill-amber-400 text-amber-400 scale-110"
                  : "text-[#475569] hover:text-amber-400 hover:scale-110"
              }`}
            />
          </button>
        </div>
      </td>
    </tr>
  );
}
