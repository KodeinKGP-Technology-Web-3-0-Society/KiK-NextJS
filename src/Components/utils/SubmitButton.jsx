"use client";
import React, { useEffect, useState } from "react";
import Loader from "./loader";
import { toast, ToastContainer } from "react-toastify";

function SubmitButton({ email, answer, id }) {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (disabled) {
      const timer = setTimeout(() => {
        setDisabled(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [disabled]);

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Kindly login to submit your answer");
      return;
    }
    if (!answer) {
      toast.error("Please provide an answer before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/dekodeX/api/submit/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, answer }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        console.log("Error response:", data);
        toast.error(data.error || "Submission failed. Please try again.");
        return;
      }

      console.log("Success response:", data);
      if (data.isCorrect) {
        toast.success("Submission accepted!");
      } else {
        toast.error("Incorrect answer. Please try again.");
      }

      setDisabled(true);
    } catch (error) {
      toast.error("An error occurred while submitting your answer.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || disabled;

  return (
    <>
      <button
        disabled={isDisabled}
        onClick={handleSubmit}
        className={`h-[42px] rounded-[16px] px-4 font-medium text-[#01011B] transition-all duration-200 ease-in-out ${
          isDisabled
            ? "cursor-not-allowed bg-gray-400"
            : "cursor-pointer bg-gradient-to-b from-[#218ACB] via-[#0CC5DA] to-[#11E3FB] hover:scale-105 active:scale-95"
        } `}
        onMouseEnter={(e) => {
          if (!isDisabled) {
            e.currentTarget.style.backgroundPosition = "0 100%";
          }
        }}
        onMouseLeave={(e) => {
          if (!isDisabled) {
            e.currentTarget.style.backgroundPosition = "0 0";
          }
        }}
        style={{
          backgroundSize: "100% 200%",
          backgroundPosition: "0 0",
        }}
      >
        {loading ? <Loader isSubmit={true} /> : "Submit"}
      </button>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
}

export default SubmitButton;
