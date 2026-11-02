import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckSquare, Square, Star } from "lucide-react";
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
    e.stopPropagation();
    setIsFav((prev) => {
      const next = !prev;
      updateLocal("favourites", next);
      return next;
    });
  };

  const toggleCompleted = (e) => {
    e.stopPropagation();
    setIsComp((prev) => {
      const next = !prev;
      updateLocal("completed", next);
      return next;
    });
  };

  const path = `/pds/lab/${topic}/${subTopic}/${ind}`;
  const question = qna.Question || "";
  const shortWords = question.split(" ").slice(0, 13).join(" ") + "...";
  const shortChars = question.slice(0, 100) + "...";
  const displayText =
    shortWords.length > shortChars.length ? shortChars : shortWords;

  return (
    <tr className="border-b border-[#1e2333] transition-colors hover:bg-[#161a26]/60 group">
      <td
        className="cursor-pointer py-3.5 pr-2 pl-4 text-left align-middle"
        onClick={toggleCompleted}
        title={isComp ? "Mark as incomplete" : "Mark as completed"}
      >
        {isComp ? (
          <CheckSquare size={18} className="text-[var(--accent)]" />
        ) : (
          <Square size={18} className="text-[#64748b] transition-colors group-hover:text-[#94a3b8]" />
        )}
      </td>
      <td className="w-full py-3.5 px-3 text-left align-middle">
        <Link
          href={path}
          className="text-sm font-medium text-[#f8fafc] transition-colors hover:text-[var(--accent)] sm:text-[15px]"
          target="_blank"
        >
          {displayText}
        </Link>
      </td>
      <td
        className="cursor-pointer py-3.5 pr-4 pl-2 text-right align-middle"
        onClick={toggleFavourite}
        title={isFav ? "Remove from favorites" : "Save to favorites"}
      >
        <Star
          size={18}
          className={`transition-colors ${
            isFav
              ? "fill-amber-400 text-amber-400"
              : "text-[#64748b] hover:text-amber-400"
          }`}
        />
      </td>
    </tr>
  );
}
