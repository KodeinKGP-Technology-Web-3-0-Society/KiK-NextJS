"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import QuestionImg from "./assets/question_mark.svg";

export default function LabTheory() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[rgb(1,1,27)] p-5 font-['Arial']">
      <div
        id="LabTheory"
        className="flex w-full flex-col items-center justify-center p-5"
      >
        {/* Question Image */}
        <div className="quesimg mb-4 aspect-square w-full sm:w-[90%] md:aspect-auto md:h-[300px]">
          <div className="qimg mx-auto h-full w-full max-w-[500px] overflow-hidden rounded-lg shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px]">
            <Image
              src={QuestionImg}
              alt="Question mark"
              className="h-full w-full object-cover"
              width={500}
              height={300}
            />
          </div>
        </div>

        <div className="LabTheoryContainer flex w-full flex-col items-center justify-center lg:flex-row">
          {/* Lab Problems */}
          <div
            id="labContainer"
            className="LabTheoryItems m-4 flex-1 rounded-lg border border-[#555] bg-gradient-to-br from-white from-[-278.56%] via-[#1d1b66] via-[5.67%] to-[#11101d] to-[91.61%] p-5 text-left shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:-translate-y-1"
          >
            <h2 className="LabTheoryHeads mb-2.5 text-[1.5rem] font-bold text-[rgb(91,230,255)]">
              Lab Problems
            </h2>
            <div className="LabTheoryTexts my-[15px] leading-[1.125rem] text-[#ccc]">
              Welcome to our Lab Questions section, where you can embark on an
              exciting journey of hands-on learning. Immerse yourself in the
              world of programming and data structures through a wide array of
              exercises and challenges. Whether you're new to coding or an
              aspiring developer, our carefully curated collection of real-world
              problems and their solutions is your go-to resource. These
              exercises are designed to help you build a strong foundation,
              refine your practical skills, and gain the valuable experience
              necessary for success in your programming adventures.
            </div>
            <Link href="/pds/lab">
              <button className="LabTheoryBtns mt-2.5 cursor-pointer rounded border-none bg-[#0074d9] px-5 py-1.5 font-bold text-white no-underline hover:bg-[#0056b3]">
                See Problems
              </button>
            </Link>
          </div>

          {/* Theory Problems */}
          <div
            id="theoryContainer"
            className="LabTheoryItems m-4 flex-1 rounded-lg border border-[#555] bg-gradient-to-br from-white from-[-278.56%] via-[#24248b] via-[-78.47%] to-[#11101d] to-[91.61%] p-5 text-left shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:-translate-y-1"
          >
            <h2 className="LabTheoryHeads mb-2.5 text-[1.5rem] font-bold text-[rgb(91,230,255)]">
              Theory Problems
            </h2>
            <div className="LabTheoryTexts my-[15px] leading-[1.125rem] text-[#ccc]">
              Step into the realm of theoretical knowledge with our Theory
              Questions section. Here, you can explore the fundamental
              principles that underpin programming and data structures. Dive
              into a diverse set of questions that cover the theoretical
              foundations of computer science and software engineering. While
              these resources are valuable for learners at any level, they are
              particularly beneficial for those who want to deepen their
              understanding of the theoretical aspects of these subjects.
            </div>
            <Link href="/pds/theory">
              <button className="LabTheoryBtns mt-2.5 cursor-pointer rounded border-none bg-[#0074d9] px-5 py-1.5 font-bold text-white no-underline hover:bg-[#0056b3]">
                See Problems
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
