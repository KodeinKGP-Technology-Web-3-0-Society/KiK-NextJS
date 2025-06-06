"use client";
import React from "react";
import Image from "next/image";
import Logo from "../../../public/KIK_logo-removebg.png";
import { Poppins } from "next/font/google";
import IonIcon from "../utils/ionicon";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function Footer() {
  return (
    <div
      id="footer"
      className={`mt-8 flex flex-wrap items-center justify-between bg-transparent text-left text-white ${poppins.variable} border border-[#01011b] border-t-[#3f3e45]`}
    >
      <div className="mx-10 my-4 px-8 py-3 sm:mx-4" id="footerItem1">
        <div className="mb-2 flex flex-col justify-center">
          <Image src={Logo} alt="KiK Logo" id="KiKLogo" className="w-[50px]" />
          <h2 className="mt-2 text-2xl font-extrabold">KodeinKGP</h2>
        </div>
        <div className="mt-4">
          <p className="text-md">
            Indian Institute of Technology Kharagpur,
            <br />
            West Bengal - 721302
          </p>
        </div>
        <div className="my-8 flex flex-wrap">
          <a
            className="my-2 mr-4"
            target="_blank"
            href="https://www.facebook.com/kodeinkgp?mibextid=ZbWKwL"
            rel="noreferrer"
          >
            <IonIcon
              size="large"
              name="logo-facebook"
              className="text-white"
            ></IonIcon>
          </a>
          <a
            className="my-2 mr-4"
            target="_blank"
            href="https://www.instagram.com/kodeinkgp_iitkgp?igsh=cmhyMXM3YTA5YzZm"
            rel="noreferrer"
          >
            <IonIcon
              size="large"
              name="logo-instagram"
              className="text-white"
            ></IonIcon>
          </a>
          <a
            className="my-2 mr-4"
            target="_blank"
            href="https://www.linkedin.com/company/kodeinkgp/"
            rel="noreferrer"
          >
            <IonIcon
              size="large"
              name="logo-linkedin"
              className="text-white"
            ></IonIcon>
          </a>
          <a
            className="my-2 mr-4"
            target="_blank"
            href="https://medium.com/@kodeinkgp"
            rel="noreferrer"
          >
            <IonIcon
              size="large"
              name="logo-medium"
              className="text-white"
            ></IonIcon>
          </a>
          <a
            className="my-2 mr-4"
            target="_blank"
            href="https://chat.whatsapp.com/IFt69sSqZsu7FlRWl3EIbk"
            rel="noreferrer"
          >
            <IonIcon
              size="large"
              name="logo-whatsapp"
              className="text-white"
            ></IonIcon>
          </a>
        </div>
      </div>

      <div className="mx-10 my-4 p-4 sm:mx-4" id="footerItem2">
        <div className="pb-4 text-lg font-bold" id="footerItemElement1">
          Blockchain
        </div>
        <div className="my-2">
          <a
            className="text-[wheat] no-underline"
            href="https://www.youtube.com/watch?v=gyMwXuJrbJQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            freeCodeCamp
          </a>
        </div>
        <div className="my-2">
          <a
            className="text-[wheat] no-underline"
            href="https://www.youtube.com/@CodeEater21/videos"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code Eater
          </a>
        </div>
        <div className="my-2">
          <a
            className="text-[wheat] no-underline"
            href="https://www.youtube.com/@WhiteboardCrypto"
            target="_blank"
            rel="noopener noreferrer"
          >
            Whiteboard Crypto
          </a>
        </div>
        <div className="my-2">
          <a
            className="text-[wheat] no-underline"
            href="https://www.youtube.com/@Finematics"
            target="_blank"
            rel="noopener noreferrer"
          >
            Finematics
          </a>
        </div>
      </div>

      <div className="mx-10 my-4 p-4 sm:mx-4" id="footerItem3">
        <div className="pb-4 text-lg font-bold" id="footerItemElement1">
          Machine Learning
        </div>
        <div className="my-2">
          <a
            className="text-[wheat] no-underline"
            href="https://www.youtube.com/@Deeplearningai"
            target="_blank"
            rel="noopener noreferrer"
          >
            DeepLearningAI
          </a>
        </div>
        <div className="my-2">
          <a
            className="text-[wheat] no-underline"
            href="https://www.youtube.com/@SirajRaval/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            Siraj Raval
          </a>
        </div>
        <div className="my-2">
          <a
            className="text-[wheat] no-underline"
            href="https://www.youtube.com/@sentdex/playlists"
            target="_blank"
            rel="noopener noreferrer"
          >
            sentdex
          </a>
        </div>
        <div className="my-2">
          <a
            className="text-[wheat] no-underline"
            href="https://www.youtube.com/@coreyms/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            Corey Schafer
          </a>
        </div>
      </div>

      <div className="mx-10 my-4 p-4 sm:mx-4" id="footerItem4">
        <div className="pb-4 text-lg font-bold" id="footerItemElement1">
          Web Development
        </div>
        <div className="my-2">
          <a
            className="text-[wheat] no-underline"
            href="https://www.youtube.com/playlist?list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg"
            target="_blank"
            rel="noopener noreferrer"
          >
            CodeWithHarry
          </a>
        </div>
        <div className="my-2">
          <a
            className="text-[wheat] no-underline"
            href="https://www.youtube.com/playlist?list=PLfqMhTWNBTe3H6c9OGXb5_6wcc1Mca52n"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apna College
          </a>
        </div>
        <div className="my-2">
          <a
            className="text-[wheat] no-underline"
            href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G"
            target="_blank"
            rel="noopener noreferrer"
          >
            net ninja
          </a>
        </div>
        <div className="my-2">
          <a
            className="text-[wheat] no-underline"
            href="https://www.youtube.com/playlist?list=PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU"
            target="_blank"
            rel="noopener noreferrer"
          >
            Traversy Media
          </a>
        </div>
      </div>
    </div>
  );
}
