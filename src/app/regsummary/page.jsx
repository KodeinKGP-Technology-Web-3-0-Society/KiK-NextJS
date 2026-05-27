"use client";

import { useEffect, useState, useMemo } from "react";
import { db } from "@/backend/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "./regsummary.css";

/* ─── Team config ─────────────────────────────────────────────── */
const TEAMS = [
  {
    value: "AI and Metaverse Team",
    short: "AI & Metaverse",
    icon: "◈",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.35)",
  },
  {
    value: "Blockchain Team",
    short: "Blockchain",
    icon: "⬡",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.35)",
  },
  {
    value: "Tech Team",
    short: "Tech",
    icon: "⟨/⟩",
    color: "#11e3fb",
    glow: "rgba(17,227,251,0.35)",
  },
  {
    value: "Design and Media Team",
    short: "Design & Media",
    icon: "✦",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.35)",
  },
  {
    value: "Events Team",
    short: "Events",
    icon: "◎",
    color: "#34d399",
    glow: "rgba(52,211,153,0.35)",
  },
];

/* ─── Helpers ─────────────────────────────────────────────────── */
const fmt = (ts) => {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* ─── Sub-components ──────────────────────────────────────────── */
function Loader() {
  return (
    <div className="rs-loader-wrap">
      <div className="rs-loader-ring" />
      <p className="rs-loader-text">Fetching registrations…</p>
    </div>
  );
}

function StatCard({ label, value, color, glow, icon, delay = 0 }) {
  return (
    <div
      className="rs-stat-card"
      style={{
        "--card-color": color,
        "--card-glow": glow,
        animationDelay: `${delay}ms`,
      }}
    >
      <span className="rs-stat-icon">{icon}</span>
      <span className="rs-stat-value">{value}</span>
      <span className="rs-stat-label">{label}</span>
    </div>
  );
}

function TeamBar({ team, count, max }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="rs-team-bar-row">
      <div className="rs-team-bar-meta">
        <span className="rs-team-bar-icon" style={{ color: team.color }}>
          {team.icon}
        </span>
        <span className="rs-team-bar-name">{team.short}</span>
        <span
          className="rs-team-bar-count"
          style={{ color: team.color, textShadow: `0 0 8px ${team.glow}` }}
        >
          {count}
        </span>
      </div>
      <div className="rs-bar-track">
        <div
          className="rs-bar-fill"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${team.color}88, ${team.color})`,
            boxShadow: `0 0 10px ${team.glow}`,
          }}
        />
      </div>
    </div>
  );
}

function RegistrantRow({ reg, index }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr
        className={`rs-table-row ${open ? "rs-table-row--open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        style={{ animationDelay: `${index * 30}ms` }}
      >
        <td className="rs-td rs-td-idx">{index + 1}</td>
        <td className="rs-td rs-td-name">{reg.name}</td>
        <td className="rs-td rs-td-roll rs-mono">{reg.rollNumber}</td>
        <td className="rs-td rs-td-teams">
          <div className="rs-team-pills">
            {(reg.teamsApplyingFor || []).map((t) => {
              const cfg = TEAMS.find((x) => x.value === t);
              return (
                <span
                  key={t}
                  className="rs-team-pill"
                  style={{
                    borderColor: cfg?.color ?? "#11e3fb",
                    color: cfg?.color ?? "#11e3fb",
                    boxShadow: `0 0 6px ${cfg?.glow ?? "rgba(17,227,251,0.3)"}`,
                  }}
                >
                  {cfg?.icon ?? "•"} {cfg?.short ?? t}
                </span>
              );
            })}
          </div>
        </td>
        <td className="rs-td rs-td-hall">{reg.hallOfResidence}</td>
        <td className="rs-td rs-td-chevron">
          <span className={`rs-chevron ${open ? "rs-chevron--up" : ""}`}>›</span>
        </td>
      </tr>

      {open && (
        <tr className="rs-detail-row">
          <td colSpan={6} className="rs-detail-td">
            <div className="rs-detail-grid">
              <div className="rs-detail-item">
                <span className="rs-detail-key">Email</span>
                <span className="rs-detail-val rs-mono">{reg.email}</span>
              </div>
              <div className="rs-detail-item">
                <span className="rs-detail-key">Mobile</span>
                <span className="rs-detail-val rs-mono">{reg.mobileNumber}</span>
              </div>
              <div className="rs-detail-item rs-detail-item--full">
                <span className="rs-detail-key">Other Involvements</span>
                <span className="rs-detail-val">{reg.otherInvolvements || "—"}</span>
              </div>
              <div className="rs-detail-item rs-detail-item--full">
                <span className="rs-detail-key">Why join KodeinKGP?</span>
                <span className="rs-detail-val">{reg.joinReason || "—"}</span>
              </div>
              <div className="rs-detail-item">
                <span className="rs-detail-key">Submitted at</span>
                <span className="rs-detail-val rs-mono">{fmt(reg.timestamp)}</span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/* ─── Main Page ───────────────────────────────────────────────── */
export default function RegSummary() {
  const [regs, setRegs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterTeam, setFilterTeam] = useState("All");

  useEffect(() => {
    (async () => {
      try {
        const q = query(
          collection(db, "registrations"),
          orderBy("timestamp", "desc")
        );
        const snap = await getDocs(q);
        setRegs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const teamCounts = useMemo(
    () =>
      TEAMS.reduce((acc, t) => {
        acc[t.value] = regs.filter((r) =>
          r.teamsApplyingFor?.includes(t.value)
        ).length;
        return acc;
      }, {}),
    [regs]
  );

  const maxCount = useMemo(
    () => Math.max(...Object.values(teamCounts), 1),
    [teamCounts]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return regs.filter((r) => {
      const matchSearch =
        !q ||
        r.name?.toLowerCase().includes(q) ||
        r.rollNumber?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.hallOfResidence?.toLowerCase().includes(q);
      const matchTeam =
        filterTeam === "All" || r.teamsApplyingFor?.includes(filterTeam);
      return matchSearch && matchTeam;
    });
  }, [regs, search, filterTeam]);

  if (loading) return <Loader />;

  return (
    <div className="rs-page">
      {/* Ambient background orbs */}
      <div className="rs-orb rs-orb-1" />
      <div className="rs-orb rs-orb-2" />
      <div className="rs-orb rs-orb-3" />

      {/* ── Header ── */}
      <header className="rs-header">
        <div className="rs-header-eyebrow">
          <span className="rs-eyebrow-dot" />
          SELECTIONS · 2025–26
        </div>
        <h1 className="rs-title">Registration Overview</h1>
        <p className="rs-subtitle">
          KodeinKGP Sophomore Selections — Live Dashboard
        </p>
      </header>

      {/* ── Stats Row ── */}
      <section className="rs-stats-row">
        <StatCard
          label="Total Applicants"
          value={regs.length}
          color="#11e3fb"
          glow="rgba(17,227,251,0.4)"
          icon="◉"
          delay={0}
        />
        {TEAMS.map((t, i) => (
          <StatCard
            key={t.value}
            label={t.short}
            value={teamCounts[t.value]}
            color={t.color}
            glow={t.glow}
            icon={t.icon}
            delay={(i + 1) * 80}
          />
        ))}
      </section>

      {/* ── Team Breakdown ── */}
      <section className="rs-section rs-section--bars">
        <h2 className="rs-section-title">
          <span className="rs-section-accent">▸</span> Team-wise Breakdown
        </h2>
        <div className="rs-bar-list">
          {TEAMS.map((t) => (
            <TeamBar
              key={t.value}
              team={t}
              count={teamCounts[t.value]}
              max={maxCount}
            />
          ))}
        </div>
      </section>

      {/* ── Registrant Table ── */}
      <section className="rs-section rs-section--table">
        <div className="rs-table-header">
          <h2 className="rs-section-title">
            <span className="rs-section-accent">▸</span> All Registrants
            <span className="rs-count-badge">{filtered.length}</span>
          </h2>

          {/* Search + Filter */}
          <div className="rs-controls">
            <div className="rs-search-wrap">
              <span className="rs-search-icon">⌕</span>
              <input
                className="rs-search"
                placeholder="Search name, roll, email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="rs-filter-pills">
              <button
                className={`rs-filter-btn ${filterTeam === "All" ? "rs-filter-btn--active" : ""}`}
                onClick={() => setFilterTeam("All")}
              >
                All
              </button>
              {TEAMS.map((t) => (
                <button
                  key={t.value}
                  className={`rs-filter-btn ${filterTeam === t.value ? "rs-filter-btn--active" : ""}`}
                  style={
                    filterTeam === t.value
                      ? {
                          borderColor: t.color,
                          color: t.color,
                          boxShadow: `0 0 10px ${t.glow}`,
                        }
                      : {}
                  }
                  onClick={() =>
                    setFilterTeam((prev) =>
                      prev === t.value ? "All" : t.value
                    )
                  }
                >
                  {t.icon} {t.short}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rs-empty">
            <span className="rs-empty-icon">◌</span>
            <p>No registrants match your filter.</p>
          </div>
        ) : (
          <div className="rs-table-wrap">
            <table className="rs-table">
              <thead>
                <tr className="rs-thead-row">
                  <th className="rs-th">#</th>
                  <th className="rs-th">Name</th>
                  <th className="rs-th">Roll No.</th>
                  <th className="rs-th">Teams Applied</th>
                  <th className="rs-th">Hall</th>
                  <th className="rs-th"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((reg, i) => (
                  <RegistrantRow key={reg.id} reg={reg} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer className="rs-footer">
        KodeinKGP · Internal Dashboard · Not for public distribution
      </footer>
    </div>
  );
}
