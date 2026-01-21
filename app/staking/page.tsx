import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StakingHero from "@/components/staking/StakingHero";
import SpicaStakingCard from "@/components/staking/SpicaStakingCard";
import StakingCalculator from "@/components/staking/StakingCalculator";
import StakingHistorySection from "@/components/staking/StakingHistorySection";

export default function StakingPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#FF00FF] selection:text-white">
            <Navbar />

            <main className="pb-24">
                <div className="bg-[url('/assets/images/background.png')] bg-cover bg-center pb-8 border-b border-white/5">
                    <StakingHero />

                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
                            <SpicaStakingCard />
                            <StakingCalculator />
                        </div>
                    </div>
                </div>

                <StakingHistorySection />
            </main>

            <Footer />
        </div>
    );
}
