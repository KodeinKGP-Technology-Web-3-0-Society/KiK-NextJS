"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function LeaderboardSkeleton() {
  return (
    <div className="p-3">
      <div className="mb-4 flex items-center justify-center">
        <h2
          className="mr-2 text-[1.5rem] font-bold"
          style={{
            background:
              "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Final
        </h2>
        <h2
          className="text-[1.5rem] font-bold"
          style={{
            background:
              "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Leaderboard
        </h2>
      </div>

      <div className="mx-auto mb-6 flex max-w-md items-end justify-center gap-2 px-4">
        <div className="h-[140px] w-[100px] animate-pulse rounded-tl-xl bg-white/10 sm:w-[125px]" />
        <div className="h-[180px] w-[120px] animate-pulse rounded-t-xl bg-white/15 sm:w-[150px]" />
        <div className="h-[120px] w-[100px] animate-pulse rounded-tr-xl bg-white/10 sm:w-[125px]" />
      </div>

      <div className="space-y-1 pr-5 pl-2">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className="ml-2 flex items-center gap-4 bg-gradient-to-r from-[rgba(17,227,251,0.2)] to-[rgba(255,255,255,0.04)] px-4 py-2"
          >
            <div className="h-6 w-6 animate-pulse rounded bg-white/20" />
            <div className="h-8 w-8 animate-pulse rounded-full bg-white/20" />
            <div className="h-6 flex-1 animate-pulse rounded bg-white/20" />
            <div className="h-6 w-14 animate-pulse rounded bg-white/20" />
          </div>
        ))}
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
    if (pageNumber === currentPage || pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="relative flex h-[146.8vh] min-h-screen flex-col overflow-hidden rounded-[1rem] border-2 border-[rgb(91,230,255)] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] backdrop-blur-[100px]">
        {isLoading ? (
          <LeaderboardSkeleton />
        ) : fetchedLeaderboardData && totalUsers >= 10 ? (
          <div className="">
            <div className="flex w-full flex-col items-center justify-center p-3">
              <div className="flex items-center justify-center">
                <h2
                  className="mr-2 mb-4 text-[1.5rem] font-bold"
                  style={{
                    background:
                      "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Final
                </h2>
                <h2
                  className="mb-4 text-[1.5rem] font-bold"
                  style={{
                    background:
                      "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Leaderboard
                </h2>
              </div>

              {/* Fixed podium container with proper constraints */}
              <div className="mx-auto w-full max-w-md px-4">
                <div className="flex items-end justify-center">
                  {/* Second Place */}
                  {topData[1] && (
                    <div className="flex h-[160px] w-[100px] flex-col items-center justify-end rounded-tl-xl bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] py-4 shadow-md sm:w-[125px]">
                      <div className="relative mb-2 h-12 w-12 sm:h-16 sm:w-16">
                        <img
                          src={`https://robohash.org/${encodeURIComponent(topData[1].name)}?set=set1`}
                          alt={topData[1].name}
                          className="h-full w-full rounded-full border-4 border-gray-200"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border bg-white px-2 py-[2px] text-xs font-bold text-black">
                          2.
                        </div>
                      </div>
                      <p className="w-full truncate px-1 text-center text-xs font-semibold text-white sm:text-sm">
                        {topData[1].name.split(" ")[0]}
                      </p>
                      <p className="text-xs font-bold text-white sm:text-sm">
                        {topData[1].score}
                      </p>
                    </div>
                  )}

                  {/* First Place */}
                  {topData[0] && (
                    <div className="flex h-[200px] w-[120px] flex-col items-center justify-end rounded-tl-xl rounded-tr-xl bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] py-4 shadow-lg sm:w-[150px]">
                      <div className="relative mb-2 h-16 w-16 sm:h-20 sm:w-20">
                        <img
                          src={`https://robohash.org/${encodeURIComponent(topData[0].name)}?set=set1`}
                          alt={topData[0].name}
                          className="h-full w-full rounded-full border-4 border-yellow-400"
                        />
                        <img
                          src="/dekodeX/crown.png"
                          alt="Crown"
                          className="absolute -top-7 left-1/2 w-8 -translate-x-1/2 transform sm:w-10"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border border-black bg-yellow-400 px-2 py-[2px] text-xs font-bold text-black">
                          1.
                        </div>
                      </div>
                      <p className="w-full truncate px-1 text-center font-bold text-yellow-400">
                        {topData[0].name.split(" ")[0]}
                      </p>
                      <p className="font-extrabold text-yellow-400">
                        {topData[0].score}
                      </p>
                    </div>
                  )}

                  {/* Third Place */}
                  {topData[2] && (
                    <div className="flex h-[140px] w-[100px] flex-col items-center justify-end rounded-tr-xl bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] py-4 shadow-md sm:w-[125px]">
                      <div className="relative mb-2 h-12 w-12 sm:h-16 sm:w-16">
                        <img
                          src={`https://robohash.org/${encodeURIComponent(topData[2].name)}?set=set1`}
                          alt={topData[2].name}
                          className="h-full w-full rounded-full border-4 border-[#B87333]"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border bg-orange-400 px-2 py-[2px] text-xs font-bold text-black">
                          3.
                        </div>
                      </div>
                      <p className="w-full truncate px-1 text-center text-xs font-semibold text-orange-400 sm:text-sm">
                        {topData[2].name.split(" ")[0]}
                      </p>
                      <p className="text-xs font-bold text-orange-400 sm:text-sm">
                        {topData[2].score}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <ul className="space-y-1 pr-5 pl-2">
              {fetchedLeaderboardData.map((user, idx) => (
                <li
                  key={user.rank}
                  className="hover:text-#01011B group ml-2 flex items-center space-x-4 bg-gradient-to-r from-[rgba(17,227,251,0.3)] to-[rgba(255,255,255,0.06)] px-4 transition-colors duration-300 hover:bg-[#0CC5DA] hover:bg-clip-border"
                >
                  <span className="w-6 text-right text-lg font-bold group-hover:text-black">
                    {user.rank}.
                  </span>
                  <img
                    src={`https://robohash.org/${encodeURIComponent(user.name)}?set=set1 `}
                    alt={user.name}
                    className="my-1 h-8 w-8 rounded-full border-2 border-white object-cover"
                  />
                  <span className="flex-1 bg-gradient-to-b from-[#24E8FF] to-[#0CC5DA] bg-clip-text font-bold text-transparent group-hover:text-black">
                    {user.name}
                  </span>
                  <span className="bg-gradient-to-b from-[#24E8FF] to-[#0CC5DA] bg-clip-text font-bold text-transparent group-hover:text-black">
                    {user.score}
                  </span>
                </li>
              ))}
            </ul>

            {/*displays the loggedin user */}
            {loggedIn && currentUserLeaderboardInfo && (
              <div
                key={currentUserLeaderboardInfo.rank}
                className="mt-4 mr-5 ml-4 flex items-center space-x-4 bg-[#11E3FB] px-4 text-black shadow-lg transition-transform duration-200 hover:scale-[1.01]"
              >
                <span className="w-6 text-right text-lg font-bold group-hover:text-black">
                  {currentUserLeaderboardInfo.rank}.
                </span>
                <img
                  src={`https://robohash.org/${encodeURIComponent(currentUserLeaderboardInfo.username)}?set=set1 `}
                  alt={currentUserLeaderboardInfo.username}
                  className="my-1 h-8 w-8 rounded-full border-2 border-white object-cover"
                />
                <span className="flex-1 bg-gradient-to-b from-[#24E8FF] to-[#0CC5DA] bg-clip-text font-bold text-black group-hover:text-transparent">
                  {currentUserLeaderboardInfo.username}
                </span>
                <span className="bg-gradient-to-b from-[#24E8FF] to-[#0CC5DA] bg-clip-text font-bold text-black group-hover:text-transparent">
                  {currentUserLeaderboardInfo.score}
                </span>
              </div>
            )}

            <div className="mt-8 mb-4 flex items-center justify-center gap-1">
              <div
                onClick={() => goToPage(currentPage - 1)}
                className={`relative border-[3px] border-transparent bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] px-3 py-1 shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] [border-image-slice:1] [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] hover:bg-gray-300 ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
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
                      className={`relative cursor-pointer border-[3px] border-transparent bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] px-3 py-1 shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] [border-image-slice:1] [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] hover:bg-gray-300 ${currentPage === pageNumber ? "bg-gray-300" : ""}`}
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
                      className={`relative cursor-pointer border-[3px] border-transparent bg-gray-300 bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] px-3 py-1 shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] [border-image-slice:1] [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] hover:bg-gray-300`}
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
                      className={`relative cursor-pointer border-[3px] border-transparent bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] px-3 py-1 shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] [border-image-slice:1] [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] hover:bg-gray-300`}
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
                      className={`relative cursor-pointer border-[3px] border-transparent bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] px-3 py-1 shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] [border-image-slice:1] [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] hover:bg-gray-300 ${currentPage === pageNumber ? "bg-gray-300" : ""}`}
                    >
                      {pageNumber}
                    </div>
                  );
                }

                return null;
              })}

              <div
                onClick={() => goToPage(currentPage + 1)}
                className={`relative border-[3px] border-transparent bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] px-3 py-1 shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] [border-image-slice:1] [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] hover:bg-gray-300 ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
              >
                &gt;
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-screen flex-col items-center justify-center px-3">
            <h2 className="mb-4 text-center text-xl font-bold">
              The leaderboard will be updated soon
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
