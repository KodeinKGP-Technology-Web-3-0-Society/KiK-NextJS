// Root page — Server Component shell.
// Hero is now the TypeScript Scene 0 version with R3F NeuralMesh.
// Client islands carry their own "use client" directives.

import Hero             from "@/components/sections/home/Hero";
import InfiniteMarquee  from "@/components/sections/home/InfiniteMarquee";
import StatsBar         from "@/components/sections/home/StatsBar";
import ExpertiseSection from "@/components/sections/home/ExpertiseSection";
import PdsBanner        from "@/components/sections/home/PdsBanner";
import EventsPreview    from "@/components/sections/home/EventsPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InfiniteMarquee />
      <StatsBar />
      <div className="divider-gradient mx-auto max-w-5xl" />
      <ExpertiseSection />
      <div className="divider-gradient mx-auto max-w-5xl" />
      <PdsBanner />
      <div className="divider-gradient mx-auto max-w-5xl" />
      <EventsPreview />
    </>
  );
}
