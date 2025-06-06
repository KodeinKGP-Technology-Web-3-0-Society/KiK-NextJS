"use client";

import React, { useRef, useState } from "react";

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
      className="fixed top-0 left-0 z-[100] flex h-full w-full items-center justify-center bg-black/60"
    >
      <div className="relative w-[90%] max-w-[400px] rounded-lg bg-[#212121] p-5 text-white shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-white hover:text-red-400"
        >
          &times;
        </button>
        <h2 className="pb-4 text-2xl font-semibold">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border-none bg-[#333] p-2 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="mb-1 block text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border-none bg-[#333] p-2 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
