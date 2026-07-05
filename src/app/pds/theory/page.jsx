"use client";

import Link from "next/link";

export default function Theory() {
  return (
    <div className="bg-[rgb(1,1,27)] font-sans">
      <h1 className="py-5 text-center text-[2rem] font-[500] text-[#5be6ff]">
        THEORY TOPICS
      </h1>

      <div className="flex flex-col items-center justify-evenly gap-5 p-5 sm:flex-row sm:flex-wrap">
        {[
          {
            id: "initialBasics",
            name: "Initial Basics",
            link: "/BASICS.pdf",
          },
          {
            id: "loops",
            name: "Loops",
            link: "/LOOPS.pdf",
          },
          {
            id: "oneDArrays",
            name: "1D Arrays and Strings",
            link: "/ARRAY.pdf",
          },
          {
            id: "functions",
            name: "Functions and Recursions",
            link: "/FUNCTION.pdf",
          },
          {
            id: "pointers",
            name: "Structures and Pointers",
            link: "/STRUCTURES.pdf",
          },
        ].map(({ id, name, link }) => (
          <a
            key={id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[80vw] text-xl font-semibold no-underline"
          >
            <div className="rounded-[10px] border border-[#555] bg-[#434343] p-5 text-center text-white shadow-md transition-transform duration-200 hover:-translate-y-1.5">
              {name}
            </div>
          </a>
        ))}

        <Link
          href="/pds/theory/theoryTest"
          className="w-[80vw] text-xl font-semibold no-underline"
        >
          <div className="rounded-[10px] border border-[#555] bg-[#434343] p-5 text-center text-white shadow-md transition-transform duration-200 hover:-translate-y-1.5">
            Theory Tests [Combined]
          </div>
        </Link>
      </div>
    </div>
  );
}