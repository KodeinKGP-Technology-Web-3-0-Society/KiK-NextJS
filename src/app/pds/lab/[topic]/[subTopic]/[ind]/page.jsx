"use client";

import dynamic from "next/dynamic";

const LabQuestion = dynamic(() => import("../../../../lab/LabQuestion"), {
  ssr: false,
});

export default function Page() {
  return <LabQuestion />;
}
