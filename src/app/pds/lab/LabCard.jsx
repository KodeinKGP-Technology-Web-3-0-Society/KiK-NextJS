import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckSquare, Square, Star } from "lucide-react";
import { readList, writeList } from "./storage";

export default function LabCard({ qna, topic, subTopic, ind }) {
  const BACKEND_URL = "https://kik-backend.onrender.com/";
  const key = `${topic}-${subTopic}-${ind}`;

  const getInitialState = (type) => {
    return readList(type).includes(key);
  };

  const [isFav, setIsFav] = useState(() => getInitialState("favourites"));
  const [isComp, setIsComp] = useState(() => getInitialState("completed"));

  const updateLocalAndRemote = (type, newState) => {
    if (typeof window === "undefined") return;
    const saved = readList(type);
    const updated = newState
      ? [...new Set([...saved, key])]
      : saved.filter((item) => item !== key);
    writeList(type, updated);

    const user = localStorage.getItem("user");
    if (user) {
      fetch(`${BACKEND_URL}status/${type}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [type === "favourites" ? "favourites" : "complete"]: updated,
        }),
      }).catch(() => {});
    }
  };

  useEffect(() => {
    updateLocalAndRemote("favourites", isFav);
  }, [isFav]);

  useEffect(() => {
    updateLocalAndRemote("completed", isComp);
  }, [isComp]);

  const toggleFavourite = (e) => {
    e.stopPropagation();
    setIsFav((prev) => !prev);
  };

  const toggleCompleted = (e) => {
    e.stopPropagation();
    setIsComp((prev) => !prev);
  };

  const path = `/pds/lab/${topic}/${subTopic}/${ind}`;
  const question = qna.Question || "";
  const shortWords = question.split(" ").slice(0, 13).join(" ") + "...";
  const shortChars = question.slice(0, 100) + "...";
  const displayText =
    shortWords.length > shortChars.length ? shortChars : shortWords;

  return (
    <tr className="border-b border-[#243158] transition-colors hover:bg-[#142145]/50 group">
      <td
        className="cursor-pointer py-3.5 pr-2 pl-4 text-left align-middle"
        onClick={toggleCompleted}
        title={isComp ? "Mark as incomplete" : "Mark as completed"}
      >
        {isComp ? (
          <CheckSquare size={18} className="text-[var(--accent)]" />
        ) : (
          <Square size={18} className="text-[#5a6380] transition-colors group-hover:text-[#9aa3b8]" />
        )}
      </td>
      <td className="w-full py-3.5 px-3 text-left align-middle">
        <Link
          href={path}
          className="text-sm font-medium text-[#ece9e1] transition-colors hover:text-[var(--accent)] sm:text-[15px]"
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
              : "text-[#5a6380] hover:text-amber-400"
          }`}
        />
      </td>
    </tr>
  );
}
