"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function About() {
    const [textIndex, setTextIndex] = useState(0);
    const texts = ["EZZSTAR", "SPICA", "Us"];

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % texts.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.defaultMuted = true;
            videoRef.current.play().catch(error => console.error("Video playback failed:", error));
        }
    }, []);

    return (
        <section id="about" className="pt-0 pb-24 relative overflow-hidden bg-black">
            {/* Background Blurs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-pink/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">

                {/* Promo Text & Socials */}
                <div className="flex flex-col items-center gap-8 mb-40 w-full">
                    <p className="text-sm md:text-base font-satoshi text-gray-300 text-center tracking-wide">
                        Don't miss out! Invest in <span className="text-[#FF00FF] font-bold">$SPCA</span> during our ongoing presale and receive an <span className="text-[#FFD700] font-bold">Exclusive NFT Signature</span> directly in your wallet.
                    </p>

                    <div className="flex items-center gap-8 md:gap-12 opacity-80">
                        <a href="#" className="hover:text-white hover:scale-110 transition-all text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                        <a href="#" className="hover:text-white hover:scale-110 transition-all text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        <a href="#" className="hover:text-white hover:scale-110 transition-all text-gray-400 flex items-center gap-1">
                            <span className="w-6 h-6 md:w-8 md:h-8 bg-current rounded-full flex items-center justify-between overflow-hidden p-[2px]">
                                <svg viewBox="0 0 24 24" fill="black" className="w-full h-full"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" /></svg>
                            </span>
                            <span className="font-serif font-bold text-lg hidden md:block">Medium</span>
                        </a>
                        <a href="#" className="hover:text-white hover:scale-110 transition-all text-gray-400 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.42-2.157 2.42z" /></svg>
                            <span className="font-bold text-lg hidden md:block tracking-wide">Discord</span>
                        </a>
                        <a href="#" className="hover:text-white hover:scale-110 transition-all text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                        </a>
                        <a href="#" className="hover:text-white hover:scale-110 transition-all text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                    </div>
                </div>

                {/* Animated Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-tektur font-semibold mb-6 flex items-center justify-center gap-2">
                        <span className="w-[120px] md:w-[200px] text-right">About</span>
                        <div className="relative h-[1.2em] w-[200px] flex items-center justify-start overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={texts[textIndex]}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className={`absolute font-bold text-left ${texts[textIndex] === "EZZSTAR" ? "bg-gradient-to-r from-accent-cyan to-[#ff00ff] text-transparent bg-clip-text" :
                                        texts[textIndex] === "SPICA" ? "text-[#ff00ff]" :
                                            texts[textIndex] === "Us" ? "text-accent-cyan" : "text-white"
                                        }`}
                                >
                                    {texts[textIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </h2>
                </div>

                {/* Stylized Black Box Content with Exact Dimensions */}
                <div className="relative flex flex-col items-center bg-[#050507] border border-white/5 rounded-2xl overflow-hidden shadow-2xl w-full max-w-[707px] md:w-[707px] md:h-[809px] h-auto">

                    {/* Top Section: Text Content */}
                    <div className="w-full flex flex-col items-center justify-center px-6 md:px-12 pt-8 md:pt-12 pb-8 md:pb-4 h-auto md:h-[417px]">
                        {/* Logo */}
                        <div className="mb-6">
                            <img
                                src="/assets/images/About-Logo.jpeg"
                                alt="About Ezzstar Logo"
                                className="w-32 md:w-48 h-auto object-contain brightness-110 contrast-125"
                            />
                        </div>

                        {/* Text Content - Professional & Compact */}
                        <div className="space-y-4 text-center w-full max-w-[600px]">
                            <p className="text-sm md:text-[15px] text-white/90 font-satoshi leading-relaxed font-light">
                                Welcome to <span className="font-semibold text-white">Ezzstar</span>, a fully interconnected Web3 ecosystem empowering creators,
                                gamers, and anonymous users. We&apos;re not just building platforms. We&apos;re
                                constructing an economy where <span className="font-medium text-white">time, identity, and creativity are currency.</span>
                            </p>

                            <p className="text-base md:text-[17px] font-tektur font-semibold text-accent-cyan tracking-wide">
                                From digital aliens to elite-ranked players,
                            </p>

                            <p className="text-sm md:text-[15px] text-white/80 font-satoshi leading-relaxed">
                                Ezzstar enables you to own your identity across a decentralized social hub, a play-
                                to-earn game, and metaverse.
                                <br />
                                All powered by a single currency: <span className="text-[#ff00ff] font-bold tracking-wider">SPICA</span>
                            </p>

                            <p className="text-sm md:text-[16px] font-satoshi font-bold text-red-600 tracking-tight brightness-110 leading-tight pt-2">
                                This is a world where reputation matters, identity is earned, and your presence
                                shapes the future.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Section: Video Content */}
                    <div className="w-full relative bg-black/50 h-[300px] md:h-[390px] md:mt-[5px]">
                        {/* Placeholder Image for Layout Verification */}
                        <img
                            src="/assets/images/placeholder_video_bg.png"
                            alt="About Section Visual"
                            className="w-full h-full object-cover opacity-90"
                        />
                        {/* Gradient Overlay for smooth integration */}
                        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#050507] to-transparent"></div>
                    </div>
                </div>

                {/* New Section: Unique Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-7xl mt-24 md:mt-32 px-6 md:px-4 flex flex-col items-center"
                >
                    <h2 className="text-3xl md:text-5xl font-tektur font-semibold text-center mb-12 md:mb-16 text-white text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 w-full">
                        What makes Spica unique ?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Card 1: What Is SPICA? */}
                        <div className="bg-[#0a0a0c]/80 border border-white/5 rounded-none p-8 md:p-12 hover:border-[#C243FE]/30 transition-all duration-300 group">
                            <div className="flex flex-col items-center text-center">
                                {/* Icon Container (Purple) */}
                                <div className="w-20 h-20 rounded-full bg-[#C243FE]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-[#C243FE]/20 shadow-[0_0_30px_rgba(194,67,254,0.15)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C243FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
                                </div>

                                <h3 className="text-2xl font-tektur font-bold mb-4 text-[#C243FE]">
                                    What Is SPICA?
                                </h3>

                                <p className="text-white/90 font-satoshi font-medium mb-8 text-lg">
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
                                            <span className="text-white/70 font-satoshi text-[15px] leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Card 2: Why Invest? */}
                        <div className="bg-[#0a0a0c]/80 border border-white/5 rounded-none p-8 md:p-12 hover:border-[#FFD700]/30 transition-all duration-300 group">
                            <div className="flex flex-col items-center text-center">
                                {/* Icon Container (Yellow/Orange) */}
                                <div className="w-20 h-20 rounded-full bg-[#FFD700]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-[#FFD700]/20 shadow-[0_0_30px_rgba(255,215,0,0.15)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coins"><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" /></svg>
                                </div>

                                <h3 className="text-2xl font-tektur font-bold mb-4 text-[#C243FE]">
                                    Why You Should Invest In SPICA
                                </h3>

                                <p className="text-white/90 font-satoshi font-medium mb-8 text-base px-2">
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
                                            <span className="text-white/70 font-satoshi text-[15px] leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
                {/* End Unique Features */}
            </div>
        </section>
    );
}
