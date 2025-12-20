import React from "react";
import { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import Web from "../../data/animations/newLanding/Web.json";
import AI from "../../data/animations/newLanding/AI.json";
import Block from "../../data/animations/newLanding/Block.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Montserrat } from "next/font/google";
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

gsap.registerPlugin(ScrollTrigger);

export default function Teams() {
  const cardRefs = useRef([]);
  const lottieRefs = useRef([]);
  const componentRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx = gsap.context(() => {
      const left = cardRefs.current[0];
      const center = cardRefs.current[1];
      const right = cardRefs.current[2];

      if (!left || !center || !right) return;

      const isDesktop = window.innerWidth > 768;

      gsap.set(left, { x: isDesktop ? -800 : -200, opacity: 0 });
      gsap.set(right, { x: isDesktop ? 800 : 200, opacity: 0 });
      gsap.set(center, { scale: isDesktop ? 0.9 : 0.95, opacity: 0 });

      gsap.set(".text-content", { y: "-100%", opacity: 0.8, zIndex: -2 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "restart none none reverse",
        },
      });

      tl.to(
        [left, right],
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
        },
        0
      )
        .to(
          center,
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(1.6)",
          },
          0.2
        )

        .to(
          ".text-content",
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
          },
          0.6
        );
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={componentRef}
      className={`relative bg-[#00002C] ${montserrat.variable} py-16`}
    >
      <h2
        id="recentHeader"
        className="mb-10 bg-gradient-to-br from-[#11E3FB] via-[#5BE6FF] to-[#11E3FB] [background-clip:text] text-center text-4xl font-bold text-transparent [-webkit-background-clip:text] md:text-5xl"
      >
        Our Expertise
      </h2>

      <div className="mx-auto scale-90 flex w-full max-w-7xl flex-col items-center justify-between gap-8 px-4 md:flex-row md:items-stretch md:gap-8">
        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          className="flex h-fit w-[320px] flex-col overflow-hidden rounded-3xl bg-[#0a0a3a] shadow-lg min-[480px]:w-[360px] min-[640px]:w-[400px] min-[768px]:w-[360px]"
          ref={(el) => (cardRefs.current[0] = el)}
          onClick={()=>router.push('/teams')}
        >
          <div className="lottie-wrapper flex h-fit w-full items-center justify-center">
            <Lottie
              animationData={AI}
              lottieRef={(ref) => (lottieRefs.current[0] = ref)}
              autoplay={true}
              loop={true}
            />
          </div>
          <motion.div
            className="text-content cursor-pointer flex h-fit flex-col items-center justify-center bg-[#101045] p-10 text-center"
            variants={{
              rest: { y: '-100%', opacity: 0 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
            }}
          >
            <p className="font-montserrat -webkit-bg-clip-text mb-2 bg-[linear-gradient(to_bottom_right,rgba(17,227,251,1),rgba(91,230,255,1),rgba(17,227,251,1))] bg-clip-text text-xl font-semibold text-transparent md:text-2xl">
              AI & Metaverse
            </p>
            <p className="font-montserrat text-sm text-white/80 md:text-base">
              Enter a realm where AI drives immersive Metaverse encounters,
              pushing boundaries of what&apos;s possible.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          className="flex h-fit w-[320px] flex-col overflow-hidden rounded-3xl bg-[#0a0a3a] shadow-lg min-[480px]:w-[360px] min-[640px]:w-[400px] min-[768px]:w-[360px]"
          ref={(el) => (cardRefs.current[1] = el)}
          onClick={()=>router.push('/teams')}
        >
          <div className="lottie-wrapper flex h-fit w-full items-center justify-center">
            <Lottie
              animationData={Web}
              lottieRef={(ref) => (lottieRefs.current[1] = ref)}
              autoplay={true}
              loop={true}
            />
          </div>
          <motion.div
            variants={{
              rest: { y: '-100%', opacity: 0 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
            }}
            className="text-content cursor-pointer flex h-fit flex-col items-center justify-center bg-[#101045] p-10 text-center">
            <p className="font-montserrat -webkit-bg-clip-text mb-2 bg-[linear-gradient(to_bottom_right,rgba(17,227,251,1),rgba(91,230,255,1),rgba(17,227,251,1))] bg-clip-text text-xl font-semibold text-transparent md:text-2xl">
              Web Development
            </p>
            <p className="font-montserrat text-sm text-white/80 md:text-base">
              Crafting dynamic, responsive websites that deliver exceptional
              user experiences across all devices.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          className="flex h-fit w-[320px] flex-col overflow-hidden rounded-3xl bg-[#0a0a3a] shadow-lg min-[480px]:w-[360px] min-[640px]:w-[400px] min-[768px]:w-[360px]"
          ref={(el) => (cardRefs.current[2] = el)}
          onClick={()=>router.push('/teams')}
        >
          <div className="lottie-wrapper flex h-fit w-full items-center justify-center">
            <Lottie
              animationData={Block}
              lottieRef={(ref) => (lottieRefs.current[2] = ref)}
              autoplay={true}
              loop={true}
            />
          </div>
          <motion.div
            variants={{
              rest: { y: '-100%', opacity: 0 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
            }}
            className="text-content cursor-pointer flex h-fit flex-col items-center justify-center bg-[#101045] p-[38px] text-center">
            <p className="font-montserrat -webkit-bg-clip-text mb-2 bg-[linear-gradient(to_bottom_right,rgba(17,227,251,1),rgba(91,230,255,1),rgba(17,227,251,1))] bg-clip-text text-xl font-semibold text-transparent md:text-2xl">
              Blockchain
            </p>
            <p className="font-montserrat text-sm text-white/80 md:text-base">
              Building the decentralized future with secure, transparent
              blockchain solutions and smart contracts.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
