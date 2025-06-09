"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
function GetInput(testCase) {
  const openTestCaseTab = (testCase) => {
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(JSON.stringify(testCase.testcase, null, 2));
      newWindow.document.title = "Test Case";
    }
  };

  return (
    <button
      className="h-[42px] rounded-[16px] px-4 text-[#01011B] transition-all duration-200 ease-in-out hover:cursor-pointer"
      style={{
        background:
          "linear-gradient(180deg, #218ACB 0%, #0CC5DA 50%, #11E3FB 100%)",
        backgroundSize: "100% 200%",
        backgroundPosition: "0 0",
      }}
      onClick={() => openTestCaseTab(testCase)}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundPosition = "0 100%";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundPosition = "0 0";
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.95)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
    >
      GET YOUR INPUT HERE
    </button>
  );
}
export default GetInput;
