import React, { useEffect, useState } from "react";

const DekodeXLoading = () => {
  const [binaryChars, setBinaryChars] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Generate random binary background
    const chars = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      char: Math.random() > 0.5 ? "1" : "0",
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 3 + 2,
    }));
    setBinaryChars(chars);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8">
      {/* Binary Rain Background */}
      <div className="absolute inset-0 overflow-hidden">
        {binaryChars.map((char) => (
          <div
            key={char.id}
            className="animate-float absolute font-mono text-xs text-[#11E3FB] opacity-20"
            style={{
              left: `${char.x}%`,
              top: `${char.y}%`,
              opacity: char.opacity,
              animationDuration: `${char.duration}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {char.char}
          </div>
        ))}
      </div>

      {/* Circuit Lines */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full">
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="#11E3FB"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Main Container */}
        <div className="relative rounded-lg border border-[#11E3FB]/20 bg-black/30 p-8 shadow-[0_0_50px_rgba(17,227,251,0.1)] backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="mb-6 flex items-center gap-2 border-b border-[#11E3FB]/20 pb-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="ml-4 font-mono text-sm text-[#11E3FB]">
              ~/dekodeX/loader
            </span>
          </div>

          {/* Terminal Content */}
          <div className="mb-6 space-y-2 font-mono text-sm">
            <div className="text-green-400">$ initializing dekodeX...</div>
            <div className="text-blue-400">$ loading problem arena...</div>
            <div className="text-yellow-400">$ compiling algorithms...</div>
            <div className="flex items-center gap-2">
              <span className="text-white">$ progress:</span>
              <div className="h-2 flex-1 overflow-hidden rounded bg-gray-700">
                <div
                  className="h-full rounded bg-gradient-to-r from-[#218ACB] to-[#11E3FB] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="min-w-[3rem] text-[#11E3FB]">{progress}%</span>
            </div>
          </div>

          {/* Logo Section */}
          <div className="text-center">
            <div className="relative inline-block">
              {/* Scanning Line Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="animate-scan-horizontal h-full w-1 bg-gradient-to-b from-transparent via-[#11E3FB] to-transparent"></div>
              </div>

              {/* Main Text */}
              <h1 className="relative text-6xl font-black tracking-wider">
                {["d", "e", "k", "o", "d", "e", "X"].map((char, index) => (
                  <span
                    key={index}
                    className="relative inline-block overflow-hidden"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <span
                      className="animate-type-in inline-block"
                      style={{
                        color: char === "X" ? "#11E3FB" : "#218ACB",
                        textShadow:
                          char === "X"
                            ? "0 0 20px #11E3FB"
                            : "0 0 10px #218ACB",
                        animationDelay: `${index * 0.2}s`,
                        animationFillMode: "both",
                      }}
                    >
                      {char}
                    </span>
                    {/* Glitch overlay */}
                    <span
                      className="animate-glitch-overlay absolute top-0 left-0 inline-block opacity-0"
                      style={{
                        color: "#ffffff",
                        animationDelay: `${index * 0.2 + 1}s`,
                      }}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </h1>

              {/* Underline with circuit pattern */}
              <div className="relative mt-2 h-1 bg-gradient-to-r from-transparent via-[#11E3FB] to-transparent">
                <div className="absolute inset-0 flex items-center justify-center gap-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-1 w-1 animate-pulse bg-[#11E3FB]"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                <span className="font-mono text-xs text-green-400">ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-ping rounded-full bg-blue-500"></div>
                <span className="font-mono text-xs text-blue-400">
                  PROCESSING
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-yellow-500"></div>
                <span className="font-mono text-xs text-yellow-400">READY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Holographic corners */}
        <div className="absolute -top-2 -left-2 h-8 w-8 border-t-2 border-l-2 border-[#11E3FB] opacity-60"></div>
        <div className="absolute -top-2 -right-2 h-8 w-8 border-t-2 border-r-2 border-[#11E3FB] opacity-60"></div>
        <div className="absolute -bottom-2 -left-2 h-8 w-8 border-b-2 border-l-2 border-[#11E3FB] opacity-60"></div>
        <div className="absolute -right-2 -bottom-2 h-8 w-8 border-r-2 border-b-2 border-[#11E3FB] opacity-60"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-10px);
            opacity: 0.4;
          }
        }

        @keyframes scan-horizontal {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400px);
          }
        }

        @keyframes type-in {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          50% {
            transform: translateY(-5px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes glitch-overlay {
          0%,
          90%,
          100% {
            opacity: 0;
            transform: translate(0);
          }
          10% {
            opacity: 0.8;
            transform: translate(-2px, 2px);
          }
          20% {
            opacity: 0.6;
            transform: translate(2px, -2px);
          }
          30% {
            opacity: 0.8;
            transform: translate(-2px, 2px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-scan-horizontal {
          animation: scan-horizontal 3s linear infinite;
        }

        .animate-type-in {
          animation: type-in 0.8s ease-out;
        }

        .animate-glitch-overlay {
          animation: glitch-overlay 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default DekodeXLoading;
