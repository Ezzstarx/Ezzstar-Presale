import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

import Roadmap from "@/components/sections/Roadmap";
import Tokenomics from "@/components/sections/Tokenomics";
import UpcomingProjects from "@/components/sections/UpcomingProjects";
import Referral from "@/components/sections/Referral";
import Team from "@/components/sections/Team";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <About />

      <Roadmap />
      <Tokenomics />
      <UpcomingProjects />
      <Team />
      <Referral />
      <FAQ />
      <Footer />
    </div>
  );
}
