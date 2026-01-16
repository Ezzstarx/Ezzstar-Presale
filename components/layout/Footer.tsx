import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Linkedin, MessageCircle, Send } from "lucide-react";

// Helper Component for Expanding Social Button
const SocialButton = ({ href, icon: Icon, label, colorClass }: { href: string, icon: any, label: string, colorClass: string }) => {
    return (
        <a
            href={href}
            className={`group relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-out hover:pr-4 hover:pl-2 bg-transparent hover:bg-white/10 ${colorClass}`}
        >
            <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-tektur font-medium text-sm ml-0 group-hover:ml-2">
                {label}
            </span>
        </a>
    );
};

export default function Footer() {
    return (
        <footer className="relative bg-[#050505] pt-24 pb-6 border-t border-white/5 overflow-hidden">
            {/* Top Purple Glow Effect - Adjusted for subtle ambiance */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-[#C243FE] opacity-5 blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 mb-12">

                    {/* Left Column: Logo & Socials - Takes 4 Columns */}
                    <div className="col-span-1 md:col-span-4 flex flex-col items-center md:items-start gap-8 md:pl-6">
                        <Link href="/">
                            {/* Increased Logo Size */}
                            <div className="relative w-72 h-36 hover:opacity-90 transition-opacity">
                                <Image
                                    src="/assets/images/Footer-Logo.png"
                                    alt="Ezzstar Logo"
                                    fill
                                    className="object-contain object-center md:object-left"
                                />
                            </div>
                        </Link>

                        {/* Expanding Social Icons */}
                        <div className="flex items-center gap-2 text-gray-400">
                            <SocialButton href="#" icon={MessageCircle} label="Discord" colorClass="hover:text-[#5865F2]" />
                            <SocialButton href="#" icon={Send} label="Telegram" colorClass="hover:text-[#0088cc]" />
                            <SocialButton href="#" icon={Twitter} label="X" colorClass="hover:text-white" />
                            <SocialButton href="#" icon={Instagram} label="Instagram" colorClass="hover:text-[#E1306C]" />
                            <SocialButton href="#" icon={Linkedin} label="LinkedIn" colorClass="hover:text-[#0077b5]" />
                        </div>
                    </div>

                    {/* Gap Column - Increased to 3 Columns for larger middle gap */}
                    <div className="hidden md:block col-span-1 md:col-span-3"></div>

                    {/* Right Columns: Links - Reduced to 5 Columns (pushed right) and reduced internal gap */}
                    <div className="col-span-1 md:col-span-5 grid grid-cols-3 gap-2 md:gap-4 text-center md:text-left">
                        {/* Company */}
                        <div className="flex flex-col gap-5">
                            <h3 className="font-tektur text-lg font-bold text-white mb-1">Company</h3>
                            <Link href="#about" className="text-gray-400 hover:text-[#C243FE] hover:translate-x-1 transition-all font-satoshi text-sm md:text-base">About Us</Link>
                            <Link href="#" className="text-gray-400 hover:text-[#C243FE] hover:translate-x-1 transition-all font-satoshi text-sm md:text-base">Whitepaper</Link>
                            <Link href="#tokenomics" className="text-gray-400 hover:text-[#C243FE] hover:translate-x-1 transition-all font-satoshi text-sm md:text-base">Tokenomics</Link>
                            <Link href="#roadmap" className="text-gray-400 hover:text-[#C243FE] hover:translate-x-1 transition-all font-satoshi text-sm md:text-base">Roadmap</Link>
                        </div>

                        {/* Support */}
                        <div className="flex flex-col gap-5">
                            <h3 className="font-tektur text-lg font-bold text-white mb-1">Support</h3>
                            <Link href="#" className="text-gray-400 hover:text-[#C243FE] hover:translate-x-1 transition-all font-satoshi text-sm md:text-base">Discord</Link>
                            <Link href="#" className="text-gray-400 hover:text-[#C243FE] hover:translate-x-1 transition-all font-satoshi text-sm md:text-base">Telegram</Link>
                        </div>

                        {/* Service */}
                        <div className="flex flex-col gap-5">
                            <h3 className="font-tektur text-lg font-bold text-white mb-1">Service</h3>
                            <Link href="#referral" className="text-gray-400 hover:text-[#C243FE] hover:translate-x-1 transition-all font-satoshi text-sm md:text-base">Referral</Link>
                            <Link href="/staking" className="text-gray-400 hover:text-[#C243FE] hover:translate-x-1 transition-all font-satoshi text-sm md:text-base">Staking</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 pt-5 flex flex-col items-center gap-2 text-center">
                    <p className="text-gray-500 font-satoshi text-xs md:text-sm max-w-4xl mx-auto leading-relaxed opacity-70">
                        <span className="font-bold text-gray-50">Disclaimer:</span> Cryptocurrency might not be regulated in your area. Its value can fluctuate, and profits could be taxed according to your local laws.
                    </p>
                    <p className="text-gray-500 font-satoshi text-sm">
                        <span className="text-[#FF00FF] font-medium">© 2025 Ezzstar All Rights reserved.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
