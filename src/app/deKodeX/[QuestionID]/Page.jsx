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
      className="font-victor-mono relative mx-auto mt-[70px] mr-[39px] ml-[39px] flex flex-col overflow-hidden rounded-[16px] border-[3px] shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)]"
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
            className="font-victor-mono text-[20px] leading-[36px] font-bold"
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
              <a href="/deKodeX">{"<<Return"}</a>
            </span>
          </button>
        </div>
        <div className="absolute top-[80px] h-[17px] w-[1437px] bg-gradient-to-b from-[rgba(255,255,255,0.2)] via-[#0CC5DA] to-[#01011B]"></div>
      </div>
      <div className="mb-[100px] flex flex-col gap-4 p-8">
        <span className="font-victor-mono absolute top-[117px] left-[9px] flex h-[20px] w-[22px] items-center justify-center text-[18px] leading-[100%] tracking-[0%] text-[#00FF00]">
          $$
        </span>
        <p className="left-[34px] pt-1 font-[victor-mono] text-[18px] leading-tight tracking-[0%] text-white decoration-solid decoration-[0%] underline-offset-[0%]">
          {questionData.description}
        </p>
        <h3 className="text-[24px] text-[#00FF00]">Sample Input</h3>
        <div className="po relative h-fit w-fit p-4 shadow-[10px_10px_20px_0px_#218ACB33,_-10px_-10px_20px_0px_#11E3FB33]">
          <pre>{questionData.sampleInput}</pre>
          <button className="absolute right-0 bottom-0 hover:cursor-pointer">
            <img src="/Copy.png" alt="Copy" width={20} height={20} />
          </button>
        </div>
        <p className="font-[victor-mono] text-[18px]">
          {questionData.sampleInputSolution}
        </p>
        <h3 className="text-[24px] text-[#00FF00]">Sample Output</h3>
        <div className="po relative h-fit w-fit p-4 shadow-[10px_10px_20px_0px_#218ACB33,_-10px_-10px_20px_0px_#11E3FB33]">
          <pre>{questionData.sampleOutput}</pre>
          <button className="absolute right-0 bottom-0 hover:cursor-pointer">
            <img src="/Copy.png" alt="Copy" width={20} height={20} />
          </button>
        </div>
        <div className="po relative h-fit w-fit p-4 shadow-[10px_10px_20px_0px_#218ACB33,_-10px_-10px_20px_0px_#11E3FB33]">
          <pre>{questionData.testCase}</pre>
          <button className="absolute right-0 bottom-0 hover:cursor-pointer">
            <img src="/Copy.png" alt="Copy" width={20} height={20} />
          </button>
        </div>
        <h3 className="text-[24px] text-[#00FF00]">Answer</h3>
        <div className="flex flex-row items-center gap-2">
          <input
            placeholder="Enter your answer here"
            className="w-[500px] rounded-[16px] bg-transparent p-4"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(#01011B, #01011B), linear-gradient(89.17deg, #218ACB 0%, #11E3FB 26.59%, #218ACB 65.77%, #11E3FB 96.97%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          />
          <div className="flex h-fit w-fit flex-row">
            <button className="h-[80%] rounded-[32px] bg-[linear-gradient(180deg,_#218ACB_0%,_#0CC5DA_50%,_#11E3FB_100%)] p-2 text-[#01011B] hover:cursor-pointer">
              Submit
            </button>
          </div>
        </div>
        <div className="absolute bottom-2 left-8 h-fit w-fit bg-[linear-gradient(236.43deg,_#218ACB_18.56%,_#0CC5DA_59.05%,_#11E3FB_79.29%)] bg-clip-text text-3xl font-bold text-transparent">
          {"</>"}
        </div>
      </div>
    </div>
  );
}
export default page;
