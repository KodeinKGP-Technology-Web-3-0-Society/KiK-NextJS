import Link from "next/link";
import Image from "next/image";
import programmer from "../../../public/programmer-image.png";
import Reveal from "./Reveal";

const STEPS = [
  { n: "01", title: "Register", text: "Fill the quick registration form to join the community." },
  { n: "02", title: "Learn & Practice", text: "Work through PDS problems, articles and workshops." },
  { n: "03", title: "Compete & Build", text: "Take on dekodeX and hackathons with your team." },
];

export default function JoinCTA() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="mb-12 text-center">
          <p className="font-poppins text-sm tracking-[0.25em] text-[#11e3fb] uppercase">How it works</p>
          <h2 className="kik-gradient-text mt-3 font-kanit text-4xl font-bold md:text-5xl">Get Started in 3 Steps</h2>
        </Reveal>
        <div className="relative grid gap-6 md:grid-cols-3">
          <div className="absolute top-10 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-transparent via-[#11e3fb]/50 to-transparent md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 150}>
              <div className="relative text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#11e3fb]/40 bg-[#07072e] font-kanit text-2xl font-bold text-[#5be6ff] shadow-[0_0_30px_rgba(17,227,251,0.2)]">
                  {s.n}
                </div>
                <h3 className="mt-5 font-kanit text-xl font-semibold text-white">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs font-poppins text-sm leading-6 text-[#a8b3c4]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-[#11e3fb]/20 bg-gradient-to-br from-[#0a2f45] via-[#071a40] to-[#06103a] p-8 md:p-12">
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#11e3fb]/20 blur-[90px]" />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="font-kanit text-3xl leading-tight font-bold text-white md:text-5xl">
                  Still getting stuck in <span className="kik-gradient-text">PDS</span>?
                </h2>
                <p className="mt-4 max-w-md font-poppins text-sm leading-7 text-[#c3cee0]">
                  Our curated PDS problem set and theory notes are built to get you unstuck. Or jump straight in and become part of KodeinKGP.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link href="/pds" className="rounded-xl bg-gradient-to-r from-[#11e3fb] to-[#5be6ff] px-6 py-3 font-poppins text-sm font-semibold text-[#01011b] transition hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(17,227,251,0.5)]">
                    Start practicing
                  </Link>
                  <Link href="/regform" className="rounded-xl border border-white/20 px-6 py-3 font-poppins text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#11e3fb] hover:bg-[#11e3fb]/10">
                    Join the society
                  </Link>
                </div>
              </div>
              <Image src={programmer} alt="Programmer illustration" className="mx-auto w-full max-w-sm animate-float" />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
