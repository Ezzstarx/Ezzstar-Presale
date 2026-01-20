"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock Data - 15 Members
const teamMembers = [
    { name: "Saachi Singh", role: "UI UX Designer" },
    { name: "Rabiya Javed", role: "Graphic Designer" },
    { name: "Danish Javed", role: "Product Designer" },
    { name: "Alex Chen", role: "Lead Developer" },
    { name: "Sarah Connor", role: "Blockchain Arch." },
    { name: "Mike Ross", role: "Legal Advisor" },
    { name: "Jessica Suits", role: "Marketing Head" },
    { name: "Harvey Specter", role: "Strategy Lead" },
    { name: "Louis Litt", role: "Finance Manager" },
    { name: "Donna Paulsen", role: "Operations" },
    { name: "Rachel Zane", role: "Community Lead" },
    { name: "Katrina Bennett", role: "Security Eng." },
    { name: "Samantha Wheeler", role: "Partnerships" },
    { name: "Robert Zane", role: "Advisor" },
    { name: "Daniel Hardman", role: "Consultant" },
];

export default function Team() {
    // Carousel State
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 3;
    const totalMembers = teamMembers.length;

    const nextSlide = useCallback(() => {
        // Increment index, loop back to 0 if at end (ensuring we always show 3)
        setCurrentIndex((prev) => (prev + 1) % (totalMembers - itemsPerView + 1));
    }, [totalMembers, itemsPerView]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
    }, []);

    // Fixed logic for sliding
    const cardWidthDesktop = 320;
    const gap = 32;
    const itemFullWidth = cardWidthDesktop + gap;

    const indexToTranslate = (index: number) => {
        return -(index * itemFullWidth);
    };

    // Responsive check - Fix for Hydration Error
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile(); // Check on mount
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Slide every 3 seconds

        return () => clearInterval(interval);
    }, [currentIndex, nextSlide]);

    return (
        <section id="team" className="py-12 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="w-full max-w-[1440px] h-[119px] mx-auto bg-transparent relative flex items-center justify-center mb-8">
                    <h2 className="text-[55px] font-tektur font-medium tracking-[-1px] text-center mb-0 text-white">
                        Core <span className="text-[#00ffcc] text-shadow-glow">Team</span>
                    </h2>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-black via-[#FF00FF] to-black"></div>
                </div>

                <div className="relative max-w-5xl mx-auto group">
                    {/* Carousel Window */}
                    <div className="overflow-hidden w-full">
                        <motion.div
                            className="flex" // Removed gap here to control spacing via padding/margin per item
                            initial={false}
                            animate={{ x: isMobile ? `-${currentIndex * 100}%` : indexToTranslate(currentIndex) }} // Adapt translation
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <div className="flex w-full">
                                {/* Mobile View: Single item centered (100% width) */}
                                {isMobile ? (
                                    teamMembers.map((member, idx) => (
                                        <div key={idx} className="min-w-full flex justify-center px-4">
                                            <motion.div
                                                className="relative group/card h-full w-[280px]"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true, margin: "-50px" }}
                                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            > {/* Fixed width card centered */}
                                                {/* Glow Border Container */}
                                                <div className="relative rounded-2xl p-0.5 bg-gradient-to-b from-[#00ffcc]/50 to-purple-600/50 h-full">
                                                    <div className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden relative h-full flex flex-col">
                                                        {/* Image Section */}
                                                        <div className="relative aspect-square w-full border-b border-white/10">
                                                            <Image
                                                                src="/assets/images/TeamPics.png"
                                                                alt={member.name}
                                                                fill
                                                                className="object-cover"
                                                                priority={idx === 0}
                                                            />
                                                            <div className="absolute inset-0 bg-transparent opacity-20 mix-blend-overlay pointer-events-none"></div>
                                                        </div>
                                                        {/* Text Content */}
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
                                            </motion.div>
                                        </div>
                                    ))
                                ) : (
                                    // Desktop View: Original flex gap layout
                                    <div className="flex gap-8">
                                        {teamMembers.map((member, idx) => (
                                            <div
                                                key={idx}
                                                className="flex-shrink-0 w-[240px] md:w-[280px]"
                                            >
                                                <motion.div
                                                    className="relative group/card h-full"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                                >
                                                    <div className="relative rounded-2xl p-0.5 bg-gradient-to-b from-[#00ffcc]/50 to-purple-600/50 h-full">
                                                        <div className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden relative h-full flex flex-col">
                                                            <div className="relative aspect-square w-full border-b border-white/10">
                                                                <Image
                                                                    src="/assets/images/TeamPics.png"
                                                                    alt={member.name}
                                                                    fill
                                                                    className="object-cover group-hover/card:scale-105 transition-transform duration-500"
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
                                                </motion.div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation Arrows - Repositioned for Mobile */}
                    <div className="flex justify-center gap-4 mt-6 md:hidden">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Desktop Arrows (Original Position) */}
                    <button
                        onClick={prevSlide}
                        // disabled={currentIndex === 0} 
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 
                                   w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center 
                                   text-white hover:bg-white/10 hover:scale-110 transition-all disabled:opacity-30 disabled:hover:scale-100"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 
                                   w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center 
                                   text-white hover:bg-white/10 hover:scale-110 transition-all disabled:opacity-30 disabled:hover:scale-100"
                    >
                        <ChevronRight size={24} />
                    </button>

                </div>
            </div>
        </section>
    );
}
