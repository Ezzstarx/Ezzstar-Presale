"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock Data - 15 Members
const teamMembers = [
    { name: "Muzammil Moosa", role: "CEO, Founder", linkedin: "https://www.linkedin.com/in/muzammil-moosa-48ba7a201/" },
    { name: "Aman Prajapati", role: "CTO, Co-Founder", linkedin: "https://www.linkedin.com/in/aman-prajapati-675909199/" },
    { name: "Tushar Goyal", role: "Blockchain Developer", linkedin: "https://www.linkedin.com/in/tushar-goyal-1876b7160?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
    { name: "Fateen Moeen", role: "Unreal Dev/ Ani Lead", linkedin: "https://www.linkedin.com/in/fateen-catzero/" },
    { name: "Rabiya Javed", role: "Graphic Designer", linkedin: "https://www.linkedin.com/in/rabiya-javed-378694275/", image: "/assets/images/Rabiya.jpeg" },
    { name: "Saachi Singh", role: "Product Designer", linkedin: "https://www.linkedin.com/in/saachi-singh-75323123b/", image: "/assets/images/Saachi.jpeg" },
    { name: "M. Arbaaz", role: "Partnership Manager", linkedin: "https://www.linkedin.com/in/mohammed-arbaaz-41b428182/", image: "/assets/images/Arbaaz.jpeg" },
    { name: "Ali Abdullah", role: "Community Builder", linkedin: "https://www.linkedin.com/in/ali-abdullah-028845333/" },
    { name: "Harsh Upadhyay", role: "Full Stack Developer", linkedin: "https://www.linkedin.com/in/upadhyay-harsh9756/", image: "/assets/images/Harsh.jpeg" },
    { name: "Abdullah Khan", role: "Web Developer", linkedin: "https://www.linkedin.com/in/abdullahkhancs01/" },
    { name: "Misbah Iftikhar", role: "2D Concept Artist", linkedin: "https://www.linkedin.com/in/misbah-iftikhar-20761938/", image: "/assets/images/Misbah.jpeg" },
    { name: "Ayush Kumar", role: "Level Designer", linkedin: "https://www.linkedin.com/in/ayush-kumar-parganihaa-49048320b/" },
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

    // Auto-slide effect removed - manual navigation only

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
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative group/card h-full block"
                                    >
                                        <div className="relative rounded-2xl p-0.5 bg-gradient-to-b from-[#00ffcc]/50 to-purple-600/50 h-full">
                                            <div className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden relative h-full flex flex-col">
                                                <div className="relative aspect-square w-full border-b border-white/10 cursor-pointer">
                                                    <NextImage
                                                        src={member.image || "/assets/images/TeamPics.png"}
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
                                                        <p className="text-[#39FF14] font-tektur font-medium tracking-wide text-xs">
                                                            {member.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        disabled={isTransitioning}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#00ffcc] to-purple-600 text-black font-bold text-xl hover:shadow-[0_0_20px_#00ffcc] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous team member"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={isTransitioning}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#00ffcc] to-purple-600 text-black font-bold text-xl hover:shadow-[0_0_20px_#00ffcc] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next team member"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}

