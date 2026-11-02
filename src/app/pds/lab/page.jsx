"use client";

import React, { useEffect, useState } from "react";
import dataJ from "../../../data/qna/lab-questions.json";
import SubTopics from "./SubTopics";
import LoginModal from "./LoginModal";
import { readList, writeList } from "./storage";
import Link from "next/link";
import { ChevronDown, ChevronUp, Filter, User, LogOut, ArrowLeft, FolderGit2 } from "lucide-react";

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
            .then((data) => writeList("favourites", data.favourites))
            .catch(() => {});
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
            .then((data) => writeList("completed", data.completed))
            .catch(() => {});
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

  const handleAuthButtonClick = () => {
    if (user) {
      localStorage.removeItem("user");
      setUser(null);
    } else {
      setIsLoginOpen(true);
    }
  };

  const loginUser = (email, pswd) => {
    const favourites = readList("favourites");
    const complete = readList("completed");

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
          writeList("completed", txt.completed);
          writeList("favourites", txt.favourites);
          setUser(txt.user);
        });
      }
    });
  };

  const topicCount = Object.keys(dataJ).length;

  return (
    <div className="min-h-screen bg-[#0b1430] font-sans text-[#ece9e1] antialiased">
      <div className="mx-auto max-w-6xl px-5 pt-10 pb-20 md:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            href="/pds"
            className="group inline-flex items-center gap-2 font-mono text-xs text-[#9aa3b8] transition-colors hover:text-[var(--accent)]"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to PDS Overview</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              PDS Bank · Lab Problem Archive
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#ece9e1] md:text-5xl">
              Lab Problems
            </h1>
            <p className="mt-3 max-w-xl text-base text-[#9aa3b8]">
              Browse 260+ curated questions organized by weekly syllabus topics. Open any question to
              view the full problem statement, solution source code, and online compiler links.
            </p>
          </div>

          {/* User Auth Sync Status */}
          <div>
            <button
              onClick={handleAuthButtonClick}
              className="inline-flex items-center gap-2 rounded-lg border border-[#243158] bg-[#0f1a3a] px-4 py-2.5 text-xs font-mono font-medium text-[#ece9e1] transition-colors hover:border-[var(--accent)]"
            >
              {user ? (
                <>
                  <LogOut size={14} className="text-[#e5484d]" />
                  <span>Logout Sync</span>
                </>
              ) : (
                <>
                  <User size={14} className="text-[var(--accent)]" />
                  <span>Sync Progress</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Toolbar & Filter Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#243158] bg-[#0f1a3a] p-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#9aa3b8]">
            <FolderGit2 size={15} className="text-[var(--accent)]" />
            <span>{topicCount} Chapters Available</span>
          </div>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="inline-flex items-center justify-between gap-3 rounded-lg border border-[#3a4a7a] bg-[#0b1430] px-4 py-2 text-xs font-medium text-[#ece9e1] transition-colors hover:border-[var(--accent)]"
            >
              <div className="flex items-center gap-2">
                <Filter size={13} className="text-[var(--accent)]" />
                <span>{viewMode}</span>
              </div>
              {isDropdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-lg border border-[#243158] bg-[#0f1a3a] shadow-xl">
                {[
                  "All Questions",
                  "Favourite Questions",
                  "Incomplete Questions",
                ].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleViewModeChange(mode)}
                    className={`block w-full px-4 py-2.5 text-left text-xs transition-colors hover:bg-[#142145] hover:text-[var(--accent)] ${
                      viewMode === mode ? "bg-[#142145] font-semibold text-[var(--accent)]" : "text-[#9aa3b8]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Topic Accordions */}
        <div className="space-y-4">
          {Object.keys(dataJ).map((topic, index) => {
            const isOpen = openTopics.includes(topic);
            const formattedTopic = topic
              .replace(/([a-z])([A-Z0-9])|([A-Z])([0-9])/g, "$1$3 $2$4")
              .replace(/\bAnd\b/g, "and");

            const subtopicCount = dataJ[topic]?.[0]?.Subtopics
              ? Object.keys(dataJ[topic][0].Subtopics).length
              : 0;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-[#243158] bg-[#0f1a3a] transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-[#142145]/70"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--accent)]">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-base font-semibold text-[#ece9e1] md:text-lg">
                      {formattedTopic}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden font-mono text-xs text-[#9aa3b8] sm:inline">
                      {subtopicCount} subtopics
                    </span>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-md border border-[#243158] bg-[#0b1430] text-xs transition-transform ${
                        isOpen ? "rotate-180 text-[var(--accent)]" : "text-[#9aa3b8]"
                      }`}
                    >
                      <ChevronDown size={14} />
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-[#243158] bg-[#0b1430]/60 p-4 md:p-6">
                    <SubTopics topic={topic} viewMode={viewMode} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <LoginModal
        isVisible={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={loginUser}
      />
    </div>
  );
}
