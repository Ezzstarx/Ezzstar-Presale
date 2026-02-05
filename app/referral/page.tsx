import ReferralHero from "@/components/referral/ReferralHero";
import ReferralDashboard from "@/components/referral/ReferralDashboard";
import Footer from "@/components/layout/Footer";

export default function ReferralPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <main className="py-24 relative bg-[url('/assets/images/background.png')] bg-cover bg-center overflow-hidden text-white w-full">
                <div className="container mx-auto px-6 space-y-12">
                    <ReferralHero />
                    <ReferralDashboard />
                </div>
            </main>
            <Footer />
        </div>
    );
}
