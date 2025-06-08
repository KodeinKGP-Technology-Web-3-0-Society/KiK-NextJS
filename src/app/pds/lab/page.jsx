"use client";

import React, { useEffect, useState } from "react";
import dataJ from "../../../data/qna/lab-questions.json";
import SubTopics from "./SubTopics";
import LoginModal from "./LoginModal";

export default function Lab() {
  const BACKEND_URL = "https://kik-backend.onrender.com/";
  const [openTopics, setOpenTopics] = useState([]);
  const [viewMode, setViewMode] = useState("All Questions");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(localStorage.getItem("user"));
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      if (!localStorage.getItem("favourites")) {
        localStorage.setItem("favourites", JSON.stringify([]));
      }
    } else {
      const uid = localStorage.getItem("user");
      fetch(BACKEND_URL + "status", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${uid}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          resp
            .json()
            .then((data) =>
              localStorage.setItem(
                "favourites",
                JSON.stringify(data.favourites)
              )
            );
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      if (!localStorage.getItem("completed")) {
        localStorage.setItem("completed", JSON.stringify([]));
      }
    } else {
      const uid = localStorage.getItem("user");
      fetch(BACKEND_URL + "status", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${uid}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          resp
            .json()
            .then((data) =>
              localStorage.setItem("completed", JSON.stringify(data.completed))
            );
        }
      });
    }
  }, []);

  const toggleTopic = (topic) => {
    setOpenTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setIsDropdownOpen(false);
  };

  const openLoginBox = () => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    } else {
      setIsLoginOpen(true);
    }
  };

  const loginUser = (email, pswd) => {
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    const complete = JSON.parse(localStorage.getItem("completed") || "[]");

    fetch(BACKEND_URL + "makeUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pswd, favourites, complete }),
    }).then((data) => {
      if (data.ok) {
        setIsLoginOpen(false);
        data.json().then((txt) => {
          localStorage.setItem("user", txt.user);
          localStorage.setItem("completed", JSON.stringify(txt.completed));
          localStorage.setItem("favourites", JSON.stringify(txt.favourites));
        });
      }
    });
  };

  return (
    <div className="flex w-full flex-col items-center bg-[#01011b] px-4 pb-4">
      <div className="!mt-5 !mb-5 text-center text-3xl font-bold text-cyan-300">
        LAB PROBLEMS
      </div>

      <div className="justify-left !mb-4 flex w-full max-w-6xl flex-col px-7 sm:flex-row sm:items-center sm:px-0">
        <div className="relative mt-2 w-full sm:mt-0 sm:w-[200px]">
          <div
            className="flex cursor-pointer justify-between rounded-t border-b border-cyan-300 bg-gray-900 px-4 py-2 font-semibold text-white"
            onClick={toggleDropdown}
          >
            {viewMode}
            <span>{isDropdownOpen ? "▲" : "▼"}</span>
          </div>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 z-10 w-full rounded-b bg-[#193963]">
              {[
                "All Questions",
                "Favourite Questions",
                "Incomplete Questions",
              ].map((mode) => (
                <div
                  key={mode}
                  onClick={() => handleViewModeChange(mode)}
                  className="cursor-pointer bg-[#252531] px-4 py-2 text-white hover:bg-[#19396380] hover:font-bold"
                >
                  {mode}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full max-w-6xl flex-col items-center">
        {Object.keys(dataJ).map((topic, index) => (
          <div
            key={index}
            className="mb-3 w-full overflow-hidden rounded-lg bg-[#01011b]"
          >
            <div
              className="flex cursor-pointer items-center justify-between border-b border-cyan-300 bg-[#43434390] px-5 py-4 text-xl font-semibold text-white"
              onClick={() => toggleTopic(topic)}
            >
              {topic
                .replace(/([a-z])([A-Z0-9])|([A-Z])([0-9])/g, "$1$3 $2$4")
                .replace(/\bAnd\b/g, "and")}
              <span className="text-xl">
                {openTopics.includes(topic) ? "-" : "+"}
              </span>
            </div>
            {openTopics.includes(topic) && (
              <div className="rounded-b-lg bg-[#1c1a22] px-3 py-4">
                <SubTopics topic={topic} viewMode={viewMode} />
              </div>
            )}
          </div>
        ))}
      </div>

      <LoginModal
        isVisible={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={loginUser}
      />
    </div>
  );
}
