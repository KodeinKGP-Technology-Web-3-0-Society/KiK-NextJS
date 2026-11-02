import Hero from "@/Components/Landing/Hero";
import Numbers from "@/Components/Landing/Numbers";
import Focus from "@/Components/Landing/Focus";
import PdsBanner from "@/Components/Landing/PdsBanner";
import Events from "@/Components/Landing/Events";
import Blog from "@/Components/Landing/Blog";
import PetCat from "@/Components/utils/PetCat";

// Blog section reads Medium; refresh the page at most once an hour.
export const revalidate = 3600;

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#08090d] font-sans text-[#f8fafc] antialiased">
      <Hero />
      <Numbers />
      <Focus />
      <PdsBanner />
      <Events />
      <Blog />
      <PetCat />
    </main>
  );
}
