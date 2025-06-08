"use client";
import { useState } from "react";
import { CircleCheck } from "lucide-react";
function CopyButton({ text }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  return (
    <button
      className="absolute right-0 bottom-0 hover:cursor-pointer"
      onClick={handleCopy}
    >
      {isCopied ? (
        <div className="bg-clip-text">
          <CircleCheck className="h-5 w-5" style={{ stroke: "url(#gradient)" }}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#218ACB" />
                <stop offset="70%" stopColor="#11E3FB" />
                <stop offset="100%" stopColor="#0CC5DA" />
              </linearGradient>
            </defs>
          </CircleCheck>
        </div>
      ) : (
        <img src="/Copy.png" alt="Copy" width={20} height={20} />
      )}
    </button>
  );
}
export default CopyButton;
