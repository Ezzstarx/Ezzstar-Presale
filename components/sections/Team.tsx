"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import NextImage from "next/image";

// Mock Data - 15 Members
const teamMembers = [
    { name: "Muzammil Moosa", role: "CEO, Founder" },
    { name: "Aman Prajapati", role: "CTO, Co-Founder" },
    { name: "Tushar Goyal", role: "Blockchain Developer" },
    { name: "Fateen Moeen", role: "Unreal Dev/ Ani Lead" },
    { name: "Rabiya Javed", role: "Graphic Designer" },
    { name: "Saachi Singh", role: "Product Designer" },
    { name: "M. Arbaaz", role: "Partnership Manager" },
    { name: "Ali Abdullah", role: "Community Builder" },
    { name: "Misbah Iftikhar", role: "2D Concept Artist" },
    { name: "Ayush Kumar", role: "Level Designer" },
];

export default function Team() {
    // Infinite Loop Logic
    // We triplicate the list: [Buffer-Left] [Main-Center] [Buffer-Right]
    // Start view at the beginning of [Main-Center]
    const extendedMembers = [...teamMembers, ...teamMembers, ...teamMembers];
    const totalOriginal = teamMembers.length;

    // Start index at the beginning of the second set (Total Original)
    const [currentIndex, setCurrentIndex] = useState(totalOriginal);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Card dimensions
    const cardWidth = 280;
    const gap = 32;
    const itemFullWidth = cardWidth + gap;

    // Move to Next Slide
    const nextSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
    }, [isTransitioning]);

    // Move to Prev Slide
    const prevSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
    }, [isTransitioning]);

    // Handle Transition End (Infinite Jump)
    // We only reset position when the animation completes to make it invisible
    useEffect(() => {
        if (!isTransitioning) return;

        const timeout = setTimeout(() => {
            setIsTransitioning(false);

            // If we reached the end of the second set, jump back to start of second set
            if (currentIndex >= totalOriginal * 2) {
                setCurrentIndex(totalOriginal);
            }
            // If we reached the start of the first set, jump to start of third set? 
            // Actually simpler: Jump to end of second set
            else if (currentIndex < totalOriginal) {
                setCurrentIndex(totalOriginal * 2 - 1);
            }
        }, 500); // Match CSS transition duration

        return () => clearTimeout(timeout);
    }, [currentIndex, isTransitioning, totalOriginal]);

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <section id="team" className="py-12 relative overflow-hidden bg-[url('/assets/images/background-main.png')] bg-cover bg-center">
            <div className="relative z-10 w-full">
                <div className="w-full max-w-[1440px] h-[119px] mx-auto bg-transparent relative flex items-center justify-center mb-8">
                    <h2 className="text-[55px] font-tektur font-medium tracking-[-1px] text-center mb-0 text-white">
                        Core <span className="text-[#00ffcc] text-shadow-glow">Team</span>
                    </h2>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-black via-[#FF00FF] to-black"></div>
                </div>

                <div className="relative w-full max-w-[936px] mx-auto group">
                    {/* Carousel Window */}
                    <div className="overflow-hidden w-full">
                        <motion.div
                            className="flex gap-8"
                            initial={false}
                            animate={{ x: -(currentIndex * itemFullWidth) }}
                            transition={{
                                duration: isTransitioning ? 0.5 : 0,
                                ease: "easeInOut"
                            }}
                        >
                            {extendedMembers.map((member, idx) => (
                                <div
                                    key={idx}
                                    className="flex-shrink-0 w-[240px] md:w-[280px]"
                                >
                                    <div className="relative group/card h-full">
                                        <div className="relative rounded-2xl p-0.5 bg-gradient-to-b from-[#00ffcc]/50 to-purple-600/50 h-full hover:scale-105 transition-transform duration-300">
                                            <div className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden relative h-full flex flex-col">
                                                <div className="relative aspect-square w-full border-b border-white/10">
                                                    <NextImage
                                                        src="/assets/images/TeamPics.png"
                                                        alt={member.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-transparent opacity-20 mix-blend-overlay pointer-events-none"></div>
                                                </div>
                                                <div className="p-4 flex flex-col justify-end flex-grow bg-black/40 backdrop-blur-sm">
                                                    <h3 className="text-xl font-tektur font-medium text-white mb-1">
                                                        {member.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_8px_#39FF14]"></div>
                                                        <p className="text-[#39FF14] font-satoshi font-medium tracking-wide text-xs">
                                                            {member.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Buttons Removed as per request */}

                    {/* Mobile Controls Removed as per request */}
                </div>
            </div>
        </section>
    );
}

