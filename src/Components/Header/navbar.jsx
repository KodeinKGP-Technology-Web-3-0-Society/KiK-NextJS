"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "../../../public/KIK_logo-removebg.png";
import { useAuth } from "@/contexts/authContext";
import SignOutButton from "../utils/signOut";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrolled = scrollTop / (scrollHeight - clientHeight);
      const scrollPercent = Math.min(scrolled * 100, 100);
      setScrollProgress(isNaN(scrollPercent) ? 0 : scrollPercent);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    // Initial calculation
    updateScrollProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  const { loggedIn, user } = useAuth();

  return (
    <div
      className={`sticky top-0 z-20 flex min-h-[5rem] max-w-[99%] flex-wrap items-center justify-between bg-[rgba(1,1,27,0.6)] px-2 ${isOpen ? "h-screen w-full flex-col bg-black" : ""}`}
    >
      {/* Scroll Progress Bar - Tech Style */}
      <div className="absolute right-0 bottom-0 left-0 h-[2.5px] w-screen bg-gradient-to-r from-transparent via-[rgba(17,227,251,0.1)] to-transparent">
        {/* Circuit line background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(17,227,251,0.2)] to-transparent opacity-50"></div>

        {/* Main progress line */}
        <div
          className="relative h-full bg-gradient-to-r from-[#00d4ff] via-[#11e3fb] to-[#5be6ff] will-change-transform"
          style={{
            width: `${scrollProgress}%`,
            boxShadow: `
              0 0 20px rgba(17, 227, 251, 0.8),
              0 0 40px rgba(17, 227, 251, 0.4),
              0 0 60px rgba(17, 227, 251, 0.2),
              inset 0 0 10px rgba(255, 255, 255, 0.2)
            `,
            transition: "width 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: "translateZ(0)",
            filter: "brightness(1.1) saturate(1.2)",
          }}
        >
          {/* Animated glow effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            style={{
              animation: "shimmer 2s infinite linear",
            }}
          ></div>

          {/* Circuit nodes/dots effect with sparkles */}
          <div
            className="absolute top-1/2 right-0 h-[6px] w-[6px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#11e3fb]"
            style={{
              boxShadow:
                "0 0 15px rgba(17, 227, 251, 0.9), 0 0 30px rgba(17, 227, 251, 0.5)",
              opacity: scrollProgress > 0 ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {/* Sparkle effects */}
            <div
              className="absolute -top-1 -right-1 h-[2px] w-[2px] rounded-full bg-white"
              style={{
                animation: "sparkle1 1.5s infinite ease-in-out",
                opacity: scrollProgress > 5 ? 1 : 0,
              }}
            ></div>
            <div
              className="absolute -bottom-1 -left-1 h-[1.5px] w-[1.5px] rounded-full bg-[#5be6ff]"
              style={{
                animation: "sparkle2 2s infinite ease-in-out 0.5s",
                opacity: scrollProgress > 5 ? 1 : 0,
              }}
            ></div>
            <div
              className="absolute -top-2 left-1/2 h-[1px] w-[1px] rounded-full bg-white"
              style={{
                animation: "sparkle3 1.8s infinite ease-in-out 1s",
                opacity: scrollProgress > 5 ? 1 : 0,
              }}
            ></div>
            <div
              className="absolute top-1/2 -right-2 h-[1.5px] w-[1.5px] rounded-full bg-[#00d4ff]"
              style={{
                animation: "sparkle4 2.2s infinite ease-in-out 0.3s",
                opacity: scrollProgress > 5 ? 1 : 0,
              }}
            ></div>
          </div>
        </div>

        {/* Data flow lines */}
        <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
          <div
            className="absolute top-1/2 h-[1px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[rgba(17,227,251,0.3)] to-transparent"
            style={{
              animation: "pulse 3s infinite ease-in-out",
            }}
          ></div>
        </div>
      </div>
      <div className="absolute right-0 bottom-[-5px] left-0 h-[2.5px] w-screen bg-gradient-to-r from-transparent via-[rgba(17,227,251,0.1)] to-transparent">
        {/* Circuit line background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(17,227,251,0.2)] to-transparent opacity-50"></div>

        {/* Main progress line */}
        <div
          className="relative h-full bg-gradient-to-r from-[#00d4ff] via-[#11e3fb] to-[#5be6ff] will-change-transform"
          style={{
            width: `${scrollProgress}%`,
            boxShadow: `
              0 0 20px rgba(17, 227, 251, 0.8),
              0 0 40px rgba(17, 227, 251, 0.4),
              0 0 60px rgba(17, 227, 251, 0.2),
              inset 0 0 10px rgba(255, 255, 255, 0.2)
            `,
            transition: "width 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: "translateZ(0)",
            filter: "brightness(1.1) saturate(1.2)",
          }}
        >
          {/* Animated glow effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            style={{
              animation: "shimmer 2s infinite linear",
            }}
          ></div>

          {/* Circuit nodes/dots effect with sparkles */}
          <div
            className="absolute top-1/2 right-0 h-[6px] w-[6px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#11e3fb]"
            style={{
              boxShadow:
                "0 0 15px rgba(17, 227, 251, 0.9), 0 0 30px rgba(17, 227, 251, 0.5)",
              opacity: scrollProgress > 0 ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {/* Sparkle effects */}
            <div
              className="absolute -top-1 -right-1 h-[2px] w-[2px] rounded-full bg-white"
              style={{
                animation: "sparkle1 1.5s infinite ease-in-out",
                opacity: scrollProgress > 5 ? 1 : 0,
              }}
            ></div>
            <div
              className="absolute -bottom-1 -left-1 h-[1.5px] w-[1.5px] rounded-full bg-[#5be6ff]"
              style={{
                animation: "sparkle2 2s infinite ease-in-out 0.5s",
                opacity: scrollProgress > 5 ? 1 : 0,
              }}
            ></div>
            <div
              className="absolute -top-2 left-1/2 h-[1px] w-[1px] rounded-full bg-white"
              style={{
                animation: "sparkle3 1.8s infinite ease-in-out 1s",
                opacity: scrollProgress > 5 ? 1 : 0,
              }}
            ></div>
            <div
              className="absolute top-1/2 -right-2 h-[1.5px] w-[1.5px] rounded-full bg-[#00d4ff]"
              style={{
                animation: "sparkle4 2.2s infinite ease-in-out 0.3s",
                opacity: scrollProgress > 5 ? 1 : 0,
              }}
            ></div>
          </div>
        </div>

        {/* Data flow lines */}
        <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
          <div
            className="absolute top-1/2 h-[1px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[rgba(17,227,251,0.3)] to-transparent"
            style={{
              animation: "pulse 3s infinite ease-in-out",
            }}
          ></div>
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes sparkle1 {
          0%,
          100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
          }
        }

        @keyframes sparkle2 {
          0%,
          100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          40% {
            opacity: 1;
            transform: scale(1.2) rotate(90deg);
          }
        }

        @keyframes sparkle3 {
          0%,
          100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          60% {
            opacity: 1;
            transform: scale(1) rotate(270deg);
          }
        }

        @keyframes sparkle4 {
          0%,
          100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          55% {
            opacity: 1;
            transform: scale(1.3) rotate(45deg);
          }
        }
      `}</style> */}

      <div
        className={`ml-[1.5vw] flex min-w-[20vw] flex-row items-center ${isOpen ? "hidden" : "block"} md:flex`}
      >
        <Link
          href={'/'}
          className="flex items-center gap-[5px] text-[1.2rem]">
          <Image
            src={Logo}
            alt="KodeinKGP Logo"
            className="h-[60px] w-[60px] p-[5px]"
          />
          <h4 className="font-semibold text-white">KodeinKGP</h4>
        </Link>
      </div>

      <button
        id="hambutton"
        className={`flex h-[25px] w-[50px] cursor-pointer flex-col justify-between border-none bg-none md:hidden ${isOpen ? "fixed top-[15px] left-[82vw]" : ""}`}
        onClick={toggleMenu}
      >
        <div
          className={`ease h-[3px] w-[30px] bg-[#eeeeee] transition-all duration-300 ${isOpen ? "origin-center translate-x-[10px] translate-y-[18.2px] rotate-45" : ""}`}
        ></div>
        <div
          className={`ease h-[3px] w-[30px] bg-[#eeeeee] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
        ></div>
        <div
          className={`ease h-[3px] w-[30px] bg-[#eeeeee] transition-all duration-300 ${isOpen ? "origin-center translate-x-[10px] translate-y-[-2.2px] -rotate-45" : ""}`}
        ></div>
      </button>

      <div
        className={`ml-auto min-w-[26vw] ${isOpen ? "flex h-full w-full items-center justify-center" : "hidden"} md:block md:mt-3`}
      >
        <div
          className={`flex font-[Arial] ${isOpen ? "flex-col" : "flex-row"} items-center ${isOpen ? "gap-4" : "gap-[4rem]"}`}
        >
          <div
            className={`flex ${isOpen ? "flex-col items-start gap-4" : "-mr-[20px] flex-row"}`}
          >
            <li
              className="cursor-pointer list-none"
              onClick={() => {
                if (isOpen) toggleMenu();
              }}
            >
              <span className="group relative mx-[25px] flex flex-col items-center text-[1.2rem]">
                <Link
                  className="bg-gradient-to-br pb-[15px] font-bold tracking-wide text-white no-underline transition-colors duration-300"
                  href="/"
                >
                  Home
                </Link>
                <span className="absolute bottom-3 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#11e3fb] transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </li>

            <li
              className="cursor-pointer list-none"
              onClick={() => {
                if (isOpen) toggleMenu();
              }}
            >
              <span className="group relative mx-[25px] flex flex-col items-center text-[1.2rem]">
                {/* Main link with enhanced tech styling */}
                <Link
                  className="relative bg-gradient-to-br from-cyan-100 via-cyan-200 to-blue-100 bg-clip-text pb-[15px] tracking-wide text-transparent no-underline transition-all duration-500 hover:from-cyan-50 hover:via-cyan-100 hover:to-blue-50"
                  href="/dekodeX"
                  style={{
                    textShadow: "0 0 10px rgba(34, 211, 238, 0.4)",
                    filter: "drop-shadow(0 0 5px rgba(34, 211, 238, 0.5))",
                  }}
                >
                  dekodeX
                </Link>
                {/* Data flow indicators */}
                <span className="absolute top-0 left-1/4 h-1 w-1 animate-ping rounded-full bg-cyan-400 opacity-100 transition-opacity duration-300"></span>
                <span className="absolute top-1 right-1/4 h-0.5 w-0.5 animate-ping rounded-full bg-blue-400 opacity-100 transition-opacity duration-500"></span>
                <span className="absolute bottom-3 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#11e3fb] transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </li>

            <li
              className="cursor-pointer list-none"
              onClick={() => {
                if (isOpen) toggleMenu();
              }}
            >
              <span className="group relative mx-[25px] flex flex-col items-center text-[1.2rem]">
                <Link
                  className="bg-gradient-to-br pb-[15px] font-bold tracking-wide text-white no-underline transition-colors duration-300"
                  href="/pds"
                >
                  PDS_Bank
                </Link>
                <span className="absolute bottom-3 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#11e3fb] transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </li>

            <li
              className="cursor-pointer list-none"
              onClick={() => {
                if (isOpen) toggleMenu();
              }}
            >
              <span className="group relative mx-[25px] flex flex-col items-center text-[1.2rem]">
                <Link
                  className="bg-gradient-to-br pb-[15px] font-bold tracking-wide text-white no-underline transition-colors duration-300"
                  href="/articles"
                >
                  Articles
                </Link>
                <span className="absolute bottom-3 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#11e3fb] transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </li>

            <li
              className="cursor-pointer list-none"
              onClick={() => {
                if (isOpen) toggleMenu();
              }}
            >
              <span className="group relative mx-[25px] flex flex-col items-center text-[1.2rem]">
                <Link
                  className="bg-gradient-to-br pb-[15px] font-bold tracking-wide text-white no-underline transition-colors duration-300"
                  href="/teams"
                >
                  Teams
                </Link>
                <span className="absolute bottom-3 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#11e3fb] transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </li>

            <li
              className="cursor-pointer list-none"
              onClick={() => {
                if (isOpen) toggleMenu();
              }}
            >
              <span className="group relative mx-[25px] flex flex-col items-center text-[1.2rem]">
                <Link
                  className="bg-gradient-to-br pb-[15px] font-bold tracking-wide text-white no-underline transition-colors duration-300"
                  href="/events"
                >
                  Events
                </Link>
                <span className="absolute bottom-3 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#11e3fb] transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </li>

            {/* <li
              className="cursor-pointer list-none"
              onClick={() => {
                if (isOpen) toggleMenu();
              }}
            >
              <span className="group relative mx-[25px] flex flex-col items-center text-[1.2rem]">
                <Link
                  className="bg-gradient-to-br pb-[15px] tracking-wide text-white no-underline transition-colors duration-300"
                  href="/regform"
                >
                  Registration Form
                </Link>
                <span className="absolute bottom-3 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#11e3fb] transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>

              {loggedIn && <SignOutButton />}
            </li> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
