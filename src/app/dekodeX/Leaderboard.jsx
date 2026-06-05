"use client";
import { useAuth } from "@/contexts/authContext";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UserStatsCard({
  loggedIn,
  solvedQuestions,
  points,
  rank,
  totalUsers,
}) {
  const solvedPercent = loggedIn
    ? Math.max((solvedQuestions / 10) * 100, 1)
    : 1;
  const rankPosition =
    loggedIn && rank && totalUsers > 0
      ? Math.min(Math.max((rank / totalUsers) * 100, 1), 100)
      : 1;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-cyan-200/70 uppercase">
            Your Progress
          </p>
          <p className="text-sm text-slate-300">
            {loggedIn ? "Live leaderboard stats" : "Login to reveal stats"}
          </p>
        </div>
        <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
          {loggedIn ? "Active" : "Locked"}
        </div>
      </div>

      <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#01011b]/35 p-3">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full ${
              loggedIn ? "" : "blur-sm"
            }`}
            style={{
              background: `conic-gradient(#22d3ee ${solvedPercent}%, rgba(255,255,255,0.12) ${solvedPercent}%)`,
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
          <div className="rounded-2xl border border-white/10 bg-[#01011b]/35 p-3">
            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-400">Rank</span>
              <span
                className={`font-semibold text-cyan-100 ${
                  loggedIn ? "" : "blur-sm select-none"
                }`}
              >
                {loggedIn && rank ? `#${rank}` : "000"}
              </span>
            </div>
            <div className="relative h-8">
              <div className="absolute top-1/2 right-0 left-0 h-2 -translate-y-1/2 rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full bg-cyan-300/45 ${
                    loggedIn ? "" : "blur-sm"
                  }`}
                  style={{ width: `${rankPosition}%` }}
                />
              </div>
              <div
                className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/40 bg-[#071126] p-1.5 text-cyan-200 shadow-lg shadow-cyan-950/30 ${
                  loggedIn ? "" : "blur-sm"
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

          <div className="rounded-2xl border border-white/10 bg-[#01011b]/35 p-3">
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
    <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-cyan-200/70 uppercase">
            Operator
          </p>
          <p className="text-sm text-slate-300">KAI terminal session</p>
        </div>
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            loggedIn ? "bg-emerald-400" : "bg-slate-500"
          }`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-[#01011b]/35 p-3">
          <p className="text-xs font-medium text-slate-400">Username</p>
          <p className="mt-1 truncate text-sm font-semibold text-cyan-100">
            {loggedIn ? username || "Anonymous" : "Anonymous"}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#01011b]/35 p-3">
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
    <div className="p-4">
      <div className="mb-3 flex items-center justify-center">
        <h2 className="text-[1.35rem] font-semibold text-cyan-100">
          Leaderboard
        </h2>
      </div>

      <div className="mx-auto mb-4 flex max-w-lg items-end justify-center gap-2 px-2">
        <div className="h-[128px] w-[112px] animate-pulse rounded-tl-2xl border border-white/10 bg-white/10" />
        <div className="h-[160px] w-[132px] animate-pulse rounded-t-2xl border border-white/10 bg-white/15" />
        <div className="h-[116px] w-[112px] animate-pulse rounded-tr-2xl border border-white/10 bg-white/10" />
      </div>

      <div className="space-y-2.5">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5"
          >
            <div className="h-5 w-7 animate-pulse rounded bg-white/20" />
            <div className="h-7 w-7 animate-pulse rounded-full bg-white/20" />
            <div className="h-5 flex-1 animate-pulse rounded bg-white/20" />
            <div className="h-5 w-14 animate-pulse rounded bg-white/20" />
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="mb-2 h-3 w-24 animate-pulse rounded bg-white/20" />
            <div className="h-3 w-36 animate-pulse rounded bg-white/10" />
          </div>
          <div className="h-6 w-16 animate-pulse rounded-full bg-white/15" />
        </div>
        <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3">
          <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#01011b]/35 p-3">
            <div className="h-20 w-20 animate-pulse rounded-full bg-white/15" />
            <div className="mt-2 h-3 w-12 animate-pulse rounded bg-white/10" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl border border-white/10 bg-[#01011b]/35 p-3">
              <div className="mb-3 flex justify-between">
                <div className="h-3 w-12 animate-pulse rounded bg-white/10" />
                <div className="h-3 w-10 animate-pulse rounded bg-white/20" />
              </div>
              <div className="h-8 animate-pulse rounded-full bg-white/10" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#01011b]/35 p-3">
              <div className="mb-2 h-3 w-12 animate-pulse rounded bg-white/10" />
              <div className="h-7 w-20 animate-pulse rounded bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="mb-2 h-3 w-16 animate-pulse rounded bg-white/20" />
            <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
          </div>
          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-white/20" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-[#01011b]/35 p-3">
            <div className="mb-2 h-3 w-16 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-24 animate-pulse rounded bg-white/20" />
          </div>
          <div className="rounded-xl border border-white/10 bg-[#01011b]/35 p-3">
            <div className="mb-2 h-3 w-20 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-16 animate-pulse rounded bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const { loggedIn, user } = useAuth();

  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [fetchedLeaderboardData, setFetchedLeaderboardData] = useState([]);
  const [currentUserLeaderboardInfo, setCurrentUserLeaderboardInfo] =
    useState(null);
  const [topData, setTopData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 10;
  const solvedQuestions =
    user?.submissions?.filter((submission) => Number(submission) > 0).length ??
    0;
  // console.log("leaderboard",user?.email);

  useEffect(() => {
    async function getLeaderboardData() {
      setIsLoading(true);
      try {
        const qs = new URLSearchParams();
        if (user?.email) qs.set("email", user.email);
        qs.set("pageSize", String(itemsPerPage));

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dekodeX/api/leaderboard/${currentPage}?${qs.toString()}`
        );
        const data = await res.json();

        if (!res.ok) {
          toast.error(
            data?.error || "Error fetching leaderboard. Please try again later."
          );
          return;
        } else {
          setFetchedLeaderboardData(data.paginatedLeaderboard || []);
          setTopData(data.podium || []);
          setCurrentUserLeaderboardInfo(data.currentUser || null);
          if (data.meta) {
            setTotalUsers(data.meta.leaderboardSize ?? 0);
            setTotalPages(data.meta.totalPages ?? 0);
          }
          if (data.currentUser && data.currentUser.username !== "Anonymous") {
            toast.success(
              `Welcome back, ${data.currentUser.username}! Your current score is ${data.currentUser.score}.`
            );
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

  const goToPage = (pageNumber) => {
    if (
      pageNumber === currentPage ||
      pageNumber < 1 ||
      pageNumber > totalPages
    ) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-cyan-300/20 bg-white/[0.055] shadow-2xl shadow-black/25 backdrop-blur-xl">
        {isLoading ? (
          <LeaderboardSkeleton />
        ) : fetchedLeaderboardData && totalUsers >= 10 ? (
          <div className="flex h-full flex-col">
            <div className="flex w-full flex-col items-center justify-center px-4 pt-4 pb-3">
              <div className="flex items-center justify-center">
                <h2 className="mb-3 text-[1.35rem] font-semibold text-cyan-100">
                  Leaderboard
                </h2>
              </div>

              {/* Fixed podium container with proper constraints */}
              <div className="mx-auto w-full max-w-lg px-2">
                <div className="flex items-end justify-center">
                  {/* Second Place */}
                  {topData[1] && (
                    <div className="flex h-[128px] w-[112px] flex-col items-center justify-end rounded-tl-2xl border border-cyan-300/20 bg-cyan-300/15 py-3 shadow-md">
                      <div className="relative mb-2 h-12 w-12">
                        <img
                          src={`https://robohash.org/${encodeURIComponent(topData[1].name)}?set=set1`}
                          alt={topData[1].name}
                          className="h-full w-full rounded-full border-4 border-gray-200"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border bg-white px-2 py-[2px] text-xs font-bold text-black">
                          2.
                        </div>
                      </div>
                      <p className="w-full truncate px-2 text-center text-xs font-semibold text-white">
                        {topData[1].name.split(" ")[0]}
                      </p>
                      <p className="text-xs font-bold text-white">
                        {topData[1].score}
                      </p>
                    </div>
                  )}

                  {/* First Place */}
                  {topData[0] && (
                    <div className="flex h-[160px] w-[132px] flex-col items-center justify-end rounded-t-2xl border border-cyan-300/30 bg-cyan-300/20 py-3 shadow-lg">
                      <div className="relative mb-2 h-16 w-16">
                        <img
                          src={`https://robohash.org/${encodeURIComponent(topData[0].name)}?set=set1`}
                          alt={topData[0].name}
                          className="h-full w-full rounded-full border-4 border-yellow-400"
                        />
                        <img
                          src="/dekodeX/crown.png"
                          alt="Crown"
                          className="absolute -top-7 left-1/2 w-8 -translate-x-1/2 transform"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border border-black bg-yellow-400 px-2 py-[2px] text-xs font-bold text-black">
                          1.
                        </div>
                      </div>
                      <p className="w-full truncate px-2 text-center text-sm font-bold text-yellow-400">
                        {topData[0].name.split(" ")[0]}
                      </p>
                      <p className="text-sm font-extrabold text-yellow-400">
                        {topData[0].score}
                      </p>
                    </div>
                  )}

                  {/* Third Place */}
                  {topData[2] && (
                    <div className="flex h-[116px] w-[112px] flex-col items-center justify-end rounded-tr-2xl border border-cyan-300/20 bg-cyan-300/15 py-3 shadow-md">
                      <div className="relative mb-2 h-12 w-12">
                        <img
                          src={`https://robohash.org/${encodeURIComponent(topData[2].name)}?set=set1`}
                          alt={topData[2].name}
                          className="h-full w-full rounded-full border-4 border-[#B87333]"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border bg-orange-400 px-2 py-[2px] text-xs font-bold text-black">
                          3.
                        </div>
                      </div>
                      <p className="w-full truncate px-2 text-center text-xs font-semibold text-orange-400">
                        {topData[2].name.split(" ")[0]}
                      </p>
                      <p className="text-xs font-bold text-orange-400">
                        {topData[2].score}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <ul className="space-y-2.5 px-4 pb-2">
              {fetchedLeaderboardData.map((user, idx) => (
                <li
                  key={user.rank}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2.5 transition-colors duration-200 hover:border-cyan-300/30 hover:bg-white/[0.08]"
                >
                  <span className="w-7 text-right text-sm font-semibold text-cyan-200">
                    {user.rank}.
                  </span>
                  <img
                    src={`https://robohash.org/${encodeURIComponent(user.name)}?set=set1 `}
                    alt={user.name}
                    className="h-7 w-7 rounded-full border border-white/30 object-cover"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-white">
                    {user.name}
                  </span>
                  <span className="text-sm font-semibold text-cyan-200">
                    {user.score}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-3 mb-4 flex items-center justify-center gap-1 px-4">
              <div
                onClick={() => goToPage(currentPage - 1)}
                className={`relative cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white transition hover:bg-white/10 ${currentPage === 1 ? "pointer-events-none opacity-40" : ""}`}
              >
                &lt;
              </div>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;

                // Always show first page
                if (pageNumber === 1) {
                  return (
                    <div
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`relative cursor-pointer rounded-lg border border-white/10 px-3 py-1 text-sm transition hover:bg-white/10 ${currentPage === pageNumber ? "bg-cyan-300 text-[#01011b]" : "bg-white/[0.04] text-white"}`}
                    >
                      {pageNumber}
                    </div>
                  );
                }

                // Ellipsis after first page if needed
                if (pageNumber === 2 && currentPage > 3) {
                  return (
                    <span key="start-ellipsis" className="px-2 select-none">
                      ...
                    </span>
                  );
                }

                // Current page (not first or last)
                if (
                  pageNumber === currentPage &&
                  pageNumber !== 1 &&
                  pageNumber !== totalPages
                ) {
                  return (
                    <div
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className="relative cursor-pointer rounded-lg border border-cyan-300 bg-cyan-300 px-3 py-1 text-sm text-[#01011b] transition hover:bg-cyan-200"
                    >
                      {pageNumber}
                    </div>
                  );
                }

                // Next page (not last)
                if (
                  pageNumber === currentPage + 1 &&
                  pageNumber !== totalPages
                ) {
                  return (
                    <div
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className="relative cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white transition hover:bg-white/10"
                    >
                      {pageNumber}
                    </div>
                  );
                }

                // Ellipsis before last page if needed
                if (
                  pageNumber === totalPages - 1 &&
                  currentPage < totalPages - 2
                ) {
                  return (
                    <span key="end-ellipsis" className="px-2 select-none">
                      ...
                    </span>
                  );
                }

                // Always show last page
                if (pageNumber === totalPages) {
                  return (
                    <div
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`relative cursor-pointer rounded-lg border border-white/10 px-3 py-1 text-sm transition hover:bg-white/10 ${currentPage === pageNumber ? "bg-cyan-300 text-[#01011b]" : "bg-white/[0.04] text-white"}`}
                    >
                      {pageNumber}
                    </div>
                  );
                }

                return null;
              })}

              <div
                onClick={() => goToPage(currentPage + 1)}
                className={`relative cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white transition hover:bg-white/10 ${currentPage === totalPages ? "pointer-events-none opacity-40" : ""}`}
              >
                &gt;
              </div>
            </div>

            <div className="px-4 pt-2 pb-4">
              <UserStatsCard
                loggedIn={loggedIn}
                solvedQuestions={solvedQuestions}
                points={currentUserLeaderboardInfo?.score ?? 0}
                rank={currentUserLeaderboardInfo?.rank ?? null}
                totalUsers={totalUsers}
              />
              <UserCard
                loggedIn={loggedIn}
                username={
                  user?.username || currentUserLeaderboardInfo?.username
                }
              />
            </div>
          </div>
        ) : (
          <div className="flex min-h-[420px] flex-col items-center justify-center px-6">
            <h2 className="mb-4 text-center text-xl font-semibold text-cyan-100">
              The leaderboard will be updated soon
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
