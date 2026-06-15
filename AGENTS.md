# KodeinKGP Website (KiK-NextJS)

Official website for **KodeinKGP: Technology Web3.0 Society**, IIT Kharagpur.

- **Live site:** https://kodeinkgp.in
- **GitHub org:** KodeinKGP-Technology-Web-3-0-Society
- **Repo:** KiK-NextJS

## About KodeinKGP

Student-run tech society (founded ~2020) focused on Web3, AI, blockchain, and web development. The society runs workshops, hackathons (e.g. dekodeX, Tech Triad), and builds tools for the IIT KGP student community — including 260+ PDS problems, technical articles, and event platforms.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 · Framer Motion · GSAP · Three.js
- Firebase (auth + admin)

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm run format
```

## Key directories

| Path | Purpose |
|------|---------|
| `src/app/` | Next.js routes (pds, articles, teams, events, dekodeX, auth, …) |
| `src/Components/` | Shared React components |
| `src/components/` | Newer layout/UI components (Navbar, Footer, sections) |
| `src/contexts/` | Auth and other React contexts |
| `public/data/` | Static data (PDS problems, test cases) |

## Conventions

- Prefer existing component patterns in `src/components/` for new UI
- Firebase auth flows live in `src/contexts/authContext` and `src/app/auth/`
- dekodeX (competitive programming platform) APIs are under `src/app/dekodeX/api/`
- Do not commit secrets, Firebase service account keys, or `.env` files
- Match existing fonts and design tokens in `globals.css` (Space Grotesk, DM Sans, JetBrains Mono)

## Related repo

**Aeropt-frontend** — separate Next.js app for the Aeropt AI agent product (same society, different codebase).
