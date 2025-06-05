import Image from "next/image";
import React from "react";
import Link from "next/link";


export default function Home() {
  return (
    <>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* ...existing code... */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* ...existing code... */}
        </div>
        {/* Add this block for the Events page link */}
        <Link
          href="/events"
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
        >
          View Events
        </Link>
      </main>
      {/* ...existing code... */}
    </div>
    </>
  );
}
