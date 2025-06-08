"use client";
import { useState, useEffect } from "react";

export default function ReturnButton() {
  const [clicked, setClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setClicked(false);
    }, 300); // Reset clicked state after 300 milliseconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [clicked]); // whenever clicked changes, reset the timer

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
      className={`absolute right-0 items-center justify-center rounded-[8px] pl-2 ${isMobile ? "h-[27px] w-[40px]" : "h-[27px] w-[75px]"}`}
      style={{
        background: clicked
          ? "linear-gradient(180deg, #155a7a 0%, #0a7a8c 50%, #0e7a8c 100%)"
          : "linear-gradient(180deg, #218ACB 0%, #0CC5DA 50%, #11E3FB 100%)",
        border: "none",
        cursor: "pointer",
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
        <a href="/deKodeX">{isMobile ? `<<` : `<< Return`}</a>
      </span>
    </button>
  );
}
