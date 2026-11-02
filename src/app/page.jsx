import Hero from "@/Components/Landing/Hero";
import Numbers from "@/Components/Landing/Numbers";
import Focus from "@/Components/Landing/Focus";
import PdsBanner from "@/Components/Landing/PdsBanner";
import Events from "@/Components/Landing/Events";
import Blog from "@/Components/Landing/Blog";
import PetCat from "@/Components/utils/PetCat";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#0b1430] font-sans text-[#ece9e1] antialiased">
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
