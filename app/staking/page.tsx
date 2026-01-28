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
                        {/* Staking Section - Side by Side */}
                        <div className="flex flex-col xl:flex-row justify-center items-stretch gap-8 relative z-10 max-w-[1000px] mx-auto">
                            <div className="w-full max-w-[460px] flex flex-col">
                                <SpicaStakingCard />
                            </div>
                            <div className="w-full max-w-[460px] flex flex-col">
                                <StakingCalculator />
                            </div>
                        </div>
                    </div>
                </div>


                <StakingHistorySection />
            </main >

            <Footer />
        </div >
    );
}
