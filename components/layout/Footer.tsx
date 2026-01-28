import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Send } from "lucide-react";

// Custom X (Twitter) Icon
const XIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

// Custom Discord Icon
const DiscordIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
    </svg>
);

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
        <footer className="relative bg-[radial-gradient(ellipse_at_top,_rgba(222,59,214,0.15)_0%,_#020205_50%,_#000000_100%)] pt-24 pb-6 border-t border-white/5 overflow-hidden">
            {/* Top Purple Glow Effect - Removed as background handles it now */}

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
                            <SocialButton href="#" icon={DiscordIcon} label="Discord" colorClass="hover:text-[#5865F2]" />
                            <SocialButton href="#" icon={Send} label="Telegram" colorClass="hover:text-[#0088cc]" />
                            <SocialButton href="#" icon={XIcon} label="X" colorClass="hover:text-white" />
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
