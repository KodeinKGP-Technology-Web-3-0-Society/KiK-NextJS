"use client";

import React, { useRef, useState } from "react";
import { X, Lock, Mail } from "lucide-react";

const LoginModal = ({ isVisible, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const parentRef = useRef();

  const handleLogin = () => {
    onLogin(email, password);
  };

  const handleOutClick = (e) => {
    if (e.target === parentRef.current) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={parentRef}
      onClick={handleOutClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b1430]/80 p-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md rounded-xl border border-[#243158] bg-[#0f1a3a] p-7 text-[#ece9e1] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg border border-[#243158] bg-[#0b1430] text-[#9aa3b8] transition-colors hover:border-[#3a4a7a] hover:text-[#ece9e1]"
          aria-label="Close dialog"
        >
          <X size={16} />
        </button>

        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
          Progress Synchronization
        </p>
        <h2 className="mt-1 text-2xl font-bold text-[#ece9e1]">Sign in to Sync</h2>
        <p className="mt-2 text-xs text-[#9aa3b8]">
          Keep your completed problems and bookmarked questions synced across all your devices.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label htmlFor="email" className="block font-mono text-xs text-[#9aa3b8]">
              Email Address
            </label>
            <div className="relative mt-1">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rollnumber@kgpian.iitkgp.ac.in"
                className="w-full rounded-md border border-[#243158] bg-[#0b1430] px-3.5 py-2.5 text-sm text-[#ece9e1] placeholder-[#5a6380] transition-colors focus:border-[var(--accent)] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block font-mono text-xs text-[#9aa3b8]">
              Password / Pin
            </label>
            <div className="relative mt-1">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                className="w-full rounded-md border border-[#243158] bg-[#0b1430] px-3.5 py-2.5 text-sm text-[#ece9e1] placeholder-[#5a6380] transition-colors focus:border-[var(--accent)] focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[var(--accent)] py-2.5 text-sm font-semibold text-[#0b1430] transition-transform hover:-translate-y-0.5"
          >
            Authenticate & Sync
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
