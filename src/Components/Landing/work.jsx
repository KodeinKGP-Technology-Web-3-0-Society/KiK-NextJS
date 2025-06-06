import React from "react";
import { useRef, useEffect } from "react";
import Link from "next/link";
import Robot from "../../data/animations/Robo.json";
import Lottie from "lottie-react";
import WEBDEV from "../../data/animations/WEB.json";
import Blockchain from "../../data/animations/Blockchain.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import programmer from "../../../public/programmer-image.png";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

gsap.registerPlugin(ScrollTrigger);

export default function Teams() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth > 768;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      if (isDesktop) {
        const rotationInit = index === 0 ? -10 : index === 1 ? 0 : 10;
        card.style.transform = `translateX(0) rotate(${rotationInit}deg) scale(1)`;

        let xOffset = index === 0 ? "-30vw" : index === 1 ? "0vw" : "30vw";

        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "30% bottom",
              end: "center center",
              scrub: true,
            },
          })
          .fromTo(
            card,
            { x: 0, rotation: rotationInit, scale: 1 },
            { x: xOffset, rotation: 0, scale: 1.1 }
          );
      } else {
        card.style.transform = "translateX(-300px)";
        card.style.opacity = "0";

        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top center",
              scrub: true,
              scroller: "body",
              immediateRender: true,
            },
          })
          .fromTo(
            card,
            { x: -300, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.2, ease: "linear" }
          );
      }
    });

    const poster = document.querySelector(".pds-page-poster-wrapper");
    if (poster) {
      poster.style.transform = "translateX(-300px)";
      poster.style.opacity = "0";

      gsap
        .timeline({
          scrollTrigger: {
            trigger: poster,
            start: "center bottom",
            end: "center center",
            scrub: 1,
            scroller: "body",
          },
        })
        .fromTo(
          poster,
          { x: -300, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.2 }
        );
    }
  }, []);

  return (
    <div className={`relative ${montserrat.variable}`}>
      <h2
        id="recentHeader"
        className="my-8 bg-gradient-to-br from-[#11E3FB] via-[#5BE6FF] to-[#11E3FB] [background-clip:text] text-center text-[48px] font-bold text-transparent [-webkit-background-clip:text]"
      >
        Our Expertise
      </h2>

      <div className="!mb-[20vw] max-[768px]:relative max-[768px]:mb-[5vh] max-[768px]:flex max-[768px]:max-h-fit max-[768px]:flex-col max-[768px]:items-center md:relative md:h-[30vw] md:pb-[40vw]">
        <div
          className="mt-5 h-[40vw] rounded-[2.5vw] bg-[rgba(54,54,54,0.4)] p-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.63,0.15,0.03,1.12)] max-[768px]:relative max-[768px]:top-0 max-[768px]:left-0 max-[768px]:!mb-[20px] max-[768px]:h-[130vw] max-[768px]:w-[70vw] max-[768px]:translate-x-0 max-[768px]:translate-y-0 md:absolute md:top-[10%] md:left-[40%] md:z-[2] md:w-[20vw] md:translate-x-[-50%] md:translate-y-[-50%] md:rotate-[-7deg] md:transition md:delay-[50ms]"
          ref={(el) => (cardRefs.current[1] = el)}
        >
          <Lottie animationData={WEBDEV} height={10} />
          <p className="font-montserrat -webkit-bg-clip-text !mt-[1.5vw] !mb-[0.5vw] !bg-[linear-gradient(to_bottom_right,rgba(17,227,251,1),rgba(91,230,255,1),rgba(181,246,253,1),rgba(17,227,251,1))] bg-clip-text !text-center text-2xl !text-transparent max-[768px]:mt-[5vw] max-[768px]:text-[7vw]">
            Web
          </p>
          <p className="font-montserrat !px-5 !py-2.5 !text-center">
            Crafting dynamic, responsive websites that deliver exceptional user
            experiences across all devices.
          </p>
        </div>
        <div
          className="mt-5 h-[40vw] rounded-[2.5vw] bg-[rgba(54,54,54,0.4)] p-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.63,0.15,0.03,1.12)] max-[768px]:relative max-[768px]:top-0 max-[768px]:left-0 max-[768px]:!mb-[20px] max-[768px]:h-[130vw] max-[768px]:w-[70vw] max-[768px]:translate-x-0 max-[768px]:translate-y-0 md:absolute md:top-[10%] md:left-[40%] md:z-[1] md:mb-[16px] md:w-[20vw] md:translate-x-[-50%] md:translate-y-[-50%] md:rotate-[5deg] md:transition md:delay-[100ms]"
          ref={(el) => (cardRefs.current[0] = el)}
        >
          <Lottie animationData={Robot} height={10} />
          <p className="font-montserrat -webkit-bg-clip-text !mt-[1.5vw] !mb-[0.5vw] !bg-[linear-gradient(to_bottom_right,rgba(17,227,251,1),rgba(91,230,255,1),rgba(181,246,253,1),rgba(17,227,251,1))] bg-clip-text !text-center text-2xl !text-transparent max-[768px]:mt-[5vw] max-[768px]:text-[7vw]">
            AI & Metaverse
          </p>
          <p className="font-montserrat !px-5 !py-2.5 !text-center">
            Enter a realm where AI drives immersive Metaverse encounters,
            pushing boundaries of what&apos;s possible.
          </p>
        </div>
        <div
          className="mt-5 h-[40vw] rounded-[2.5vw] bg-[rgba(54,54,54,0.4)] p-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.63,0.15,0.03,1.12)] max-[768px]:relative max-[768px]:top-0 max-[768px]:left-0 max-[768px]:mb-[20px] max-[768px]:h-[130vw] max-[768px]:w-[70vw] max-[768px]:translate-x-0 max-[768px]:translate-y-0 md:absolute md:top-[10%] md:left-[40%] md:z-[3] md:w-[20vw] md:translate-x-[-50%] md:translate-y-[-50%] md:rotate-[-2deg]"
          ref={(el) => (cardRefs.current[2] = el)}
        >
          <Lottie animationData={Blockchain} height={10} />
          <p className="font-montserrat -webkit-bg-clip-text !mt-[1.5vw] !mb-[0.5vw] !bg-[linear-gradient(to_bottom_right,rgba(17,227,251,1),rgba(91,230,255,1),rgba(181,246,253,1),rgba(17,227,251,1))] bg-clip-text !text-center text-2xl !text-transparent max-[768px]:mt-[5vw] max-[768px]:text-[7vw]">
            Blockchain
          </p>
          <p className="font-montserrat !px-5 !py-2.5 !text-center">
            Building the decentralized future with secure, transparent
            blockchain solutions and smart contracts.
          </p>
        </div>
      </div>

      <div className="mx-auto my-5 h-px w-[80%] bg-gradient-to-r from-transparent via-white/50 to-transparent md:hidden"></div>

      <div className="pds-page-poster-wrapper mb-[50px] flex items-center justify-center no-underline">
        <Link href="/pds" style={{ textDecoration: "none" }}>
          <div className="pds-page-poster flex w-[85vw] items-center justify-center rounded-[30px] bg-[rgba(70,69,69,0.2)] no-underline max-md:mt-[20px] max-md:w-[70vw] max-md:flex-col max-md:px-[10px] max-md:pt-[30px] max-md:pb-[30px]">
            <div className="pds-page-poster-left w-[45vw] font-extrabold no-underline max-md:w-[70vw] max-md:px-[50px]">
              <h1 className="font-montserrat bg-gradient-to-br from-[#11e3fb] via-[#5be6ff] to-[#11e3fb] bg-clip-text py-[10px] text-[3vw] text-transparent no-underline max-md:py-[10px] max-md:text-center max-md:text-[4vw]">
                Still Getting Stuck in PDS?
              </h1>
              <h2 className="font-montserrat py-[10px] text-[1.5vw] text-[aliceblue] max-md:py-[10px] max-md:text-center max-md:text-[3vw]">
                Our curated PDS Problems set works right for you...
              </h2>
            </div>
            <div className="pds-page-poster-right mb-[25px] ml-[10px] flex items-center justify-center max-md:m-[20px]">
              <Image
                className="w-[35vw] max-md:w-[60vw]"
                src={programmer}
                alt="img"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
