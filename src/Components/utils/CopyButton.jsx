"use client";
import { useState } from "react";

function CopyButton({ text }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 7000);
  };
  return (
    <button
      className="absolute right-0 bottom-0 hover:cursor-pointer"
      onClick={handleCopy}
    >
      {isCopied ? (
        <div className="bg-[linear-gradient(201.29deg,_#218ACB_21.67%,_#11E3FB_81.7%,_#0CC5DA_86.94%)] bg-clip-text text-[10px] font-bold text-transparent">
          Copied
        </div>
      ) : (
        <img src="/Copy.png" alt="Copy" width={20} height={20} />
      )}
    </button>
  );
}
export default CopyButton;
