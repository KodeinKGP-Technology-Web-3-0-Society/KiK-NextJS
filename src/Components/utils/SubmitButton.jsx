"use client";
import React from "react";
import { useState } from "react";
import Loader from "./loader";
function SubmitButton({ email, answer, QuestionID }) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!email) {
      alert("Kindly Login to submit your answer");
      return;
    }
    if (!answer) {
      alert("Please provide an answer before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/submit/${QuestionID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          answer: answer,
        }),
      });

      if (!res.ok) {
        alert(data.error || "Submission failed.");
        return;
      }
      if (res.ok) {
        alert("Submission successful!");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("An error occurred while submitting your answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="h-[42px] rounded-[16px] px-4 text-[#01011B] transition-all duration-200 ease-in-out hover:cursor-pointer"
      style={{
        background:
          "linear-gradient(180deg, #218ACB 0%, #0CC5DA 50%, #11E3FB 100%)",
        backgroundSize: "100% 200%",
        backgroundPosition: "0 0",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundPosition = "0 100%";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundPosition = "0 0";
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.95)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onClick={handleSubmit}
    >
      {loading ? <Loader /> : " "}
      Submit
    </button>
  );
}
export default SubmitButton;
