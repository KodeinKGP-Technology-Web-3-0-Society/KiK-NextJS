"use client";
import { useState } from "react";

export default function ReturnButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      onClick={() => setClicked(true)}
      className="absolute right-0 items-center justify-center rounded-[8px] pl-2"
      style={{
        width: 75,
        height: 27,
        background: clicked
          ? "linear-gradient(180deg, #155a7a 0%, #0a7a8c 50%, #0e7a8c 100%)"
          : "linear-gradient(180deg, #218ACB 0%, #0CC5DA 50%, #11E3FB 100%)",
        border: "none",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontFamily: "Victor Mono, monospace",
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
        <a href="/deKodeX">{`<<Return`}</a>
      </span>
    </button>
  );
}
