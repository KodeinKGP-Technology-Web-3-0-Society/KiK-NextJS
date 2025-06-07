import React from 'react';
import leaderboard from "./leaderboard.json"; 

export default function Leaderboard() {
    return (
        <div 
            className="h-[146.8vh] flex overflow-y-scroll hide-scrollbar min-h-screen flex-col border-2 rounded-[1rem] border-[rgb(91,230,255)] bg-gray-800 backdrop-blur-[100px]"
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
                <div className="flex w-full justify-center pt-3 bg-[rgb(128,25,27)]">
                        <div className="bg-[rgb(91,230,255)] w-[30%] h-[80%] p-4 mt-4">
                            <img
                                src={`https://robohash.org/${encodeURIComponent(leaderboard[1].name)}?set=set4`}
                                alt={leaderboard[1].name}
                                className="w-24 h-24 rounded-full"
                            />
                            <p>{leaderboard[1].name}</p>
                            <p>{leaderboard[1].score}</p>
                        </div>
                        <div className="bg-[rgb(91,230,255)] w-[30%] h-[90%] p-4 mt-4">
                            <div className="rounded-full border-6"><img
                                src={`https://robohash.org/${encodeURIComponent(leaderboard[0].name)}?set=set4`}
                                alt={leaderboard[0].name}
                                className="w-24 h-24 rounded-full"
                            /></div>
                            <p>{leaderboard[0].name}</p>
                            <p>{leaderboard[0].score}</p>
                        </div>
                        <div className="bg-[rgb(91,230,255)] w-[30%] h-[70%] p-4 mt-4">
                            <img
                                src={`https://robohash.org/${encodeURIComponent(leaderboard[0].name)}?set=set4`}
                                alt={leaderboard[2].name}
                                className="w-24 h-24 rounded-full"
                            />
                            <p>{leaderboard[2].name}</p>
                            <p>{leaderboard[2].score}</p>
                        </div>
                </div>
            </div>
            <ul className="space-y-1">
                {leaderboard.slice(3).map((user) => (
                <li key={user.rank} className="flex items-center space-x-4 px-4 ml-2 bg-[rgb(91,230,255)] ">
                    <span className="text-lg font-medium w-6 text-right">{user.rank}.</span>
                    <img
                        src={`https://robohash.org/${encodeURIComponent(user.name)}?set=set4`}
                        alt={user.name}
                        className="w-8 h-8 my-1 rounded-full object-cover border-2 border-white "
                    />
                    <span className="flex-1 text-white">{user.name}</span>
                    <span className="text-gray-300 font-mono">{user.score}</span>
                </li>
                ))}
            </ul>
        </div>
    );
}