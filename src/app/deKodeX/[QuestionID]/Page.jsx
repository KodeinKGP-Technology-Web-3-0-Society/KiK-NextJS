import React from "react";
import data from "../../../data/deKodeX/event-que.json";

async function page({ params }) {
  const QuestionID = await params.QuestionID;
  const questionData = data.find((q) => q.id === QuestionID);
  if (!questionData) {
    return <div>Question not found</div>;
  }

  return (
    <div
      className="mx-auto mt-[90px] mr-[39px] ml-[39px] overflow-hidden rounded-[16px] border-[3px] shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)]"
      style={{
        borderImage:
          "linear-gradient(108.74deg, rgba(33,138,203,0.6) 0%, rgba(255,255,255,0.54) 36.46%, rgba(255,255,255,0.3) 73.96%, rgba(17,227,251,0.6) 100%) 1",
        backdropFilter: "blur(100px)",
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
            {QuestionID < 9 ? "0" : ""}
            {QuestionID} {questionData.title}
          </span>
          <button
            className="absolute right-0 items-center justify-center rounded-[8px] pl-2"
            style={{
              width: 75,
              height: 27,
              background:
                "linear-gradient(180deg, #218ACB 0%, #0CC5DA 50%, #11E3FB 100%)",
              border: "none",
              cursor: "pointer",
            }}
            // Add your onClick handler here if needed
          >
            <span
              style={{
                fontFamily: "'Victor Mono', monospace",
                fontWeight: 700,
                fontSize: 11,
                lineHeight: "17px",
                color: "#01011B",
                width: 58,
                height: 17,
                letterSpacing: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {"<<Return"}
            </span>
          </button>
        </div>
        <div className="absolute top-[80px] h-[17px] w-[1437px] bg-gradient-to-b from-[rgba(255,255,255,0.2)] via-[#0CC5DA] to-[#01011B]"></div>
      </div>
      <div className="p-8">
        <span className="font-victor-mono absolute top-[115px] left-[9px] flex h-[20px] w-[22px] items-center justify-center text-[18px] leading-[100%] tracking-[0%] text-[#00FF00]">
          $$
        </span>
        <p className="left-[34px] pt-1 font-[victor-mono] text-[18px] leading-[100%] leading-tight tracking-[0%] text-white decoration-solid decoration-[0%] underline-offset-[0%]">
          {questionData.description}
        </p>
        <h3>Sample Input:</h3>
        <pre>{questionData.sampleInput}</pre>
        <h3>Sample Input Solution:</h3>
        <pre>{questionData.sampleInputSolution}</pre>
        <h3>Sample Output:</h3>
        <pre>{questionData.sampleOutput}</pre>
        <h3>Test Case:</h3>
        <pre>{questionData.testCase}</pre>
        <h3>Answer</h3>
      </div>
    </div>
  );
}
export default page;
