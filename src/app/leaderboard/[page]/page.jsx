"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// ==========================================
// NEW DESIGN SUB-COMPONENTS
// ==========================================
function UserStatsCard({
  loggedIn,
  solvedQuestions,
  points,
  rank,
  totalUsers,
}) {
  const canRevealRank = loggedIn && solvedQuestions > 0;
  const solvedPercent = loggedIn ? Math.max((solvedQuestions / 10) * 100, 1) : 1;
  const rankPosition =
    canRevealRank && rank && totalUsers > 0
      ? Math.min(Math.max((rank / totalUsers) * 100, 1), 100)
      : 1;

  return (
    <div className="rounded-2xl border border-white/5 bg-[#0e1638]/65 p-4">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-cyan-200/70 uppercase">
            Your Progress
          </p>
          <p className="text-sm text-slate-400">
            {loggedIn ? "Live leaderboard stats" : "Login to reveal stats"}
          </p>
        </div>
        <div className="w-fit rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
          {loggedIn ? "Active" : "Locked"}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[120px_minmax(0,1fr)] gap-3">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#01011b]/35 p-3">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full ${
              loggedIn ? "" : "blur-sm"
            }`}
            style={{
              background: `conic-gradient(#22d3ee ${solvedPercent}%, rgba(255,255,255,0.08) ${solvedPercent}%)`,
            }}
          >
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-[#071126]">
              <span className="text-lg font-semibold text-cyan-100">
                {loggedIn ? solvedQuestions : "0"}
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                /10
              </span>
            </div>
          </div>
          <p className="mt-2 text-xs font-semibold text-cyan-100">Solved</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-white/5 bg-[#01011b]/35 p-3">
            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-400">Rank</span>
              <span
                className={`font-semibold text-cyan-100 ${
                  canRevealRank ? "" : "blur-sm select-none"
                }`}
              >
                {canRevealRank && rank ? `#${rank}` : "000"}
              </span>
            </div>
            <div className="relative h-8">
              <div className="absolute top-1/2 right-0 left-0 h-2 -translate-y-1/2 rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full bg-cyan-300/45 ${
                    canRevealRank ? "" : "blur-sm"
                  }`}
                  style={{ width: `${rankPosition}%` }}
                />
              </div>
              <div
                className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/40 bg-[#071126] p-1.5 text-cyan-200 shadow-lg shadow-cyan-950/30 ${
                  canRevealRank ? "" : "blur-sm"
                }`}
                style={{ left: `${rankPosition}%` }}
              >
                <Trophy size={15} />
              </div>
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-slate-500">
              <span>#1</span>
              <span>{totalUsers || 0} users</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#01011b]/35 p-3">
            <p className="text-xs font-medium text-slate-400">Points</p>
            <p
              className={`mt-1 text-2xl font-semibold text-cyan-100 ${
                loggedIn ? "" : "blur-sm select-none"
              }`}
            >
              {loggedIn ? points : "000"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserCard({ loggedIn, username }) {
  return (
    <div className="mt-3 rounded-2xl border border-white/5 bg-[#0e1638]/65 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-cyan-200/70 uppercase">
            Operator
          </p>
          <p className="text-sm text-slate-400">KAI terminal session</p>
        </div>
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            loggedIn ? "bg-emerald-400" : "bg-slate-500"
          }`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/5 bg-[#01011b]/35 p-3">
          <p className="text-xs font-medium text-slate-400">Username</p>
          <p className="mt-1 truncate text-sm font-semibold text-cyan-100">
            {loggedIn ? username || "Anonymous" : "Anonymous"}
          </p>
        </div>
        <div className="rounded-xl border border-white/5 bg-[#01011b]/35 p-3">
          <p className="text-xs font-medium text-slate-400">Last logged in</p>
          <p className="mt-1 text-sm font-semibold text-cyan-100">
            {loggedIn ? "online" : "never"}
          </p>
        </div>
      </div>
    </div>
  );
}

function LeaderboardSkeleton() {
  return (
    <div className="p-4 w-full mx-auto">
      <div className="mb-3 flex items-center justify-center">
        <h2 className="text-[1.35rem] font-semibold text-cyan-100">
          Leaderboard
        </h2>
      </div>
      <div className="mx-auto mb-4 flex max-w-lg items-end justify-center gap-2 px-2">
        <div className="h-[160px] w-1/3 animate-pulse rounded-tl-2xl border border-white/5 bg-white/5" />
        <div className="h-[196px] w-1/3 animate-pulse rounded-t-2xl border border-white/5 bg-white/10" />
        <div className="h-[148px] w-1/3 animate-pulse rounded-tr-2xl border border-white/5 bg-white/5" />
      </div>
    </div>
  );
}

// ==========================================
// MAIN ROUTE COMPONENT
// ==========================================
export default function LeaderboardPage() {
  const { loggedIn, user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const currentPage = parseInt(params?.page, 10) || 1;

  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const [fetchedLeaderboardData, setFetchedLeaderboardData] = useState([]);
  const [currentUserLeaderboardInfo, setCurrentUserLeaderboardInfo] = useState(null);
  const [topData, setTopData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 10;
  const solvedQuestions =
    user?.submissions?.filter((submission) => Number(submission) > 0).length ?? 0;

  useEffect(() => {
    async function getLeaderboardData() {
      setIsLoading(true);
      try {
        const qs = new URLSearchParams();
        if (user?.email) qs.set("email", user.email);
        if (user?.uid) qs.set("uid", user.uid);
        qs.set("pageSize", String(itemsPerPage));

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dekodeX/api/leaderboard/${currentPage}?${qs.toString()}`
        );
        const data = await res.json();

        if (!res.ok) {
          toast.error(data?.error || "Error fetching leaderboard.");
          return;
        } else {
          setFetchedLeaderboardData(data.paginatedLeaderboard || []);
          setTopData(data.podium || []);
          setCurrentUserLeaderboardInfo(data.currentUser || null);
          if (data.meta) {
            setTotalUsers(data.meta.leaderboardSize ?? 0);
            setTotalPages(data.meta.totalPages ?? 0);
          }
          return;
        }
      } catch (error) {
        toast.error(`Error fetching leaderboard data: ${error.message}`);
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getLeaderboardData();
  }, [currentPage, user?.email]);

  const handlePageNavigation = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) return;
    router.push(`/leaderboard/${pageNumber}`);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#070b1e] p-2 sm:p-4 items-center justify-start overflow-x-hidden">
      
      {/* Central Card Shield */}
      <div className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-cyan-500/15 bg-[#0b112c]/50 shadow-2xl shadow-black/60 backdrop-blur-xl p-3 sm:p-6 mt-4">
        
        {isLoading ? (
          <LeaderboardSkeleton />
        ) : fetchedLeaderboardData && totalUsers >= 10 ? (
          <div className="flex h-full flex-col">
            <div className="flex w-full flex-col items-center justify-center pt-2 pb-3">
              <h2 className="mb-5 text-[1.5rem] sm:text-[2rem] font-bold text-cyan-100 text-center tracking-wide">
                Leaderboard
              </h2>

              {/* Podium Section */}
              <div className="w-full max-w-md mx-auto px-1">
                <div className="relative flex flex-wrap sm:flex-nowrap items-end justify-center gap-2 pb-1">
                  
                  {/* Second Place */}
                  {topData[1] && (
                    <div className="relative flex h-[160px] flex-1 min-w-[95px] max-w-[120px] flex-col items-center justify-end overflow-hidden rounded-tl-2xl border border-slate-200/20 bg-gradient-to-b from-slate-200/25 via-slate-300/10 to-cyan-500/10 py-3 shadow-md">
                      <div className="pointer-events-none absolute top-0 right-0 left-0 h-6 bg-white/5" />
                      <div className="relative mb-2 h-12 w-12 rounded-full ring-2 ring-slate-100/40 ring-offset-2 ring-offset-[#0b1025]">
                        <img
                          src={`https://robohash.org/${encodeURIComponent(topData[1].name)}?set=set1`}
                          alt={topData[1].name}
                          className="h-full w-full rounded-full object-cover"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border border-slate-200/40 bg-slate-100 px-1.5 py-[1px] text-[9px] font-extrabold text-black">
                          2ND
                        </div>
                      </div>
                      <p className="w-full truncate px-1 text-center text-xs font-semibold text-white/90">
                        {topData[1].name.split(" ")[0]}
                      </p>
                      <p className="mt-1 rounded-full border border-slate-100/35 bg-slate-100/15 px-2 py-0.5 text-[10px] font-bold text-slate-100">
                        {topData[1].score}
                      </p>
                    </div>
                  )}

                  {/* First Place */}
                  {topData[0] && (
                    <div className="relative flex h-[196px] flex-1 min-w-[110px] max-w-[135px] flex-col items-center justify-end overflow-hidden rounded-t-2xl border border-yellow-300/40 bg-gradient-to-b from-yellow-300/30 via-amber-300/10 to-cyan-500/15 py-3 shadow-lg">
                      <div className="pointer-events-none absolute top-0 right-0 left-0 h-7 bg-white/10" />
                      <div className="relative mb-2 h-14 w-14 rounded-full ring-2 ring-yellow-300/60 ring-offset-2 ring-offset-[#0b1025]">
                        <img
                          src={`https://robohash.org/${encodeURIComponent(topData[0].name)}?set=set1`}
                          alt={topData[0].name}
                          className="h-full w-full rounded-full object-cover"
                        />
                        <img
                          src="/dekodeX/crown.png"
                          alt="Crown"
                          className="absolute -top-6 left-1/2 w-8 -translate-x-1/2 transform drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border border-yellow-200 bg-yellow-300 px-1.5 py-[1px] text-[9px] font-extrabold text-black">
                          1ST
                        </div>
                      </div>
                      <p className="w-full truncate px-1 text-center text-sm font-bold text-yellow-100">
                        {topData[0].name.split(" ")[0]}
                      </p>
                      <p className="mt-1 rounded-full border border-yellow-300/55 bg-yellow-300/20 px-2 py-0.5 text-xs font-extrabold text-yellow-100">
                        {topData[0].score}
                      </p>
                    </div>
                  )}

                  {/* Third Place */}
                  {topData[2] && (
                    <div className="relative flex h-[148px] flex-1 min-w-[95px] max-w-[120px] flex-col items-center justify-end overflow-hidden rounded-tr-2xl border border-amber-700/30 bg-gradient-to-b from-amber-700/30 via-orange-500/10 to-cyan-500/10 py-3 shadow-md">
                      <div className="pointer-events-none absolute top-0 right-0 left-0 h-6 bg-white/5" />
                      <div className="relative mb-2 h-12 w-12 rounded-full ring-2 ring-amber-500/50 ring-offset-2 ring-offset-[#0b1025]">
                        <img
                          src={`https://robohash.org/${encodeURIComponent(topData[2].name)}?set=set1`}
                          alt={topData[2].name}
                          className="h-full w-full rounded-full object-cover"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border border-orange-200/40 bg-orange-300 px-1.5 py-[1px] text-[9px] font-extrabold text-black">
                          3RD
                        </div>
                      </div>
                      <p className="w-full truncate px-1 text-center text-xs font-semibold text-orange-200">
                        {topData[2].name.split(" ")[0]}
                      </p>
                      <p className="mt-1 rounded-full border border-orange-300/45 bg-orange-300/15 px-2 py-0.5 text-[10px] font-bold text-orange-200">
                        {topData[2].score}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* List Section with 65% Translucent Solid Backgrounds */}
            <div className="flex flex-col mt-4">
              <ul className="space-y-2 w-full">
                {fetchedLeaderboardData.map((userItem) => (
                  <li
                    key={userItem.rank}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0e1638]/65 px-4 py-3 transition-colors duration-200 hover:border-cyan-300/20 hover:bg-[#0e1638]/80"
                  >
                    <span className="w-6 text-right text-sm font-semibold text-cyan-200">
                      {userItem.rank}.
                    </span>
                    <img
                      src={`https://robohash.org/${encodeURIComponent(userItem.name)}?set=set1`}
                      alt={userItem.name}
                      className="h-7 w-7 rounded-full border border-white/20 object-cover"
                    />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-white/90">
                      {userItem.name}
                    </span>
                    <span className="text-sm font-semibold text-cyan-200">
                      {userItem.score}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Pagination Controls */}
              <div className="mt-5 mb-2 flex items-center justify-center gap-1.5 flex-wrap">
                <div
                  onClick={() => handlePageNavigation(currentPage - 1)}
                  className={`cursor-pointer rounded-lg border border-white/5 bg-[#0e1638]/30 px-3 py-1 text-sm text-white hover:bg-[#0e1638]/60 ${currentPage === 1 ? "pointer-events-none opacity-30" : ""}`}
                >
                  &lt;
                </div>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (pageNumber === 1 || pageNumber === totalPages || Math.abs(pageNumber - currentPage) <= 1) {
                    return (
                      <div
                        key={pageNumber}
                        onClick={() => handlePageNavigation(pageNumber)}
                        className={`cursor-pointer rounded-lg border border-white/5 px-3 py-1 text-sm transition ${currentPage === pageNumber ? "bg-cyan-300 text-[#070b1e] font-semibold" : "bg-[#0e1638]/30 text-white hover:bg-[#0e1638]/60"}`}
                      >
                        {pageNumber}
                      </div>
                    );
                  }
                  if ((pageNumber === 2 && currentPage > 3) || (pageNumber === totalPages - 1 && currentPage < totalPages - 2)) {
                    return <span key={`ell-${pageNumber}`} className="text-slate-500 text-xs px-0.5">...</span>;
                  }
                  return null;
                })}

                <div
                  onClick={() => handlePageNavigation(currentPage + 1)}
                  className={`cursor-pointer rounded-lg border border-white/5 bg-[#0e1638]/30 px-3 py-1 text-sm text-white hover:bg-[#0e1638]/60 ${currentPage === totalPages ? "pointer-events-none opacity-30" : ""}`}
                >
                  &gt;
                </div>
              </div>
            </div>

            {/* Bottom Progress Stats Panel */}
            <div className="mt-5 space-y-3">
              <UserStatsCard
                loggedIn={loggedIn}
                solvedQuestions={solvedQuestions}
                points={currentUserLeaderboardInfo?.score ?? 0}
                rank={currentUserLeaderboardInfo?.rank ?? null}
                totalUsers={totalUsers}
              />
              <UserCard
                loggedIn={loggedIn}
                username={user?.username || currentUserLeaderboardInfo?.username}
              />
            </div>
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center">
            <h2 className="text-center text-lg font-semibold text-cyan-100">
              The leaderboard will be updated soon
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
