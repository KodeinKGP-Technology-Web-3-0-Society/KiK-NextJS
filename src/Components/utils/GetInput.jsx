"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
function GetInput({ testcaseUrl }) {
  const openTestCaseTab = (testcaseUrl) => {
    if (!testcaseUrl) {
      alert("Test case can't be opened: Try again");
      return;
    }

    // Ensure the file is accessed from the root, not relative to /deKodeX
    const fullUrl = `${window.location.origin}${testcaseUrl}`;
    

    const newWindow = window.open(fullUrl, "_blank", "noopener,noreferrer");
    if (newWindow) {
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
      onClick={() => openTestCaseTab(testcaseUrl)}
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
