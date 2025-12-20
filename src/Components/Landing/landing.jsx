"use client";

import { useEffect } from "react";
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { FaPaperPlane, FaLink, FaBolt } from "react-icons/fa";

import logo from "../../data/animations/newLanding/logofull.json";
import robo from "../../data/animations/newLanding/robo.json";

import BGImg from "../utils/BGImg";
import LogoAnime from "../utils/LogoAnime";
import Welcome from "../utils/Welcome";
import RoboAnime from "../utils/RoboAnime";
import OurWorksCard from "../utils/OurWorksCard";
import HomeFooter from "../utils/HomeFooter";

export default function Landing() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    tl.fromTo(
      ".navbar .logoo",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, delay: 1, ease: "power2.out" }
    );

    tl.fromTo(
      ".navbar .MainPartNavBar li",
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 1,
        stagger: 0.15,
        ease: "power2.out",
      },
      "-=1.5"
    );

    tl.fromTo(
      ".right .Welcome",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, delay: 0.5, ease: "power2.out" },
      "-=1.5"
    );

    tl.fromTo(
      ".right span",
      { x: 0, opacity: 0 },
      { x: 100, opacity: 1, duration: 0.5, delay: 0.5, ease: "power2.out" },
      "-=1.5"
    );

    tl.fromTo(
      ".right .vision",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, delay: 0.5, ease: "power2.out" },
      "-=1.5"
    );

    tl.fromTo(
      ".right .vision-depth",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, delay: 0.5, ease: "power2.out" },
      "-=1"
    );

    tl.fromTo(
      ".left",
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.5, ease: "power2.out" },
      "-=1.2"
    );

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".bottom-bar .text",
        start: "top 90%",
        end: "top 30%",
        scrub: 1,
        scroller: "body",
      },
    });

    t2.fromTo(
      ".bottom-bar .text",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.5,
        stagger: 0.2,
        ease: "power2.out",
      }
    );

    const t3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#recentHeader",
        start: "top 90%",
        end: "top 30%",
        scrub: 1,
        scroller: "body",
      },
    });

    t3.fromTo(
      "#recentHeader",
      { x: -300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="flex w-full flex-col justify-center overflow-hidden bg-[#001841]">
      {/* <div className="flex flex-col items-center justify-between p-5 min-[660px]:px-10 min-[940px]:px-20 md:flex-row md:items-start">
        <div className="flex w-full flex-col items-center space-y-6 text-center md:w-1/2 md:items-start  md:text-left md:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-3xl font-semibold text-[#EAF2FF] sm:text-4xl md:text-5xl"
          >
            Welcome to
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { delayChildren: 0.8, staggerChildren: 0.1 },
              },
            }}
            className="text-5xl font-extrabold tracking-tight min-[660px]:text-6xl min-[870px]:text-7xl"
          >
            {"KodeinKGP".split("").map((ch, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="inline-block"
                style={{
                  background:
                    i < 6
                      ? "linear-gradient(90deg, #79D7FF 0%, #4FB0FF 48%, #3E8EFF 100%)"
                      : "linear-gradient(90deg, #566CFF 0%, #6A58FF 40%, #7C37FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.h1>

          <motion.h2
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { delayChildren: 1.5, staggerChildren: 0.08 },
              },
            }}
            className="text-xl font-medium text-white sm:text-2xl md:text-3xl"
          >
            {"TECH | WEB 3.O".split("").map((ch, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="inline-block"
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 2 }}
            className="mt-8 w-full rounded-2xl border border-blue-500/40 bg-[#0B0E2A]/80 p-5 shadow-lg shadow-blue-900/40 backdrop-blur-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-blue-500/40 md:mt-32 sm:p-6 md:max-w-md"
          >
            <ul className="space-y-8 text-left sm:space-y-8">
              <li className="flex items-center gap-4 sm:gap-6">
                <FaPaperPlane className="text-xl text-blue-400 sm:text-2xl" />
                <Link
                  href="/articles"
                  className="text-base break-words text-white transition-colors duration-200 hover:text-blue-400 sm:text-lg"
                >
                  Web 3.0 & AI Innovation
                </Link>
              </li>
              <li className="flex items-center gap-4 sm:gap-6">
                <FaLink className="text-xl text-blue-400 sm:text-2xl" />
                <Link
                  href="/articles"
                  className="text-base break-words text-white transition-colors duration-200 hover:text-blue-400 sm:text-lg"
                >
                  Blockchain Development
                </Link>
              </li>
              <li className="flex items-center gap-4 sm:gap-6">
                <FaBolt className="text-xl text-blue-400 sm:text-2xl" />
                <Link
                  href="/events"
                  className="text-base break-words text-white transition-colors duration-200 hover:text-blue-400 sm:text-lg"
                >
                  Real-world Hackathons & Workshops
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="my-4 flex w-full flex-col items-center justify-center space-y-6 md:mb-0 md:w-1/2 md:space-y-10">
          <Lottie
            loop={false}
            animationData={logo}
            className="w-[50%] max-w-[400px] sm:w-[40%] md:w-full"
          />
          <Lottie
            loop={false}
            animationData={robo}
            className="w-[90%] max-w-[500px] sm:w-[80%] md:w-full"
          />
        </div>
      </div>

      <div className="bottom-bar flex flex-col items-start justify-between gap-8 px-8 pb-[60px] text-left md:flex-row md:gap-16 md:px-[60px]">
        <div className="text text-3xl font-semibold text-white">
          260+{" "}
          <span className="bg-gradient-to-br from-[#11e3fb] via-[#5be6ff] to-[#11e3fb] bg-clip-text text-2xl text-transparent">
            PDS Problems
          </span>
        </div>
        <div className="text text-3xl font-semibold text-white">
          17+{" "}
          <span className="bg-gradient-to-br from-[#11e3fb] via-[#5be6ff] to-[#11e3fb] bg-clip-text text-2xl text-transparent">
            Articles
          </span>
        </div>
        <div className="text text-3xl font-semibold text-white">
          15+{" "}
          <span className="bg-gradient-to-br from-[#11e3fb] via-[#5be6ff] to-[#11e3fb] bg-clip-text text-2xl text-transparent">
            Events
          </span>
        </div>
        <div className="text text-3xl font-semibold text-white">
          7000+{" "}
          <span className="bg-gradient-to-br from-[#11e3fb] via-[#5be6ff] to-[#11e3fb] bg-clip-text text-2xl text-transparent">
            Community Members
          </span>
        </div>
      </div> */}
      <div className="w-[100vw] flex flex-col sm:flex-row items-center justify-center">
        <div className="flex flex-col p-0 z-50">
          <Welcome />
        </div>
        <div
        >
          <OurWorksCard />
        </div>
        <div className="scale-80 order-first md:opacity-100 opacity-40 mix-blend-lighten">
          <BGImg />
        </div>
        <div className="hidden md:flex flex-col mix-blend-lighten">
          <div className="scale-200 absolute right-[-190px] top-[-100px]">
            <LogoAnime />
          </div>
          <div className="">
            <RoboAnime />
          </div>
        </div>
      </div>
    </div>
  );
}
