"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function LeaderboardPageSkeleton() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center p-3">
        <h2
          className="mb-4 text-[2rem] font-bold"
          style={{
            background:
              "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Leaderboard
        </h2>
        <div className="mb-8 flex items-end gap-2">
          <div className="h-[160px] w-[130px] animate-pulse rounded-tl-xl bg-white/10" />
          <div className="h-[200px] w-[140px] animate-pulse rounded-t-xl bg-white/15" />
          <div className="h-[140px] w-[120px] animate-pulse rounded-tr-xl bg-white/10" />
        </div>
      </div>

      <div className="space-y-1 pr-5 pl-1">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className="ml-5 flex items-center gap-4 bg-gradient-to-r from-[rgba(17,227,251,0.2)] to-[rgba(255,255,255,0.04)] px-4 py-2"
          >
            <div className="h-6 w-6 animate-pulse rounded bg-white/20" />
            <div className="h-8 w-8 animate-pulse rounded-full bg-white/20" />
            <div className="h-6 flex-1 animate-pulse rounded bg-white/20" />
            <div className="h-6 w-16 animate-pulse rounded bg-white/20" />
          </div>
        ))}
      </div>
    </>
  );
}

export default function LeaderboardPage() {
  const { loggedIn, user } = useAuth();
  const params = useParams();
  const currentPage = parseInt(params?.page, 10) || 1;

  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [fetchedLeaderboardData, setFetchedLeaderboardData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [currentUserLeaderboardInfo, setCurrentUserLeaderboardInfo] =
    useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 10;

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
          } else if (loggedIn) {
            toast.info("You are not on the leaderboard yet.");
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
  }, [currentPage, user?.email, loggedIn]);

  // for redirecting to dekodeX page
  const redirectToDekodeX = () => {
    window.location.href = "/dekodeX";
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[4px] before:border-[3px] before:border-transparent before:content-[''] before:[border-image-slice:1] before:[border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)]">
      {isLoading ? (
        <LeaderboardPageSkeleton />
      ) : fetchedLeaderboardData && totalUsers >= 10 ? (
        <>
          <div className="flex w-full flex-col items-center justify-center p-3">
            <h2
              className="mb-4 text-[2rem] font-bold"
              style={{
                background:
                  "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Leaderboard
            </h2>

            <div className="mb-8 flex items-end">
              {topData[1] && (
                <div className="flex h-[160px] w-[130px] flex-col items-center justify-end rounded-tl-xl bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] py-4 shadow-md">
                  <div className="relative mb-2 h-16 w-16">
                    <img
                      src={`https://robohash.org/${encodeURIComponent(topData[1].name)}?set=set1`}
                      alt={topData[1].name}
                      className="h-full w-full rounded-full border-4 border-gray-200"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border bg-white px-2 py-[2px] text-xs font-bold text-black">
                      2.
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {topData[1].name.split(" ")[0]}
                  </p>
                  <p className="text-sm font-bold text-white">
                    {topData[1].score}
                  </p>
                </div>
              )}

              {topData[0] && (
                <div className="flex h-[200px] w-[140px] flex-col items-center justify-end rounded-tl-xl rounded-tr-xl bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] py-4 shadow-lg">
                  <div className="relative mb-2 h-20 w-20">
                    <img
                      src={`https://robohash.org/${encodeURIComponent(topData[0].name)}?set=set1`}
                      alt={topData[0].name}
                      className="h-full w-full rounded-full border-4 border-yellow-400"
                    />
                    <img
                      src="/dekodex/crown.png"
                      alt="Crown"
                      className="absolute -top-7 left-1/2 w-10 -translate-x-1/2 transform"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border border-black bg-yellow-400 px-2 py-[2px] text-xs font-bold text-black">
                      1.
                    </div>
                  </div>
                  <p className="font-bold text-yellow-400">
                    {topData[0].name.split(" ")[0]}
                  </p>
                  <p className="font-extrabold text-yellow-400">
                    {topData[0].score}
                  </p>
                </div>
              )}

              {topData[2] && (
                <div className="flex h-[140px] w-[120px] flex-col items-center justify-end rounded-tr-xl bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] py-4 shadow-md">
                  <div className="relative mb-2 h-16 w-16">
                    <img
                      src={`https://robohash.org/${encodeURIComponent(topData[2].name)}?set=set1`}
                      alt={topData[2].name}
                      className="h-full w-full rounded-full border-4 border-[#B87333]"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border bg-orange-400 px-2 py-[2px] text-xs font-bold text-black">
                      3.
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-orange-400">
                    {topData[2].name.split(" ")[0]}
                  </p>
                  <p className="text-sm font-bold text-orange-400">
                    {topData[2].score}
                  </p>
                </div>
              )}
            </div>
          </div>

          <ul className="space-y-1 pr-5 pl-1">
            {fetchedLeaderboardData.map((leaderboardEntry, idx) => (
              <li
                key={idx}
                className="ml-5 flex items-center space-x-4 bg-gradient-to-r from-[rgba(17,227,251,0.3)] to-[rgba(255,255,255,0.06)] px-4 transition-transform duration-200 hover:scale-[1.01]"
              >
                <span className="w-6 text-right text-lg font-bold">
                  {leaderboardEntry.rank}.
                </span>
                <img
                  src={`https://robohash.org/${encodeURIComponent(leaderboardEntry.name)}?set=set1 `}
                  alt={leaderboardEntry.name}
                  className="my-1 h-8 w-8 rounded-full border-2 border-white object-cover"
                />
                <span className="flex-1 bg-gradient-to-b from-[#24E8FF] to-[#0CC5DA] bg-clip-text font-bold text-transparent">
                  {leaderboardEntry.name}
                </span>
                <span className="bg-gradient-to-b from-[#24E8FF] to-[#0CC5DA] bg-clip-text font-bold text-transparent">
                  {leaderboardEntry.score}
                </span>
              </li>
            ))}

            {loggedIn && currentUserLeaderboardInfo && (
              <li className="mt-4 ml-5 flex items-center space-x-4 bg-[#11E3FB] px-4 text-black shadow-lg transition-transform duration-200 hover:scale-[1.01]">
                <span className="w-6 text-right text-lg font-bold">
                  {currentUserLeaderboardInfo.rank}.
                </span>
                <img
                  src={`https://robohash.org/${encodeURIComponent(currentUserLeaderboardInfo.username)}?set=set1 `}
                  alt={currentUserLeaderboardInfo.username}
                  className="my-1 h-8 w-8 rounded-full border-2 border-white object-cover"
                />
                <span className="flex-1 font-bold">
                  {currentUserLeaderboardInfo.username}
                </span>
                <span className="pr-4 font-bold">
                  {currentUserLeaderboardInfo.score}
                </span>
              </li>
            )}
            {!loggedIn && (
              <li className="mt-4 ml-5 flex items-center space-x-4 px-4 text-white">
                Please log in to see your rank.
              </li>
            )}
          </ul>

          <div className="mt-8 mb-4 flex items-center justify-center gap-2">
            <Link
              href={`/leaderboard/${currentPage - 1}`}
              className={`relative border-[3px] border-transparent bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] px-3 py-1 shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] [border-image-slice:1] [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] hover:bg-gray-300 ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
            >
              &lt;
            </Link>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;

              // Always show first page
              if (pageNumber === 1) {
                return (
                  <Link
                    key={pageNumber}
                    href={`/leaderboard/${pageNumber}`}
                    className={`relative border-[3px] border-transparent bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] px-3 py-1 shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] [border-image-slice:1] [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] hover:bg-gray-300 ${currentPage === pageNumber ? "bg-gray-300" : ""}`}
                  >
                    {pageNumber}
                  </Link>
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
                  <Link
                    key={pageNumber}
                    href={`/leaderboard/${pageNumber}`}
                    className={`relative border-[3px] border-transparent bg-gray-300 bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] px-3 py-1 shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] [border-image-slice:1] [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] hover:bg-gray-300`}
                  >
                    {pageNumber}
                  </Link>
                );
              }

              // Next page (not last)
              if (pageNumber === currentPage + 1 && pageNumber !== totalPages) {
                return (
                  <Link
                    key={pageNumber}
                    href={`/leaderboard/${pageNumber}`}
                    className={`relative border-[3px] border-transparent bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] px-3 py-1 shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] [border-image-slice:1] [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] hover:bg-gray-300`}
                  >
                    {pageNumber}
                  </Link>
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
                  <Link
                    key={pageNumber}
                    href={`/leaderboard/${pageNumber}`}
                    className={`relative border-[3px] border-transparent bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] px-3 py-1 shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] [border-image-slice:1] [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] hover:bg-gray-300 ${currentPage === pageNumber ? "bg-gray-300" : ""}`}
                  >
                    {pageNumber}
                  </Link>
                );
              }

              return null;
            })}

            <Link
              href={`/leaderboard/${currentPage + 1}`}
              className={`relative border-[3px] border-transparent bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] px-3 py-1 shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] [border-image-slice:1] [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] hover:bg-gray-300 ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
            >
              &gt;
            </Link>
          </div>

          <button
            id="floatingReturnBtn"
            onClick={redirectToDekodeX}
            className="animate-float fixed right-2 bottom-4 z-[9999] flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-4 py-2 text-white shadow-2xl backdrop-blur-xl transition-transform hover:-translate-y-1 hover:scale-110 max-md:right-0 max-md:bottom-207 max-md:scale-70 md:right-8 md:bottom-8"
            aria-label="Return"
          >
            <span className="font-semibold">Return</span>
          </button>
        </>
      ) : (
        <div className="flex h-screen flex-col items-center justify-center">
          <h2 className="mb-4 text-2xl font-bold">
            Leaderboard will be updating soon
          </h2>
        </div>
      )}
    </div>
  );
}
