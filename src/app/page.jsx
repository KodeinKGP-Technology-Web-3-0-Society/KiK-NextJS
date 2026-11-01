"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/Components/Landing/Hero";
import Marquee from "@/Components/Landing/Marquee";
import Stats from "@/Components/Landing/Stats";
import Expertise from "@/Components/Landing/Expertise";
import Programs from "@/Components/Landing/Programs";
import RecentEvents from "@/Components/Landing/RecentEvents";
import JoinCTA from "@/Components/Landing/JoinCTA";
import Loader from "@/Components/utils/loader";

const MainContent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[rgb(1,1,27)]">
      {/* Content always rendered */}
      <Hero />
      <Marquee />
      <Stats />
      <Expertise />
      <Programs />
      <RecentEvents />
      <JoinCTA />

      {/* Loader overlay */}
      <div
        className={`absolute top-0 left-0 flex h-full w-full items-center justify-center bg-[rgb(1,1,27)] transition-opacity duration-500 ease-in-out ${loading ? "z-50 opacity-100" : "pointer-events-none z-0 opacity-0"}`}
      >
        <Loader />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="App">
      <MainContent />
    </div>
  );
};

export default Home;
