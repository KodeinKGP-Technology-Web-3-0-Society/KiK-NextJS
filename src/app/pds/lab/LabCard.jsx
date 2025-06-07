import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckSquare, Square, Star } from "lucide-react";

export default function LabCard({ qna, topic, subTopic, ind }) {
  const BACKEND_URL = "https://kik-backend.onrender.com/";
  const key = `${topic}-${subTopic}-${ind}`;

  const getInitialState = (type) => {
    const saved = JSON.parse(localStorage.getItem(type)) || [];
    return saved.includes(key);
  };

  const [isFav, setIsFav] = useState(() => getInitialState("favourites"));
  const [isComp, setIsComp] = useState(() => getInitialState("completed"));

  const updateLocalAndRemote = (type, newState) => {
    const saved = JSON.parse(localStorage.getItem(type)) || [];
    const updated = newState
      ? [...new Set([...saved, key])]
      : saved.filter((item) => item !== key);
    localStorage.setItem(type, JSON.stringify(updated));

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
      });
    }
  };

  useEffect(() => {
    updateLocalAndRemote("favourites", isFav);
  }, [isFav]);

  useEffect(() => {
    updateLocalAndRemote("completed", isComp);
  }, [isComp]);

  const toggleFavourite = () => setIsFav((prev) => !prev);
  const toggleCompleted = () => setIsComp((prev) => !prev);

  const path = `/pds/lab/${topic}/${subTopic}/${ind}`;
  const question = qna.Question || "";
  const shortWords = question.split(" ").slice(0, 13).join(" ") + "...";
  const shortChars = question.slice(0, 100) + "...";
  const displayText =
    shortWords.length > shortChars.length ? shortChars : shortWords;

  return (
    <tr className="border border-[#555] bg-[#050a24] shadow-md transition-transform duration-200">
      <td className="cursor-pointer pl-5 pr-2 text-white" onClick={toggleCompleted}>
        {isComp ? (
          <CheckSquare size={20} />
        ) : (
          <Square size={20} fill={"white"} />
        )}
      </td>
      <td className="w-full py-3.5 pr-2 pl-3 text-left align-middle text-[1.2rem] whitespace-nowrap">
        <Link href={path} className="text-white no-underline" target="_blank">
          {displayText}
        </Link>
      </td>
      <td className="cursor-pointer px-5 text-white" onClick={toggleFavourite}>
        <Star
          size={24}
          color={isFav ? "yellow" : "white"}
          fill={isFav ? "yellow" : "white"}
        />
      </td>
    </tr>
  );
}
