"use client";
import { useState, useEffect } from "react";

export default function ReturnButton() {
  const [clicked, setClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <button
      onClick={() => setClicked(true)}
      className={`absolute right-0 items-center justify-center rounded-[8px] pl-2 transition-all duration-200 ease-in-out ${isMobile ? "h-[27px] w-[40px]" : "h-[27px] w-[75px]"} hover:cursor-pointer`}
      style={{
        background:
          "linear-gradient(180deg, #218ACB 0%, #0CC5DA 50%, #11E3FB 100%)",
        border: "none",
        backgroundSize: "100% 200%",
      }}
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
      <span
        className={`flex items-center justify-center ${isMobile ? "h-[10px] w-[20px]" : "h-[17px] w-[61px]"}`}
        style={{
          fontFamily: "Victor Mono, monospace",
          fontWeight: 700,
          fontSize: 11,
          lineHeight: "17px",
          color: "#01011B",
          letterSpacing: 0,
        }}
      >
        <a href="/dekodeX">{isMobile ? `<<` : `<< Return`}</a>
      </span>
    </button>
  );
}
