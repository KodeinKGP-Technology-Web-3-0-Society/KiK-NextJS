"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Leaderboard() {
  const router = useRouter();

  useEffect(() => {
    router.push("/leaderboard/1");
  }, [router]);

  return null;
}
