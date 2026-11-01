const ITEMS = ["Blockchain", "Smart Contracts", "Artificial Intelligence", "Web Development", "Hackathons", "Workshops", "DSA", "PDS", "Open Source", "Metaverse", "dekodeX"];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="kik-marquee relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="kik-marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-kanit text-lg text-[#9deffc]/80">
            {t}
            <span className="text-[#11e3fb]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
