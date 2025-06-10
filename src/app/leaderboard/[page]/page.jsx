'use client'
import Link from 'next/link';
import { useAuth } from '@/contexts/authContext';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function LeaderboardPage({ params }) {
    const { loggedIn, user } = useAuth();
    const currentPage = parseInt(params.page) || 1;

    const [totalPages, setTotalPages] = useState(0);
    const [fetchedLeaderboardData, setFetchedLeaderboardData] = useState([]);
    const [topData, setTopData] = useState([]);
    const [currentUserLeaderboardInfo, setCurrentUserLeaderboardInfo] = useState(null);

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;

    useEffect(() => {

        async function getTopScorerData(){
            try{
                const res = await fetch(`../../dekodeX/api/leaderboard/1`);
                const data = await res.json();

                if(data.status == 500){
                    toast.error("Internal Server Error. Please try again later.");
                    return;
                }else{
                    setTopData(data.paginatedLeaderboard);
                    return;
                }
            } catch {
                toast.error("Error occured while fetching leaderboard.")
                return
            }
        }

        async function getLeaderboardData() {
            try {
                const res = await fetch(`../../dekodeX/api/leaderboard/${currentPage}`);
                const data = await res.json();

                if(data.status === 500){
                    toast.error("Internal Server Error. Please try again later.");
                    return;
                }else{
                    setFetchedLeaderboardData(data.paginatedLeaderboard);
                    setTotalPages(Math.ceil((data.paginatedLeaderboard.length-3) / itemsPerPage));
                    setCurrentUserLeaderboardInfo(
                        loggedIn
                            ? data.paginatedLeaderboard.find(entry => entry.email === user.email) || null
                            : null
                    );
                    console.log("Asfasldkfjlkj")
                    getTopScorerData()
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
        <div className="flex min-h-screen flex-col before:absolute before:inset-0 before:rounded-[4px] before:border-[3px] before:border-transparent before:[border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] before:[border-image-slice:1] before:content-[''] before:pointer-events-none shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)]">

            {
                (fetchedLeaderboardData && fetchedLeaderboardData.length >= 10) ? 
                <>
                    <div className="flex w-full flex-col items-center justify-center p-3">
                        <h2 className="text-[2rem] font-bold mb-4"
                            style={{
                                background:
                                    "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Leaderboard</h2>

                        <div className="flex items-end gap-2 mb-8">

                            {topData[1] && (
                                <div className="flex flex-col items-center bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] rounded-tl-xl w-[100px] h-[160px] justify-end py-4 shadow-md">
                                    <div className="relative w-16 h-16 mb-2">
                                        <img
                                            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(topData[1].name)}`}
                                            alt={topData[1].name}
                                            className="rounded-full w-full h-full border-4 border-gray-200"
                                        />
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-[2px] rounded-full border">2.</div>
                                    </div>
                                    <p className="text-white text-sm font-semibold">{topData[1].name.split(' ')[0]}</p>
                                    <p className="text-white text-sm font-bold">{topData[1].score}</p>
                                </div>
                            )}

                            {topData[0] && (
                                <div className="flex flex-col items-center bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] rounded-tl-xl rounded-tr-xl w-[120px] h-[200px] justify-end py-4 shadow-lg">
                                    <div className="relative w-20 h-20 mb-2">
                                        <img
                                            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(topData[0].name)}`}
                                            alt={topData[0].name}
                                            className="rounded-full w-full h-full border-4 border-yellow-400"
                                        />
                                        <img
                                            src="/dekodex/crown.png"
                                            alt="Crown"
                                            className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-10"
                                        />
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-2 py-[2px] rounded-full border border-black">1.</div>
                                    </div>
                                    <p className="text-yellow-400 font-bold">{topData[0].name.split(' ')[0]}</p>
                                    <p className="text-yellow-400 font-extrabold">{topData[0].score}</p>
                                </div>
                            )}

                            {topData[2] && (
                                <div className="flex flex-col items-center bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] rounded-tr-xl w-[100px] h-[140px] justify-end py-4 shadow-md">
                                    <div className="relative w-16 h-16 mb-2">
                                        <img
                                            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(topData[2].name)}`}
                                            alt={topData[2].name}
                                            className="rounded-full w-full h-full border-4 border-[#B87333]"
                                        />
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-400 text-black text-xs font-bold px-2 py-[2px] rounded-full border">3.</div>
                                    </div>
                                    <p className="text-orange-400 text-sm font-semibold">{topData[2].name.split(' ')[0]}</p>
                                    <p className="text-orange-400 text-sm font-bold">{topData[2].score}</p>
                                </div>
                            )}

                        </div>

                    </div>

                    <ul className="space-y-1">
                        {fetchedLeaderboardData.map((leaderboardEntry, idx) => (
                            <li key={idx} className="flex items-center space-x-4 px-4 ml-5 bg-gradient-to-r from-[rgba(17,227,251,0.3)] to-[rgba(255,255,255,0.06)] transition-transform duration-200 hover:scale-[1.01]">
                                <span className="text-lg w-6 text-right font-bold">{leaderboardEntry.rank}.</span>
                                <img
                                    src={`https://robohash.org/${encodeURIComponent(leaderboardEntry.name)}?set=set4`}
                                    alt={leaderboardEntry.name}
                                    className="w-8 h-8 my-1 rounded-full object-cover border-2 border-white"
                                />
                                <span className="flex-1 bg-gradient-to-b from-[#24E8FF] to-[#0CC5DA] bg-clip-text text-transparent font-bold">{leaderboardEntry.name}</span>
                                <span className="bg-gradient-to-b from-[#24E8FF] to-[#0CC5DA] bg-clip-text text-transparent font-bold">{leaderboardEntry.score}</span>
                            </li>
                        ))}

                        {loggedIn && currentUserLeaderboardInfo && (
                            <li className="flex items-center space-x-4 px-4 ml-5 mt-4 bg-[#11E3FB] text-black shadow-lg transition-transform duration-200 hover:scale-[1.01]">
                                <span className="text-lg w-6 text-right font-bold">{currentUserLeaderboardInfo.rank}.</span>
                                <img
                                    src={`https://robohash.org/${encodeURIComponent(currentUserLeaderboardInfo.name)}?set=set4`}
                                    alt={currentUserLeaderboardInfo.name}
                                    className="w-8 h-8 my-1 rounded-full object-cover border-2 border-white"
                                />
                                <span className="flex-1 font-bold">{currentUserLeaderboardInfo.name}</span>
                                <span className="font-bold pr-4">{currentUserLeaderboardInfo.score}</span>
                            </li>
                        )}
                        {!loggedIn && (
                            <li className="flex items-center space-x-4 px-4 ml-5 mt-4 text-white">
                                Please log in to see your rank.
                            </li>
                        )}
                    </ul>

                    <div className="flex justify-center items-center gap-2 mt-8 mb-4">
                        <Link
                            href={`/leaderboard/${currentPage - 1}`}
                            className={`relative px-3 py-1 border-[3px] border-transparent [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] [border-image-slice:1] shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] hover:bg-gray-300 ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            &lt;
                        </Link>

                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            if (
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                            ) {
                                return (
                                    <Link
                                        key={pageNumber}
                                        href={`/leaderboard/${pageNumber}`}
                                        className={`relative px-3 py-1 border-[3px] border-transparent [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] [border-image-slice:1] shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] hover:bg-gray-300 ${
                                            currentPage === pageNumber ? 'bg-gray-300' : ''
                                        }`}
                                    >
                                        {pageNumber}
                                    </Link>
                                );
                            } else if (
                                pageNumber === currentPage - 2 ||
                                pageNumber === currentPage + 2
                            ) {
                                return <span key={pageNumber} className="px-2">...</span>;
                            }
                            return null;
                        })}

                        <Link
                            href={`/leaderboard/${currentPage + 1}`}
                            className={`relative px-3 py-1 border-[3px] border-transparent [border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] [border-image-slice:1] shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] hover:bg-gray-300 ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            &gt;
                        </Link>
                    </div>
                </> :
                <div className="flex flex-col items-center justify-center h-screen">
                    <h2 className="text-2xl font-bold mb-4">Leaderboard will be updating soon</h2>
                </div>
            }
        </div>
    );
}