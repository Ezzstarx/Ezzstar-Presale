"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock Data - 15 Members
const teamMembers = [
    { name: "Muzammil Moosa", role: "CEO, Founder", linkedin: "https://www.linkedin.com/in/muzammil-moosa-48ba7a201/", image: "/assets/images/team/Muzammil.jpeg" },
    { name: "Aman Prajapati", role: "CTO, Co-Founder", linkedin: "https://www.linkedin.com/in/aman-prajapati-675909199/", image: "/assets/images/team/team-1.jpeg" },
    { name: "Tushar Goyal", role: "Blockchain Developer", linkedin: "https://www.linkedin.com/in/tushar-goyal-1876b7160?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", image: "/assets/images/team/team-2.jpeg" },
    { name: "Fateen Moeen", role: "Unreal Dev/ Ani Lead", linkedin: "https://www.linkedin.com/in/fateen-catzero/", image: "/assets/images/team/team-3.jpeg" },
    { name: "Rabiya Javed", role: "Graphic Designer", linkedin: "https://www.linkedin.com/in/rabiya-javed-378694275/", image: "/assets/images/team/Rabiya.jpeg" },
    { name: "Saachi Singh", role: "Product Designer", linkedin: "https://www.linkedin.com/in/saachi-singh-75323123b/", image: "/assets/images/team/Saachi.jpeg" },
    { name: "M. Arbaaz", role: "Partnership Manager", linkedin: "https://www.linkedin.com/in/mohammed-arbaaz-41b428182/", image: "/assets/images/team/Arbaaz.jpeg" },
    { name: "Ali Abdullah", role: "Community Builder", linkedin: "https://www.linkedin.com/in/ali-abdullah-028845333/", image: "/assets/images/team/team-4.jpeg" },
    { name: "Harsh Upadhyay", role: "Full Stack Developer", linkedin: "https://www.linkedin.com/in/upadhyay-harsh9756/", image: "/assets/images/team/Harsh.jpeg" },
    { name: "Abdullah Khan", role: "Web Developer", linkedin: "https://www.linkedin.com/in/abdullahkhancs01/", image: "/assets/images/team/Abdullah-Khan.jpeg" },
    { name: "Misbah Iftikhar", role: "2D Concept Artist", linkedin: "https://www.linkedin.com/in/misbah-iftikhar-20761938/", image: "/assets/images/team/Misbah.jpeg" },
    { name: "Ayush Kumar", role: "Level Designer", linkedin: "https://www.linkedin.com/in/ayush-kumar-parganihaa-49048320b/", image: "/assets/images/team/team-5.jpeg" },
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

    // Card dimensions state
    const [cardWidth, setCardWidth] = useState(280);
    const [gap, setGap] = useState(32);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;

                if (window.innerWidth < 768) {
                    // Mobile: Gap 12px. We want 2 items exactly.
                    // containerWidth is the width of the window-overflow-hidden div.
                    const mobileGap = 12;
                    // Calculate card width: (ContainerWidth - 1 Gap) / 2 Items
                    const newCardWidth = (containerWidth - mobileGap) / 2;

                    setCardWidth(newCardWidth);
                    setGap(mobileGap);
                } else {
                    // Desktop
                    setCardWidth(280);
                    setGap(32);
                }
            }
        };

        // Initial
        updateDimensions();

        // Resize Listener
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

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
        <section id="team" className="pb-12 relative overflow-hidden bg-[url('/assets/images/background-main.png')] bg-cover bg-center">
            <div className="relative z-10 w-full">
                <div className="w-full max-w-[1440px] h-[119px] mx-auto bg-transparent relative flex items-center justify-center mb-8">
                    <h2 className="text-3xl md:text-[55px] font-tektur font-medium tracking-[-1px] text-center mb-0 text-white">
                        Core <span className="text-[#00ffcc] text-shadow-glow">Team</span>
                    </h2>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-black via-[#FF00FF] to-black"></div>
                </div>

                <div className="relative w-full max-w-[960px] mx-auto group px-12 md:px-4">
                    {/* Carousel Window */}
                    <div className="overflow-hidden w-full" ref={containerRef}>
                        <motion.div
                            className="flex"
                            style={{ gap: gap }}
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
                                    className="flex-shrink-0"
                                    style={{ width: cardWidth }}
                                >
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative group/card h-full block"
                                    >
                                        <div className="relative rounded-2xl h-full">
                                            {/* Gradient Border Mask */}
                                            <div
                                                className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none z-20"
                                                style={{
                                                    background: 'linear-gradient(to bottom, rgba(0,255,204,0.5), rgba(147,51,234,0.5))',
                                                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                    maskComposite: 'exclude',
                                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                    WebkitMaskComposite: 'xor'
                                                }}
                                            />
                                            <div className="bg-transparent rounded-xl overflow-hidden relative h-full flex flex-col z-10">
                                                <div className="relative aspect-square w-full cursor-pointer">
                                                    <NextImage
                                                        src={member.image || "/assets/images/TeamPics.png"}
                                                        alt={member.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-transparent opacity-20 mix-blend-overlay pointer-events-none"></div>
                                                </div>
                                                <div className="p-4 flex flex-col justify-end flex-grow bg-transparent">
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
                        className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-16 z-20 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#00ffcc] to-purple-600 text-black font-bold text-xl hover:shadow-[0_0_20px_#00ffcc] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous team member"
                    >
                        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={isTransitioning}
                        className="absolute right-1 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-16 z-20 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#00ffcc] to-purple-600 text-black font-bold text-xl hover:shadow-[0_0_20px_#00ffcc] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next team member"
                    >
                        <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}

