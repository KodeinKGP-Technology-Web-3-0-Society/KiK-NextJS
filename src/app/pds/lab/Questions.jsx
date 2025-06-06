"use client";

import React from "react";
import dataJ from "../../../data/qna/lab-questions.json";
import LabCard from "./LabCard";

export default function Questions({ topic, subTopic, viewMode }) {
  const getQuestionsData = () => {
    const allQuestions = dataJ[topic][0]["Subtopics"][subTopic];

    if (viewMode === "Favourite Questions") {
      const savedFavourites =
        JSON.parse(localStorage.getItem("favourites")) || [];
      return savedFavourites
        .filter((key) => {
          const [t, s] = key.split("-");
          return t === topic && s === subTopic;
        })
        .map((key) => {
          const [t, s, i] = key.split("-");
          return dataJ[t][0]["Subtopics"][s][i];
        });
    }

    if (viewMode === "Incomplete Questions") {
      const completed = JSON.parse(localStorage.getItem("completed")) || [];
      return allQuestions.filter(
        (_, index) => !completed.includes(`${topic}-${subTopic}-${index}`)
      );
    }

    return allQuestions;
  };

  const questionsData = getQuestionsData();

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <tbody>
          {questionsData.map((qa, i) => {
            // Always find the original index to keep LabCard consistent
            const originalIndex =
              dataJ[topic][0]["Subtopics"][subTopic].indexOf(qa);
            return (
              <LabCard
                key={`${topic}-${subTopic}-${originalIndex}`}
                qna={qa}
                topic={topic}
                subTopic={subTopic}
                ind={originalIndex}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
