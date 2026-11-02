import Image from "next/image";
import { Facebook, Github, Instagram, Linkedin, Mail } from "lucide-react";

// Rectangular photo with a tech/HUD treatment: corner brackets, a blue tint, and a
// scanner line that sweeps down the photo on hover.
const Corner = ({ pos }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute z-20 h-3.5 w-3.5 border-[#1e2333] transition-all duration-300 group-hover:h-5 group-hover:w-5 group-hover:border-[var(--accent)] ${pos}`}
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
      <div className="relative aspect-[4/5] overflow-hidden border border-[#1e2333] bg-[#11141d]">
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

        {/* subtle bottom gradient fade to obsidian */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#08090d]/80 to-transparent" />

        {/* Sleek diagonal light shine sweep on hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full overflow-hidden transition-transform duration-700 ease-out group-hover:translate-x-full">
          <div className="h-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
        </div>

        {/* Subtle corner brackets */}
        <Corner pos="top-1.5 left-1.5 border-t border-l" />
        <Corner pos="top-1.5 right-1.5 border-t border-r" />
        <Corner pos="bottom-1.5 left-1.5 border-b border-l" />
        <Corner pos="bottom-1.5 right-1.5 border-b border-r" />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-[#f8fafc] group-hover:text-white transition-colors">{name}</h3>
        {role && (
          <p className="mt-0.5 font-mono text-xs text-[#94a3b8]">
            <span className="text-[var(--accent)]">// </span>
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
              className="flex h-8 w-8 items-center justify-center border border-[#1e2333] text-[#94a3b8] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#08090d]"
            >
              <Icon size={15} />
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
