
import Referral from "@/components/sections/Referral";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ReferralPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="pt-24">
                <Referral />
            </div>
            <Footer />
        </div>
    );
}
