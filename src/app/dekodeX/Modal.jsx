import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function TechEventModal({
  title = "dekodeX",
  subtitle = "Apply for certificate",
  children,
  onClose,
}) {
  // Lock background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#1e2333] bg-[#11141d] p-6 shadow-2xl sm:p-7">
        {/* Content container */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-mono text-2xl font-semibold tracking-wide text-[#f8fafc]">
                {title}
              </h1>
              <p className="mt-1 font-mono text-xs text-[var(--accent)] uppercase">
                {subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer p-1 text-[#94a3b8] transition-colors hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          {/* Body */}
          <div className="space-y-4 font-mono text-sm text-[#f8fafc]">
            {children}
          </div>
          {/* Footer */}
          <div className="mt-8 flex justify-end"></div>
        </div>
      </div>
    </div>
  );
}
