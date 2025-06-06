"use client";

import { useEffect } from "react";
import main from "../../data/animations/main.json";
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Landing = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    var tl = gsap.timeline();

    tl.fromTo(
      ".navbar .logoo",
      {
        x: -30,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        delay: 2,
        ease: "power2.out",
      }
    );

    tl.fromTo(
      ".navbar .MainPartNavBar li",
      {
        y: -30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 2,
        stagger: 0.15,
        ease: "power2.out",
      },
      "-=1.5"
    );

    tl.fromTo(
      ".right .Welcome",
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        delay: 1,
        ease: "power2.out",
      },
      "-=1.5"
    );

    tl.fromTo(
      ".right span",
      {
        x: 0,
        opacity: 0,
      },
      {
        x: 100,
        opacity: 1,
        duration: 0.5,
        delay: 1,
        ease: "power2.out",
      },
      "-=1.5"
    );

    tl.fromTo(
      ".right .vision",
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        delay: 1,
        ease: "power2.out",
      },
      "-=1.5"
    );

    tl.fromTo(
      ".right .vision-depth",
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        delay: 1,
        ease: "power2.out",
      },
      "-=1"
    );

    tl.fromTo(
      ".left",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power2.out",
      },
      "-=1.2"
    );

    var t2 = gsap.timeline({
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
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 1,
        stagger: 0.2,
        ease: "power2.out",
      }
    );

    var t3 = gsap.timeline({
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
      {
        x: -300,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#01011b]">
      <div className="flex flex-col justify-between p-3 md:flex-row md:pl-10">
        <div className="p-3 text-center text-lg md:w-1/2 md:p-8 md:text-left">
          <h1 className="text-left font-[Arial] font-semibold text-white">
            <div className="mb-[-30px] text-[50px] md:text-[65px]">
              Welcome to
            </div>
            <span className="bg-gradient-to-br from-[#11E3FB] via-[#5BE6FF] to-[#B5F6FD] bg-clip-text text-center text-[60px] font-bold text-transparent md:text-[80px]">
              KodeinKGP
            </span>
          </h1>
          <p className="font-poppins pt-10 pb-10 text-left text-lg leading-loose font-normal text-[#979898]">
            “The Web as I envisaged it, we have not seen it yet. The future is
            still so much bigger than the past”
          </p>
          <p className="font-poppins text-left text-sm leading-loose font-normal text-white">
            A student-run society that aims to spread awareness and educate
            students about the potential of Web 3.0 and future technologies. We
            host workshops and hackathons to give students hands-on experience
            with Blockchain Development and Artificial Intelligence.
            Additionally, we use our skills in web development and blockchain to
            work on real-world problems faced by the student community at IIT
            Kharagpur and beyond. By joining KodeinKGP, students can gain
            valuable technical skills and contribute to solving important
            problems while learning about one of the most exciting and
            rapidly-evolving technologies of our time.
          </p>
        </div>
        <div className="relative bottom-8 mt-20 w-full md:mt-0 md:w-1/2">
          <Lottie animationData={main} className="" />
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
      </div>
    </div>
  );
};

export default Landing;
