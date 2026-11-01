"use client";
import Image from "next/image";
import { Globe, BrainCircuit, Blocks, Code2 } from "lucide-react";
import Logo from "../../../public/KIK_logo-removebg.png";

const INNER = [
  { Icon: Globe, label: "Web", a: 0 },
  { Icon: BrainCircuit, label: "AI", a: 120 },
  { Icon: Blocks, label: "Blockchain", a: 240 },
];
const OUTER = [45, 165, 285];

function Chip({ Icon, label, a, rev }) {
  return (
    <div
      className="kik-orbit-chip absolute top-0 left-1/2 flex items-center gap-1.5 rounded-full border border-[#5ce1e6]/40 bg-[#06103a]/90 px-3.5 py-2 font-poppins text-xs font-medium whitespace-nowrap text-[#def9fa] shadow-[0_0_24px_rgba(92,225,230,0.25)] backdrop-blur"
      style={{
        "--a": `${a}deg`,
        animation: `${rev ? "kik-orbit-chip-rev" : "kik-orbit-chip"} 28s linear infinite`,
      }}
    >
      <Icon size={16} className="text-[#5ce1e6]" />
      {label}
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* ambient glow */}
      <div className="absolute inset-[12%] rounded-full bg-[#33bbcf]/20 blur-[70px]" />

      {/* grid disc */}
      <div
        className="absolute inset-[6%] rounded-full opacity-60 [mask-image:radial-gradient(circle,#000_30%,transparent_72%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(92,225,230,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(92,225,230,0.18) 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* rings */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(92,225,230,0.35)" strokeWidth="0.25" strokeDasharray="1.2 1.6" className="kik-dash" style={{ animation: "kik-dash 3s linear infinite" }} />
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(92,225,230,0.2)" strokeWidth="0.25" />
      </svg>

      {/* inner orbit (r = 30%) */}
      <div className="kik-orbit absolute inset-[20%]" style={{ animation: "kik-orbit 28s linear infinite" }}>
        {INNER.map((c) => (
          <div key={c.label} className="absolute inset-0" style={{ transform: `rotate(${c.a}deg)` }}>
            <Chip {...c} />
          </div>
        ))}
      </div>

      {/* outer orbit (r = 44%) — small nodes, opposite direction */}
      <div className="kik-orbit absolute inset-[6%]" style={{ animation: "kik-orbit 46s linear infinite reverse" }}>
        {OUTER.map((a) => (
          <div key={a} className="absolute inset-0" style={{ transform: `rotate(${a}deg)` }}>
            <span className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5ce1e6] shadow-[0_0_18px_6px_rgba(92,225,230,0.5)]" />
          </div>
        ))}
      </div>

      {/* core */}
      <div className="absolute top-1/2 left-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 rounded-full border border-[#5ce1e6]/60" style={{ animation: "kik-pulse-ring 2.8s ease-out infinite" }} />
        <span className="absolute inset-0 rounded-full border border-[#5ce1e6]/40" style={{ animation: "kik-pulse-ring 2.8s ease-out 1.4s infinite" }} />
        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-[#5ce1e6]/50 bg-[#06103a] shadow-[0_0_50px_rgba(92,225,230,0.35)]">
          <Image src={Logo} alt="KodeinKGP" className="h-[70%] w-[70%] object-contain" priority />
        </div>
      </div>

      {/* floating code card */}
      <div className="animate-float absolute -right-2 bottom-2 hidden w-52 rounded-xl border border-[#5ce1e6]/25 bg-[#050529]/85 p-3 font-[family-name:var(--font-geist-mono)] text-[11px] leading-5 shadow-2xl backdrop-blur sm:block">
        <div className="mb-1.5 flex items-center gap-1.5 text-[#5ce1e6]">
          <Code2 size={13} /> <span>society.js</span>
        </div>
        <p><span className="text-[#33bbcf]">learn</span><span className="text-[#a8b3c4]">(</span><span className="text-[#9be9a8]">&quot;web3&quot;</span><span className="text-[#a8b3c4]">);</span></p>
        <p><span className="text-[#33bbcf]">build</span><span className="text-[#a8b3c4]">(</span><span className="text-[#9be9a8]">&quot;together&quot;</span><span className="text-[#a8b3c4]">);</span></p>
      </div>
    </div>
  );
}
