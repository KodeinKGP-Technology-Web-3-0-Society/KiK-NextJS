"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Leaderboard() {
  const { loggedIn, user } = useAuth();
  const currentPage = 1;

  const [totalPages, setTotalPages] = useState(0); // will be set according to total entries in the database
  const [fetchedLeaderboardData, setFetchedLeaderboardData] = useState([]);
  const [currentUserLeaderboardInfo, setCurrentUserLeaderboardInfo] =
    useState(null);
  const [topData, setTopData] = useState([]);

  const itemsPerPage = 10;

  useEffect(() => {
    async function getTopScorerData() {
      try {
        const res = await fetch(
          `../../dekodeX/api/leaderboard/1?email=${encodeURIComponent(user?.email)}`
        );
        const data = await res.json();

        console.log(data);

        if (data.status == 500) {
          toast.error("Internal Server Error. Please try again later.");
          return;
        } else {
          setTopData(data.paginatedLeaderboard);
          setCurrentUserLeaderboardInfo(data.currentUser);
          if (data.currentUser) {
            toast.success(
              `Welcome back, ${data.currentUser.username}! Your current score is ${data.currentUser.score}.`
            );
          } else {
            toast.info("You are not on the leaderboard yet.");
          }
          return;
        }
      } catch {
        toast.error("Error occured while fetching leaderboard.");
        return;
      }
    }

    async function getLeaderboardData() {
      try {
        const res = await fetch(`../../dekodeX/api/leaderboard/${currentPage}`);
        const data = await res.json();

        if (data.status === 500) {
          toast.error("Internal Server Error. Please try again later.");
          return;
        } else {
          setFetchedLeaderboardData(data.paginatedLeaderboard);
          setTotalPages(
            Math.ceil((data.paginatedLeaderboard.length - 3) / itemsPerPage)
          );

          // console.log(user.email)
          // setCurrentUserLeaderboardInfo(
          //   loggedIn
          //     ? data.paginatedLeaderboard.find(
          //         (entry) => entry.email === user.email
          //       ) || null
          //     : null
          // );
          getTopScorerData();
          return;
        }
      } catch (error) {
        toast.error(`Error fetching leaderboard data: ${error.message}`);
        console.error("Error fetching leaderboard data:", error);
      }
    }
    getLeaderboardData();
  }, [currentPage, user]);

  return (
    <>
      <div className="flex h-[146.8vh] min-h-screen flex-col rounded-[1rem] border-2 border-[rgb(91,230,255)] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] backdrop-blur-[100px]">
        {fetchedLeaderboardData && fetchedLeaderboardData.length > 10 ? (
          <div className="">
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
              <div className="flex items-end justify-center rounded-xl p-4">
                {/* Second Place */}
                {topData[1] && (
                  <div className="flex h-[160px] w-[100px] flex-col items-center justify-end rounded-tl-xl bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] py-4 shadow-md">
                    <div className="relative mb-2 h-16 w-16">
                      <img
                        src={`https://api.dicebear.com/7.x/bottts/svg?seed=${topData[1].name}`}
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

                {/* First Place */}
                {topData[0] && (
                  <div className="flex h-[200px] w-[120px] flex-col items-center justify-end rounded-tl-xl rounded-tr-xl bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] py-4 shadow-lg">
                    <div className="relative mb-2 h-20 w-20">
                      <img
                        src={`https://api.dicebear.com/7.x/bottts/svg?seed=${topData[0].name}`}
                        alt={topData[0].name}
                        className="h-full w-full rounded-full border-4 border-yellow-400"
                      />
                      <img
                        src="/dekodeX/crown.png"
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

                {/* Third Place */}
                {topData[2] && (
                  <div className="flex h-[140px] w-[100px] flex-col items-center justify-end rounded-tr-xl bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] py-4 shadow-md">
                    <div className="relative mb-2 h-16 w-16">
                      <img
                        src={`https://api.dicebear.com/7.x/bottts/svg?seed=${topData[1].name}`}
                        alt={topData[1].name}
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

            <ul className="space-y-1">
              {fetchedLeaderboardData.map((user, idx) =>
                idx < 3 ? null : (
                  <li
                    key={user.rank}
                    className="hover:text-#01011B group ml-2 flex items-center space-x-4 bg-gradient-to-r from-[rgba(17,227,251,0.3)] to-[rgba(255,255,255,0.06)] px-4 transition-colors duration-300 hover:bg-[#0CC5DA] hover:bg-clip-border"
                  >
                    <span className="w-6 text-right text-lg font-bold group-hover:text-black">
                      {user.rank}.
                    </span>
                    <img
                      src={`https://robohash.org/${encodeURIComponent(user.name)}?set=set4`}
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
                )
              )}
            </ul>

            {/*displays the loggedin user */}
            {loggedIn && currentUserLeaderboardInfo && (
              <div
                key={currentUserLeaderboardInfo.rank}
                className="mt-4 ml-2 flex items-center space-x-4 bg-[#11E3FB] px-4 text-black shadow-lg transition-transform duration-200 hover:scale-[1.01]"
              >
                <span className="w-6 text-right text-lg font-bold group-hover:text-black">
                  {currentUserLeaderboardInfo.rank}.
                </span>
                <img
                  src={`https://robohash.org/${encodeURIComponent(currentUserLeaderboardInfo.name)}?set=set4`}
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
