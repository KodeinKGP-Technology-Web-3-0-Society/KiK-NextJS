"use client";

import React from "react";
import Lottie from "lottie-react";
import animationData from "../../data/articles/new-anima.json";

const LottieWrapper = () => {
  return (
    <Lottie
      animationData={animationData}
      rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default LottieWrapper;
