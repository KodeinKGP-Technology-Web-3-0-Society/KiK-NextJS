import Link from "next/link";
import RobotScene from "./RobotScene";
import MobileHeroVisual from "./MobileHeroVisual";
import { TextLink } from "./ui";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 pt-8 pb-12 sm:pt-12 sm:pb-16 md:grid-cols-[1.15fr_1fr] md:gap-10 md:px-8 md:pt-16 md:pb-20">
      <div>
        <h1 className="text-[2.6rem] leading-[1.05] font-bold tracking-[-0.03em] text-[#ece9e1] sm:text-5xl md:text-[5.5rem] md:leading-none lg:text-[6rem]">
          KodeinKGP
        </h1>
        <p className="mt-3 text-base font-medium text-[var(--accent)] sm:text-lg md:mt-4 md:text-xl">
          Technology Web 3.0 Society, IIT Kharagpur
        </p>

        {/* Mobile visual directly under subtitle on phones */}
        <MobileHeroVisual />

        <p className="mt-5 max-w-lg text-[15px] leading-7 text-[#c5cad6] sm:text-base md:mt-8 md:text-[17px] md:leading-8">
          We&apos;re a student society that learns Blockchain, AI and Web
          Development by building things. Through the year we run workshops,
          hackathons and the dekodeX contest.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-x-8 sm:gap-y-4 md:mt-10">
          <Link
            href="/dekodeX"
            className="inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1430] transition-transform hover:-translate-y-0.5"
          >
            Try dekodeX
          </Link>
          <TextLink href="/pds" className="text-sm">
            Practice on the PDS Bank
          </TextLink>
        </div>
      </div>

      {/* 3D Robot scene for Desktop and Tablets */}
      <RobotScene />
    </section>
  );
}
