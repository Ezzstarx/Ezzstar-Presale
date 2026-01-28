"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function UniqueFeatures() {
    return (
        <section id="unique-features" className="py-24 relative overflow-hidden bg-[#09090F]">
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                {/* New Section: Unique Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-7xl px-6 md:px-4 flex flex-col items-center"
                >
                    <div className="w-full max-w-[1440px] h-[119px] mx-auto bg-transparent relative flex items-center justify-center mb-12 md:mb-16">
                        <h2 className="text-[55px] font-tektur font-medium tracking-[-1px] text-center mb-0 text-white text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                            What makes Spica unique ?
                        </h2>
                        {/* Top Gradient Line */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DE3BD6] to-transparent"></div>
                        {/* Bottom White Line */}
                        <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white opacity-50"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Card 1: What Is SPICA? */}
                        <div className="relative bg-[#0a0a0c]/80 border border-white/5 rounded-none p-8 md:p-12 overflow-hidden">
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src="/assets/images/Unique.png"
                                    alt="Background"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                {/* Icon Container (Purple) */}
                                <div className="w-[84px] h-[88px] flex items-center justify-center mb-6 relative">
                                    <Image src="/assets/images/Unique-1.png" alt="Unique Icon" fill className="object-contain" />
                                </div>

                                <h3 className="text-[20px] font-tektur font-semibold mb-4 text-[#DE3BD6]">
                                    What Is SPICA?
                                </h3>

                                <p className="text-white/90 font-tektur font-medium mb-8 text-lg">
                                    SPICA is a utility coin, not a meme or speculative token
                                </p>

                                <ul className="space-y-4 text-left w-full">
                                    {[
                                        "Used across social website, social media platform, game, NFT system, and metaverse",
                                        "Spent to unlock gear, battle passes, upgrades, and boosts",
                                        "Enables creators and artists to monetize content and IP",
                                        "Used to tip creators, join VIP threads, and purchase digital goods",
                                        "Customizes your 3D NFT character with skins, emotes, gear",
                                        "Powers access to metaverse zones, land, and wearables",
                                        "Used to unlock tools, premium visibility, and event access"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C243FE] shrink-0 shadow-[0_0_8px_#C243FE]"></span>
                                            <span className="text-white/70 font-tektur text-[15px] leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Card 2: Why Invest? */}
                        <div className="relative bg-[#0a0a0c]/80 border border-white/5 rounded-none p-8 md:p-12 overflow-hidden">
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src="/assets/images/Unique.png"
                                    alt="Background"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                {/* Icon Container (Yellow/Orange) */}
                                <div className="w-24 h-24 flex items-center justify-center mb-6 relative overflow-hidden">
                                    <Image src="/assets/images/Unique-2.png" alt="Unique Icon" fill className="object-cover" />
                                </div>

                                <h3 className="text-[20px] font-tektur font-semibold mb-4 text-[#DE3BD6]">
                                    Why You Should Invest In SPICA
                                </h3>

                                <p className="text-white/90 font-tektur font-medium mb-8 text-base px-2">
                                    SPICA is the core currency powering the entire Ezzstar ecosystem – from social to gameplay and metaverse experiences.
                                </p>

                                <ul className="space-y-4 text-left w-full">
                                    {[
                                        "One Token for the Entire Ecosystem",
                                        "Stay Alien (We don't need your punctured face & data in short KYC)",
                                        "Exclusive NFT Signature Benefits for Early Supporters",
                                        "Creator Economy With Instant Monetization",
                                        "Upgrade & Own Your 3D NFT Character Identity",
                                        "Earn SPICA Through Competitive Gameplay",
                                        "Social App Rewards Based on Digital Reputation",
                                        "Trade, Stake, Refer & Shop with SPICA",
                                        "Metaverse Utility - Planet Xebion",
                                        "No Vesting for Presale Investors"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FFD700] shrink-0 shadow-[0_0_8px_#FFD700]"></span>
                                            <span className="text-white/70 font-tektur text-[15px] leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
                {/* End Unique Features */}
            </div >
        </section >
    );
}
