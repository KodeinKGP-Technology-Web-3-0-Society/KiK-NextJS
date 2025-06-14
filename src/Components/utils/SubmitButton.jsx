"use client";
import React from "react";
import { useState } from "react";
import Loader from "./loader";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
function SubmitButton({ email, answer, id }) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!email) {
      toast.error("Kindly Login to submit your answer");
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
        body: JSON.stringify({
          email: email,
          answer: answer,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.log("Error response:", errorData);
        toast.error(errorData.error || "Submission failed. Please try again.");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        console.log("Success response:", data);
        if (data.isCorrect) {
          toast.success("Submission accepted!");
        } else {
          toast.error("Incorrect answer. Please try again.");
        }
      }
    } catch (error) {
      toast.error("An error occurred while submitting your answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
        {loading ? <Loader isSubmit={true} /> : " "}
        Submit
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
