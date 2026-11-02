import Image from "next/image";
import { Facebook, Github, Instagram, Linkedin, Mail } from "lucide-react";

// Rectangular photo with a tech/HUD treatment: corner brackets, a blue tint, and a
// scanner line that sweeps down the photo on hover.
const Corner = ({ pos }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute z-20 h-4 w-4 border-[#2ea8ff] transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-[#5ce1e6] ${pos}`}
  />
);

export default function MemberCard({ name, role, image_url, facebook, instagram, linkedin, github, mailid }) {
  const links = [
    github && { href: github, label: "GitHub", Icon: Github },
    linkedin && { href: linkedin, label: "LinkedIn", Icon: Linkedin },
    instagram && { href: instagram, label: "Instagram", Icon: Instagram },
    facebook && { href: facebook, label: "Facebook", Icon: Facebook },
    mailid && { href: `mailto:${mailid}`, label: "Email", Icon: Mail },
  ].filter(Boolean);

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden border border-[#243158] bg-[#0f1a3a]">
        {image_url ? (
          <Image
            src={image_url}
            alt={name || "Team member"}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
            className="object-cover object-top transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs text-[#9aa3b8]">No photo</div>
        )}

        {/* faint grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(92,225,230,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(92,225,230,0.12)_1px,transparent_1px)] [background-size:24px_24px]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050a1f]/80 to-transparent" />

        {/* scanner line */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100">
          <span
            className="absolute inset-x-0 top-0 h-[3px] bg-[#5ce1e6] shadow-[0_0_14px_3px_rgba(92,225,230,0.7)]"
            style={{ animation: "tm-scan 1.8s ease-in-out infinite" }}
          />
        </div>

        {/* corner brackets */}
        <Corner pos="top-1.5 left-1.5 border-t-2 border-l-2" />
        <Corner pos="top-1.5 right-1.5 border-t-2 border-r-2" />
        <Corner pos="bottom-1.5 left-1.5 border-b-2 border-l-2" />
        <Corner pos="bottom-1.5 right-1.5 border-b-2 border-r-2" />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        {role && (
          <p className="mt-0.5 font-mono text-xs text-[#5ce1e6]">
            <span className="text-[#2ea8ff]">// </span>
            {role}
          </p>
        )}
      </div>

      {/* socials: space reserved so nothing jumps on hover */}
      <ul className="mt-3 flex h-8 items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
        {links.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name}: ${label}`}
              className="flex h-8 w-8 items-center justify-center border border-[#243158] text-[#9aa3b8] transition-colors hover:border-[#2ea8ff] hover:bg-[#2ea8ff] hover:text-[#0b1430]"
            >
              <Icon size={15} />
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
