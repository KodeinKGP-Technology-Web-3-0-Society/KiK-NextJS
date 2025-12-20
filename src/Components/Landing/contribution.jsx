import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import programmer from "../../../public/programmer-image.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Montserrat } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: "/newLandingImage/9.png", link: "/pds" },
  { src: "/newLandingImage/8.png", link: "/articles" },
  { src: "/newLandingImage/7.png", link: "/events" },
];


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export default function TeamsCombined() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [useSmallCardSize, setUseSmallCardSize] = useState(false);
  const headingRef = useRef(null);
  const componentRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setUseSmallCardSize(window.innerWidth < 1150);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { x: -300, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );
    }
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

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(autoSlideInterval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      ref={componentRef}
      className={`${montserrat.variable} relative flex min-h-screen w-full flex-col items-center justify-center gap-20 overflow-x-hidden bg-[#00002C] py-10 md:gap-16 md:py-5`}
    >
      <h2
        id="recentHeader"
        ref={headingRef}
        className="my-6 bg-gradient-to-br from-[#11E3FB] via-[#5BE6FF] to-[#11E3FB] [background-clip:text] text-center text-[32px] font-bold text-transparent [-webkit-background-clip:text] sm:text-[48px]"
      >
        Our Contributions
      </h2>

      <div
        className="lg:scale-90 cards-wrapper relative flex h-[420px] w-full max-w-7xl items-center justify-center"
        style={{ perspective: isMobile ? "none" : "1600px" }}
      >
        {images.map((item, index) => {
          const position =
            (index - currentIndex + images.length) % images.length;

          let transformStyle = "";
          let zIndex = 0;
          let opacity = 1;
          let filterStyle = "brightness(1)";

          if (position === 0) {
            transformStyle = isMobile
              ? "translateX(-100%) scale(0.8)"
              : useSmallCardSize
                ? "translateX(-280px) translateY(-20px) translateZ(120px) rotateY(-30deg) scale(0.85)"
                : "translateX(-380px) translateY(-20px) translateZ(120px) rotateY(-30deg) scale(0.85)";
            zIndex = isMobile ? 1 : 2;
            opacity = isMobile ? 0 : 1;
            filterStyle = "brightness(0.8)";
          } else if (position === 1) {
            transformStyle = isMobile
              ? "translateX(0) scale(1)"
              : "translateX(0) translateY(0) translateZ(250px) rotateY(0deg) scale(1)";
            zIndex = 4;
            opacity = 1;
          } else if (position === 2) {
            transformStyle = isMobile
              ? "translateX(100%) scale(0.8)"
              : useSmallCardSize
                ? "translateX(280px) translateY(-20px) translateZ(120px) rotateY(30deg) scale(0.85)"
                : "translateX(380px) translateY(-20px) translateZ(120px) rotateY(30deg) scale(0.85)";
            zIndex = isMobile ? 1 : 2;
            opacity = isMobile ? 0 : 1;
            filterStyle = "brightness(0.8)";
          } else {
            transformStyle = "scale(0.5)";
            opacity = 0;
            zIndex = 0;
            filterStyle = "brightness(0.5)";
          }

          const cardContent = (
            <Image
              src={item.src}
              alt={`Card ${index}`}
              width={useSmallCardSize ? 240 : 300}
              height={useSmallCardSize ? 320 : 400}
              className="rounded-2xl"
              style={{
                boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.5)",
              }}
            />
          );

          return (
            <div
              key={index}
              className="absolute transition-all duration-700 ease-in-out"
              style={{
                transform: transformStyle,
                zIndex,
                opacity,
                transformStyle: "preserve-3d",
                filter: filterStyle,
                cursor: position === 1 ? "pointer" : "default", 
              }}
            >
              {position === 1 ? (
                <Link href={item.link}>{cardContent}</Link>
              ) : (
                cardContent
              )}
            </div>
          );
        })}

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-3 z-20 -translate-y-1/2 rounded-full bg-gray-800/60 p-3 text-white hover:bg-gray-700 md:left-5"
        >
          <MdArrowBackIos />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-3 z-20 -translate-y-1/2 rounded-full bg-gray-800/60 p-3 text-white hover:bg-gray-700 md:right-5"
        >
          <MdArrowForwardIos />
        </button>
      </div>

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
