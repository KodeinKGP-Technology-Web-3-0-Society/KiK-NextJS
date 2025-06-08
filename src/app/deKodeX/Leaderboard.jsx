import React from "react";

export default function Leaderboard() {
  return (
    <div className="flex min-h-screen flex-col rounded-[2rem] border-4 border-[rgb(91,230,255)] bg-[rgb(1,1,27)]">
      <div className="flex w-full flex-col items-center justify-center p-3">
        <h2 className="mb-4 text-[1.5rem] font-bold text-[rgb(91,230,255)]">
          Leaderboard
        </h2>
        <div className="top3 flex w-full items-center justify-center pt-3">
          <div className="flex items-center">
            <div className="bg-[rgb(91,230,255)] p-4">
              <h3 className="text-xl font-bold">2nd Place</h3>
              <p>Username2</p>
            </div>
            <div className="bg-[rgb(91,230,255)] p-4">
              <h3 className="text-xl font-bold">1st Place</h3>
              <p>Username1</p>
            </div>
            <div className="bg-[rgb(91,230,255)] p-4">
              <h3 className="text-xl font-bold">3rd Place</h3>
              <p>Username3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// https://api.dicebear.com/7.x/micah/svg?seed={username}
