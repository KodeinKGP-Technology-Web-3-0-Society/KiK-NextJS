"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import leaderboard from "./leaderboard.json";

export default function Leaderboard() {
    const router = useRouter();

    useEffect(() => {
        router.push('/leaderboard/1');
    }, [router]);

    return null;
}