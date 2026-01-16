"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "Social Website",
        image: "/assets/images/SocialWebsite.png",
        description: "This social website will empower creators, gamers, and manga artists by allowing users to monetize their work without intermediaries' thresholds and unpredictable algorithms."
    },
    {
        id: 2,
        title: "Web3 Social Media App",
        image: "/assets/images/Web3SocialApp.png",
        description: "Introducing a revolutionizing web3 social media app where users can engage with content, socialize, participate in esports tournaments, and earn rewards."
    },
    {
        id: 3,
        title: "3D NFT Character",
        image: "/assets/images/3D-NFTChar.png",
        description: "Introducing our NFT Character concept! (Note: These are conceptual designs, not the actual 3D models yet). Customize your avatar and explore the metaverse."
    }
];

export default function UpcomingProjects() {
    // Implements window-based slider logic.

    const [currentIndex, setCurrentIndex] = useState(0);

    // Number of items to show per screen (Responsive)
    // Mobile: 1, Tablet: 2, Desktop: 3
    // For simplicity in this logic, we'll slide one by one or assume desktop shows 3.

    // Helper to handle next/prev
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 < 0 ? projects.length - 1 : prev - 1));
    };

    // Auto-Scroll Logic
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Slide every 5 seconds
        return () => clearInterval(interval);
    }, [currentIndex]);



    // Update logic to handle responsiveness


    return (
        <section id="upcoming-projects" className="py-12 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C243FE]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-3xl md:text-4xl font-tektur font-bold text-center mb-8 text-white text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                    Upcoming Projects
                </h2>

                {/* Carousel Container */}
                <div className="relative group max-w-6xl mx-auto">
                    <div className="overflow-hidden w-full">
                        {/* Mobile Slider View (Visible md:hidden) - flex 100% items */}
                        <motion.div
                            className="flex md:hidden"
                            initial={false}
                            animate={{ x: `-${currentIndex * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <div className="flex w-full">
                                {projects.map((project) => (
                                    <div key={project.id} className="min-w-full px-4">
                                        <div className="relative group/card bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C243FE]/50 transition-all duration-300 flex flex-col h-full">
                                            {/* Image Area */}
                                            <div className="relative h-[220px] w-full overflow-hidden bg-black/50">
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent opacity-80" />
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex flex-col flex-grow text-center">
                                                <h3 className="text-xl font-tektur font-bold mb-3 text-[#C243FE]">
                                                    {project.title}
                                                </h3>
                                                <p className="text-sm text-gray-400 font-satoshi leading-relaxed">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Desktop Grid View (Hidden on mobile, Visible md:grid) - Static 3 cols */}
                        <div className="hidden md:grid md:grid-cols-3 gap-6 w-full">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="relative group/card bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C243FE]/50 transition-all duration-300 flex flex-col"
                                >
                                    <div className="relative h-[220px] w-full overflow-hidden bg-black/50">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent opacity-80" />
                                    </div>

                                    <div className="p-4 flex flex-col flex-grow text-center">
                                        <h3 className="text-lg font-tektur font-bold mb-2 text-[#C243FE]">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 font-satoshi leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows (Mobile Only) */}
                    <div className="flex justify-center gap-4 mt-8 md:hidden">
                        <button
                            onClick={prevSlide}
                            className="p-3 rounded-full border border-white/10 bg-white/5 text-white disabled:opacity-50 active:scale-95 transition-all hover:bg-white/10"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-3 rounded-full border border-white/10 bg-white/5 text-white disabled:opacity-50 active:scale-95 transition-all hover:bg-white/10"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
