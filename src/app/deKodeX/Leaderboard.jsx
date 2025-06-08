import React from 'react';
import leaderboard from "./leaderboard.json";

export default function Leaderboard() {
    return (
        <div 
            className="h-[146.8vh] flex min-h-screen flex-col before:absolute before:inset-0 before:rounded-[4px] before:border-[3px] before:border-transparent before:[border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] before:[border-image-slice:1] before:content-[''] before:pointer-events-none shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)]"
        >
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
                <div className="flex justify-center items-end p-4 rounded-xl">
                    {/* Second Place */}
                    <div className="flex flex-col items-center bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] rounded-tl-xl w-[100px] h-[160px] justify-end py-4 shadow-md">
                        <div className="relative w-16 h-16 mb-2">
                            <img
                                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${leaderboard[1].name}`}
                                alt={leaderboard[1].name}
                                className="rounded-full w-full h-full border-4 border-gray-200"
                            />
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-[2px] rounded-full border">2.</div>
                        </div>
                        <p className="text-white text-sm font-semibold">{leaderboard[1].name.split(' ')[0]}</p>
                        <p className="text-white text-sm font-bold">{leaderboard[1].score}</p>
                    </div>

                    {/* First Place */}
                    <div className="flex flex-col items-center bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] rounded-tl-xl rounded-tr-xl w-[120px] h-[200px] justify-end py-4 shadow-lg">
                        <div className="relative w-20 h-20 mb-2">
                            <img
                                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${leaderboard[0].name}`}
                                alt={leaderboard[0].name}
                                className="rounded-full w-full h-full border-4 border-yellow-400"
                            />
                            <img
                                src="/dekodex/crown.png"
                                alt="Crown"
                                className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-10"
                            />
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-2 py-[2px] rounded-full border border-black">1.</div>
                            </div>
                        <p className="text-yellow-400 font-bold">{leaderboard[0].name.split(' ')[0]}</p>
                        <p className="text-yellow-400 font-extrabold">{leaderboard[0].score}</p>
                    </div>

                    {/* Third Place */}
                    <div className="flex flex-col items-center bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] rounded-tr-xl w-[100px] h-[140px] justify-end py-4 shadow-md">
                        <div className="relative w-16 h-16 mb-2">
                            <img
                                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${leaderboard[1].name}`}
                                alt={leaderboard[1].name}
                                className="rounded-full w-full h-full border-4 border-[#B87333]"
                            />
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-400 text-black text-xs font-bold px-2 py-[2px] rounded-full border">3.</div>
                        </div>
                        <p className="text-orange-400 text-sm font-semibold">{leaderboard[2].name.split(' ')[0]}</p>
                        <p className="text-orange-400 text-sm font-bold">{leaderboard[2].score}</p>
                    </div>
                </div>

            </div>
            <ul className="space-y-1">
                {leaderboard.slice(3,15).map((user) => (
                <li key={user.rank} className="flex items-center space-x-4 px-4 ml-5 bg-gradient-to-r from-[rgba(17,227,251,0.3)] to-[rgba(255,255,255,0.06)] hover:bg-[#0CC5DA] hover:bg-clip-border hover:text-#01011B group transition-colors duration-300">
                    <span className="text-lg w-6 text-right font-bold group-hover:text-black">{user.rank}.</span>
                    <img
                        src={`https://robohash.org/${encodeURIComponent(user.name)}?set=set4`}
                        alt={user.name}
                        className="w-8 h-8 my-1 rounded-full object-cover border-2 border-white "
                    />
                    <span className="flex-1 bg-gradient-to-b from-[#24E8FF] to-[#0CC5DA] bg-clip-text text-transparent font-bold group-hover:text-black">{user.name}</span>
                    <span className="bg-gradient-to-b from-[#24E8FF] to-[#0CC5DA] bg-clip-text text-transparent font-bold group-hover:text-black">{user.score}</span>
                </li>
                ))}
            </ul>
            <div class="flex justify-center items-center space-x-2 mt-4">
                <button class="px-3 py-1 before:absolute before:inset-0  before:border-[3px] before:border-transparent before:[border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] before:[border-image-slice:1] before:content-[''] before:pointer-events-none shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] hover:bg-gray-300">&lt;</button>

                <button class="px-3 py-1 before:absolute before:inset-0 before:border-[3px] before:border-transparent before:[border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] before:[border-image-slice:1] before:content-[''] before:pointer-events-none shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] text-white">1</button>
                <button class="px-3 py-1 before:absolute before:inset-0 before:border-[3px] before:border-transparent before:[border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] before:[border-image-slice:1] before:content-[''] before:pointer-events-none shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] hover:bg-gray-300">2</button>
                <button class="px-3 py-1 before:absolute before:inset-0 before:border-[3px] before:border-transparent before:[border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] before:[border-image-slice:1] before:content-[''] before:pointer-events-none shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] hover:bg-gray-300">3</button>

                <span class="px-2">...</span>

                <button class="px-3 py-1 before:absolute before:inset-0 before:border-[3px] before:border-transparent before:[border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] before:[border-image-slice:1] before:content-[''] before:pointer-events-none shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] hover:bg-gray-300">10</button>

                <button class="px-3 py-1 before:absolute before:inset-0 before:border-[3px] before:border-transparent before:[border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] before:[border-image-slice:1] before:content-[''] before:pointer-events-none shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] hover:bg-gray-300">&gt;</button>
            </div>
        </div>
    );
}