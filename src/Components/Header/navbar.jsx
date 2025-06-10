"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "../../../public/KIK_logo-removebg.png";
import { useAuth } from "@/contexts/authContext";
import SignOutButton from "../utils/signOut";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { loggedIn, user } = useAuth();

  return (
    <div
      className={`sticky top-0 z-20 flex min-h-[5rem] max-w-[99%] flex-wrap items-center justify-between bg-[rgba(1,1,27,0.6)] px-2 ${isOpen ? "h-screen w-full flex-col bg-black" : ""}`}
    >
      <div
        className={`ml-[1.5vw] flex min-w-[20vw] flex-row items-center ${isOpen ? "hidden" : "block"} md:flex`}
      >
        <div className="flex items-center gap-[5px] text-[1.2rem]">
          <Image
            src={Logo}
            alt="KodeinKGP Logo"
            className="h-[60px] w-[60px] p-[5px]"
          />
          <h4 className="font-semibold text-white">KodeinKGP</h4>
        </div>
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
        className={`ml-auto min-w-[26vw] ${isOpen ? "flex h-full w-full items-center justify-center" : "hidden"} md:block`}
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
                  className="bg-gradient-to-br pb-[15px] tracking-wide text-white no-underline transition-colors duration-300"
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
                <Link
                  className="bg-gradient-to-br pb-[15px] tracking-wide text-white no-underline transition-colors duration-300"
                  href="/dekodeX"
                >
                  deKodeX
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
                  className="bg-gradient-to-br pb-[15px] tracking-wide text-white no-underline transition-colors duration-300"
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
                  className="bg-gradient-to-br pb-[15px] tracking-wide text-white no-underline transition-colors duration-300"
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
                  className="bg-gradient-to-br pb-[15px] tracking-wide text-white no-underline transition-colors duration-300"
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
                  className="bg-gradient-to-br pb-[15px] tracking-wide text-white no-underline transition-colors duration-300"
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
