"use client";

import React from "react";
import data from "../../../data/dekodeX/event-que.json";
import ReturnButton from "@/Components/utils/ReturnButton";
import CopyButton from "@/Components/utils/CopyButton";
import SubmitButton from "@/Components/utils/SubmitButton";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GetInput from "@/Components/utils/GetInput";

function Qp() {
  const params = useParams();
  const { QuestionID } = params;
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    fetch(`/dekodeX/api/question/${QuestionID}`)
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setQuestionData(data);
      })
      .catch((err) => {
        console.error("Error fetching question:", err);
      });
  }, [QuestionID]);

  if (!questionData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="relative mx-auto mt-[70px] mr-[39px] ml-[39px] flex flex-col overflow-hidden rounded-tl-[18px] rounded-tr-[18px] font-[poppins] max-md:mt-[50px] max-md:mr-[28px] max-md:ml-[28px]"
      style={{
        border: "3px solid transparent",
        backgroundImage:
          "linear-gradient(#01011B, #01011B), linear-gradient(108.74deg, rgba(33,138,203,0.6) 0%, rgba(255,255,255,0.54) 36.46%, rgba(255,255,255,0.3) 73.96%, rgba(17,227,251,0.6) 100%)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      <div
        className="relative rounded-tl-[16px] rounded-tr-[16px]"
        style={{
          background:
            "linear-gradient(108.74deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.06) 100%)",
          minHeight: 80, // ensures enough space for the absolute title
        }}
      >
        <div className="absolute right-6 bottom-5 left-6 flex">
          <span
            className="font-[poppins] text-[20px] leading-[36px] font-bold"
            style={{
              background:
                "linear-gradient(92.46deg, #218ACB 3.64%, #11E3FB 20.06%, #218ACB 31.73%, #11E3FB 47.81%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 0,
              width: 379,
              height: 36,
              display: "flex",
              alignItems: "center",
            }}
          >
            {QuestionID[1] < 9 ? "0" : ""}
            {QuestionID[1]} {questionData.title}
          </span>
          <ReturnButton />
        </div>
        <div className="absolute top-[80px] h-[17px] w-[1437px] bg-gradient-to-b from-[rgba(255,255,255,0.2)] via-[#0CC5DA] to-[#01011B]"></div>
      </div>
      <div className="mb-[100px] flex flex-col gap-6 p-8">
        <span className="absolute top-[117px] left-[9px] flex h-[20px] w-[22px] items-center justify-center font-[victor-mono] text-[18px] leading-[100%] tracking-[0%] text-[#00FF00]">
          $$
        </span>
        <p className="left-[34px] pt-1 font-[victor-mono] text-[18px] leading-tight tracking-[0%] text-white decoration-solid decoration-[0%] underline-offset-[0%]">
          {questionData.question}
        </p>
        <h3 className="font-[victor-mono] text-[24px] text-[#00FF00]">
          Sample Input
        </h3>
        <div className="relative flex w-fit flex-row px-4 py-6 shadow-[10px_10px_20px_0px_#218ACB33,_-10px_-10px_20px_0px_#11E3FB33]">
          <div className="po custom-scrollbar relative flex h-fit max-h-[300px] w-fit max-w-[250px] min-w-[160px] flex-row items-center justify-start overflow-auto font-[victor-mono]">
            <pre>{questionData.sampleInput}</pre>
          </div>
          <div className="flex min-h-[100%] min-w-[20px] items-center">
            <CopyButton text={questionData.sampleInput} />
          </div>
        </div>
        <p className="font-[victor-mono] text-[18px]">
          {questionData.explanation}
        </p>
        <h3 className="font-[victor-mono] text-[24px] text-[#00FF00]">
          Sample Output
        </h3>

        <div className="relative flex w-fit flex-row px-4 py-6 shadow-[10px_10px_20px_0px_#218ACB33,_-10px_-10px_20px_0px_#11E3FB33]">
          <div className="po custom-scrollbar relative flex h-fit max-h-[300px] w-fit max-w-[250px] min-w-[160px] flex-row items-center justify-start overflow-auto font-[victor-mono]">
            <pre>{questionData.sampleOutput}</pre>
          </div>
          <div className="flex min-h-[100%] min-w-[20px] items-center">
            <CopyButton text={questionData.sampleOutput} />
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <GetInput testcase={questionData.testcases} />
        </div>

        <h3 className="font-[victor-mono] text-[24px] text-[#00FF00]">
          Answer
        </h3>
        <div className="flex flex-row items-center gap-2">
          <input
            placeholder="Enter your answer here"
            className="w-[500px] rounded-[16px] bg-transparent p-2 text-white focus:bg-transparent focus:outline-none"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(#01011B, #01011B), linear-gradient(89.17deg, #218ACB 0%, #11E3FB 26.59%, #218ACB 65.77%, #11E3FB 96.97%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          />
          <SubmitButton />
        </div>
        <div className="absolute bottom-2 left-8 h-fit w-fit bg-[linear-gradient(236.43deg,_#218ACB_18.56%,_#0CC5DA_59.05%,_#11E3FB_79.29%)] bg-clip-text text-3xl font-bold text-transparent">
          {"</>"}
        </div>
      </div>
    </div>
  );
}
export default Qp;
