"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

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
        <section id="upcoming-projects" className="py-12 bg-transparent relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C243FE]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 w-full">
                <div className="w-full max-w-[1440px] h-[119px] mx-auto bg-transparent relative flex items-center justify-center mb-8">
                    <h2 className="text-[55px] font-tektur font-medium tracking-[-1px] text-center mb-0 text-white text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                        Upcoming Projects
                    </h2>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-black via-[#FF00FF] to-black"></div>
                </div>

                {/* Carousel Container */}
                <div className="relative group max-w-6xl mx-auto">
                    <div className="overflow-hidden w-full">
                        {/* Mobile Slider View */}
                        <motion.div
                            className="flex md:hidden"
                            initial={false}
                            animate={{ x: `-${currentIndex * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <div className="flex w-full">
                                {projects.map((project) => (
                                    <div key={project.id} className="min-w-full px-4" onClick={() => setSelectedProject(project)}>
                                        <div className="relative group/card bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C243FE]/50 transition-all duration-300 flex flex-col h-full cursor-pointer">
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
                                                <h3 className="text-xl font-tektur font-medium mb-3 text-[#C243FE]">
                                                    {project.title}
                                                </h3>
                                                <p className="text-sm text-gray-400 font-satoshi leading-relaxed mb-4 flex-grow line-clamp-3">
                                                    {project.description}
                                                </p>
                                                <button className="text-white text-sm hover:text-[#C243FE] transition-colors mt-auto font-tektur uppercase tracking-wider flex items-center gap-2 justify-center group/btn">
                                                    Learn More
                                                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Desktop Grid View */}
                        <div className="hidden md:grid md:grid-cols-3 gap-6 w-full">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="relative group/card bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C243FE]/50 transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-2"
                                    onClick={() => setSelectedProject(project)}
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
                                        <h3 className="text-lg font-tektur font-medium mb-2 text-[#C243FE]">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 font-satoshi leading-relaxed mb-4 flex-grow line-clamp-4">
                                            {project.description}
                                        </p>
                                        <button className="text-white text-xs hover:text-[#C243FE] transition-colors mt-auto font-tektur uppercase tracking-wider flex items-center gap-2 justify-center group/btn">
                                            View Details
                                            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                        </button>
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

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-4xl bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
                            style={{
                                backgroundImage: "url('/assets/images/background.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                        >
                            {/* Top Black Container (Long Width) */}
                            <div className="relative w-full h-[300px] bg-black/60 backdrop-blur-md flex items-center justify-center border-b border-white/10 overflow-hidden">
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                            </div>

                            {/* Content Section */}
                            <div className="p-8 md:p-12 text-center relative z-10">
                                <h3 className="text-3xl md:text-4xl font-tektur font-medium mb-6 text-[#C243FE] drop-shadow-lg">
                                    {selectedProject.title}
                                </h3>
                                <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#C243FE] to-transparent mx-auto mb-8" />

                                <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-satoshi">
                                    {selectedProject.description}
                                </p>
                            </div>

                            {/* Footer / Cancel Button */}
                            <div className="p-6 flex justify-end">
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="px-8 py-2 bg-gradient-to-b from-[#333] to-[#111] border border-white/20 rounded-full text-white/90 font-tektur uppercase tracking-wider hover:text-white hover:border-white/40 transition-all shadow-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
