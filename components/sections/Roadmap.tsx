"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull } from 'lucide-react';

// Phase Data Interface
interface PhasePoint {
    text: string;
    color: string; // Hex code or Tailwind color class
}

interface PhaseData {
    id: number;
    title: string;
    period: string;
    status: 'Live' | 'Underdevelopment' | 'Scheduled' | 'Future Development';
    badgeColor: string; // Specific styling for the badge
    heading: string;
    points: PhasePoint[];
    thumbnail: string;
    largeImage: string;
    themeColor: string; // Main accent color for borders/glows
}

const phases: PhaseData[] = [
    {
        id: 1,
        title: "PHASE 1",
        period: "(Q4 2024 - Q1 2025)",
        status: "Live",
        badgeColor: "bg-[#2ECC71]/20 text-[#2ECC71] border-2 border-[#2ECC71]/30",
        heading: "Foundation & Token Launch",
        points: [
            { text: "Whitepaper & Concept", color: "#2ECC71" }, // Green
            { text: "Contract Verification on BSCscan", color: "#2ECC71" },
            { text: "Web3 Website & Social Media Presence", color: "#2ECC71" },
            { text: "SPICA Presale", color: "#2ECC71" },
            { text: "Airdrop Campaigns", color: "#2ECC71" },
            { text: "Launch Staking, Referral, Exclusive NFT Signature", color: "#2ECC71" },
            { text: "Crypto Community Marketing", color: "#F1C40F" } // Yellowish/Gold
        ],
        thumbnail: "/assets/images/Phase1.png",
        largeImage: "/assets/images/Phase1.png",
        themeColor: "#2ECC71" // Green
    },
    {
        id: 2,
        title: "PHASE 2",
        period: "(Q2 - Q3 2025)",
        status: "Underdevelopment",
        badgeColor: "bg-[#F1C40F]/20 text-[#F1C40F] border-2 border-[#F1C40F]/30",
        heading: "Ecosystem Development",
        points: [
            { text: "Launch of Social Website MVP", color: "#2ECC71" }, // Green
            { text: "Launch of Social Website", color: "#F1C40F" }, // Yellow
            { text: "Launch 3D NFT Avatars", color: "#F1C40F" }, // Yellow
            { text: "Beta of Mobile Social Media App", color: "#C243FE" }, // Purple
            { text: "Glitch Bazaar Integration", color: "#C243FE" },
            { text: "FPS Game Prototype", color: "#C243FE" },
            { text: "Strategic Partnerships", color: "#C243FE" },
            { text: "SPICA Listings on DEXs/CEXs", color: "#C243FE" }
        ],
        thumbnail: "/assets/images/Phase2.png",
        largeImage: "/assets/images/Phase2.png",
        themeColor: "#F1C40F" // Yellow
    },
    {
        id: 3,
        title: "PHASE 3",
        period: "(Q4 2025 - Q2 2026)",
        status: "Scheduled",
        badgeColor: "bg-[#00E5FF]/20 text-[#00E5FF] border-2 border-[#00E5FF]/30", // Cyan badge
        heading: "Game & Metaverse Expansion",
        points: [
            { text: "Full Social Media App Launch", color: "#C243FE" }, // Purple
            { text: "Alpha of AAA FPS Game", color: "#C243FE" },
            { text: "Development of Planet Xebion Begins", color: "#C243FE" },
            { text: "NFT Land/Asset Sales", color: "#C243FE" },
            { text: "SPICA integration in-game and metaverse", color: "#C243FE" },
            { text: "Major Influencer Marketing Push", color: "#C243FE" }
        ],
        thumbnail: "/assets/images/Phase3.png",
        largeImage: "/assets/images/Phase3Large.png",
        themeColor: "#C243FE" // Purple
    },
    {
        id: 4,
        title: "PHASE 4",
        period: "(Q3 2026 - Beyond)",
        status: "Future Development",
        badgeColor: "bg-[#FF3B30]/20 text-[#FF3B30] border-2 border-[#FF3B30]/30", // Red
        heading: "Mass Adoption & Ecosystem Launch",
        points: [
            { text: "Official Game Launch", color: "#FF3B30" }, // Red
            { text: "Beta Release of Xebion Metaverse", color: "#FF3B30" },
            { text: "Expansion of P2E Mechanics", color: "#FF3B30" },
            { text: "Global Growth & Institutional Partnerships", color: "#FF3B30" },
            { text: "Continuous Updates & Community-driven Improvements", color: "#FF3B30" }
        ],
        thumbnail: "/assets/images/Phase4.png",
        largeImage: "/assets/images/Phase4.png",
        themeColor: "#FF3B30" // Red
    }
];

export default function Roadmap() {
    const [activePhaseId, setActivePhaseId] = useState<number>(3);

    const activePhase = phases.find(p => p.id === activePhaseId) || phases[2];

    return (
        <section id="roadmap" className="relative w-full py-8 px-4 overflow-hidden bg-[#050507]">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ffcc]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C243FE]/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Restored Heading */}
            <h2 className="text-3xl md:text-5xl font-tektur font-bold text-center mb-6 text-white tracking-wider">
                OUR <span className="text-[#00ffcc]">ROADMAP</span>
            </h2>

            <div className="max-w-7xl mx-auto flex flex-col gap-6">

                {/* Main Content Area: Details + Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[400px]"
                >

                    {/* Left: Details Card - Reduced Width (Col Span 5), Height & Font Sizes */}
                    <div className="w-full lg:col-span-5 relative p-6 md:p-6 rounded-3xl bg-[#0a0a0c]/80 backdrop-blur-sm border-2 transition-colors duration-500 flex flex-col justify-center h-fit"
                        style={{ borderColor: `${activePhase.themeColor}40`, boxShadow: `0 0 20px ${activePhase.themeColor}10` }}
                    >
                        {/* Status Badge */}
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 tracking-wide w-fit ${activePhase.badgeColor}`}>
                            {activePhase.status}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`content-${activePhase.id}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Title & Period */}
                                <h2 className="text-3xl md:text-4xl font-tektur font-bold text-white mb-2 tracking-tighter uppercase">
                                    {activePhase.title} <span className="text-sm md:text-base font-normal text-white/50 ml-2 tracking-normal font-satoshi">{activePhase.period}</span>
                                </h2>

                                {/* Heading */}
                                <h3 className="text-base font-tektur font-semibold text-white/90 mb-4">
                                    {activePhase.heading}
                                </h3>

                                {/* List Points */}
                                <ul className="space-y-2">
                                    {activePhase.points.map((point, idx) => (
                                        <li key={idx} className="flex items-center gap-2.5 group">
                                            {/* Custom Bullet: Alien Skull */}
                                            <span className="mt-0.5 min-w-[14px]">
                                                <Skull size={14} color={point.color} style={{ filter: `drop-shadow(0 0 5px ${point.color})` }} />
                                            </span>
                                            <span className="text-white/80 font-satoshi text-sm group-hover:text-white transition-colors duration-300">
                                                {point.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </AnimatePresence>

                        {/* Subtle background glow inside card */}
                        <div className="absolute inset-0 -z-10 bg-white/5 blur-3xl opacity-20 rounded-full pointer-events-none"></div>
                    </div>


                    {/* Right: Large Image Display - Reduced Height */}
                    <div className="w-full lg:col-span-7 relative h-[350px] lg:h-[400px] flex items-center justify-center p-4">

                        {/* Tech Frame/Corners - Just L-Shaped Lines, Long & Less Curved */}
                        <div className="absolute inset-4 pointer-events-none">
                            {/* Top Left */}
                            <div className="absolute top-0 left-0 w-24 h-24 border-t-[4px] border-l-[4px] border-[#00ffcc] rounded-tl-xl bg-transparent" style={{ filter: "drop-shadow(0 0 10px #00ffcc)" }}></div>
                            {/* Top Right */}
                            <div className="absolute top-0 right-0 w-24 h-24 border-t-[4px] border-r-[4px] border-[#00ffcc] rounded-tr-xl bg-transparent" style={{ filter: "drop-shadow(0 0 10px #00ffcc)" }}></div>
                            {/* Bottom Left */}
                            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[4px] border-l-[4px] border-[#00ffcc] rounded-bl-xl bg-transparent" style={{ filter: "drop-shadow(0 0 10px #00ffcc)" }}></div>
                            {/* Bottom Right */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[4px] border-r-[4px] border-[#00ffcc] rounded-br-xl bg-transparent" style={{ filter: "drop-shadow(0 0 10px #00ffcc)" }}></div>
                        </div>

                        {/* START: Inner Background added per request - Made smaller with larger inset & more transparent */}
                        <div className="absolute inset-12 bg-white/[0.02] rounded-3xl z-0 pointer-events-none"></div>
                        {/* END: Inner Background */}

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`image-${activePhase.id}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                                className="relative w-full h-full flex items-center justify-center p-12" // INCREASED PADDING
                            >
                                <img
                                    src={activePhase.largeImage}
                                    alt={activePhase.heading}
                                    className={`max-w-full max-h-full object-contain drop-shadow-[0_0_30px_rgba(0,255,204,0.15)] ${activePhase.id === 4 ? 'animate-[spin_12s_linear_infinite]' : ''}`}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </motion.div>


                {/* Bottom: Phase Selectors - Aligned Left (with padding) */}
                <div className="flex flex-nowrap overflow-x-auto justify-start items-start gap-6 md:gap-10 mt-2 pl-4 lg:ml-12 w-full pb-4 scrollbar-hide">
                    {phases.map((phase) => (
                        <div
                            key={phase.id}
                            onClick={() => setActivePhaseId(phase.id)}
                            className="flex flex-col items-center gap-3 cursor-pointer group transition-transform duration-300 hover:scale-105 min-w-[80px]"
                        >
                            {/* Thumbnail - Just Image, No Box/Border */}
                            <div className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0">
                                <img
                                    src={phase.thumbnail}
                                    alt={phase.title}
                                    className={`w-full h-full object-contain drop-shadow-md transition-all duration-300
                                        ${phase.id === 4 ? 'animate-[spin_12s_linear_infinite]' : ''} 
                                        ${activePhaseId === phase.id ? 'brightness-110 scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'brightness-75 opacity-70 hover:opacity-100 hover:brightness-100'}
                                    `}
                                />
                            </div>

                            {/* Label */}
                            <div className="flex flex-col items-center min-w-[80px]">
                                <span className={`font-tektur text-base uppercase tracking-wider transition-colors duration-300 text-center whitespace-nowrap
                                    ${activePhaseId === phase.id ? 'text-white font-bold' : 'text-white/40 group-hover:text-white/80'}
                                `}>
                                    {phase.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div >
        </section >
    );
}
