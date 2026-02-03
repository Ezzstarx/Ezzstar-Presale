"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
    id: number;
    title: string;
    cardImages: string[];
    modalImages: string[];
    description: string;
    extendedContent?: {
        mainTitle: string;
        sections: {
            title?: string;
            items: string[];
            footer?: string;
        }[];
    };
}

const projects: Project[] = [
    {
        id: 1,
        title: "Social Website",
        cardImages: [
            "/assets/images/Upcoming/Up-SocialSite-1.png"
        ],
        modalImages: [
            "/assets/images/Upcoming/Up-SocialSite-1.1.png",
            "/assets/images/Upcoming/Up-SocialSite-1.2.png",
            "/assets/images/Upcoming/Up-SocialSite-1.3.png"
        ],
        description: "This social website will empower creators, gamers, and manga artists by allowing users to monetize their work without intermediaries' thresholds and unpredictable algorithms. Our platform provides fair rewards for contributions, enabling users to earn while reading, claim rewards per hour, and tip their favorite artists."
    },
    {
        id: 2,
        title: "Web3 Social Media App",
        cardImages: [
            "/assets/images/Upcoming/Up-SocialApp-2.1.png",
            "/assets/images/Upcoming/Up-SocialApp-2.2.png",
            "/assets/images/Upcoming/Up-SocialApp-2.3.png",
            "/assets/images/Upcoming/Up-SocialApp-2.4.png"
        ],
        modalImages: [
            "/assets/images/Upcoming/Up-SocialApp-2.5.png",
            "/assets/images/Upcoming/Up-SocialApp-2.6.png",
            "/assets/images/Upcoming/Up-SocialApp-2.7.png",
            "/assets/images/Upcoming/Up-SocialApp-2.8.png",
            "/assets/images/Upcoming/Up-SocialApp-2.9.png"
        ],
        description: "Introducing a revolutionizing web3 social media app where users can engage with content, socialize, hangout, participate in esports/events, and explore a digital marketplace and more. Each user will have a unique digital identity.",
        extendedContent: {
            mainTitle: "Those who own an Ezzstar 3D NFT character will join the exclusive \"Elite Division\" rank system. Elite Division members will enjoy:",
            sections: [
                {
                    items: [
                        "- Weekly rewards",
                        "- Free metaverse real estate",
                        "- Exclusive benefits"
                    ],
                    footer: "To rank up within the Elite Division, members will complete tasks and challenges, earning them exclusive rewards and higher status within the community."
                },
                {
                    title: "All users will be part of a social rating system, where their profiles will be rated by others, influencing their position on the Hall of Fame leaderboard. A higher social rating will unlock benefits like:",
                    items: [
                        "- Discounts",
                        "- Digital goods"
                    ]
                }
            ]
        }
    },
    {
        id: 3,
        title: "3D NFT Character",
        cardImages: [
            "/assets/images/Upcoming/3D-NFTChar.png"
        ],
        modalImages: [
            "/assets/images/Upcoming/Up-3DNFT-3.1.png",
            "/assets/images/Upcoming/Up-3DNFT-3.2.png",
            "/assets/images/Upcoming/Up-3DNFT-3.3.png"
        ],
        description: "Introducing our NFT Character concept! (Note: These are conceptual designs, not the actual 3D NFTs)",
        extendedContent: {
            mainTitle: "Owning a 3D NFT character comes with exclusive benefits:",
            sections: [
                {
                    items: [
                        "- Unique backstory for each character",
                        "- Usable in our mobile app, in-game, and metaverse",
                        "- Customize with skins, and weapons",
                        "- Trade digital wearable"
                    ]
                },
                {
                    title: "NFT owners will enjoy:",
                    items: [
                        "- Ability to rank up in divisions by completing elite tasks",
                        "- Free metaverse land",
                        "- And more"
                    ]
                }
            ]
        }
    }
];

export default function UpcomingProjects() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 < 0 ? projects.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <section id="upcoming-projects" className="pb-12 relative overflow-hidden bg-[url('/assets/images/background-main.png')] bg-cover bg-center">

            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C243FE]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 w-full">
                <div className="w-full max-w-[1440px] h-[119px] mx-auto bg-transparent relative flex items-center justify-center mb-12">
                    <h2 className="text-[40px] md:text-[50px] font-tektur font-medium tracking-tight text-center mb-0 text-white">
                        Upcoming Projects
                    </h2>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DE3BD6] to-transparent"></div>
                </div>

                <div className="relative group max-w-6xl mx-auto">
                    <div className="overflow-hidden w-full">
                        {/* Mobile Slider View */}
                        <motion.div
                            className="flex md:hidden"
                            initial={false}
                            animate={{ x: `-${currentIndex * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {projects.map((project) => (
                                <div key={project.id} className="min-w-full px-4" onClick={() => setSelectedProject(project)}>
                                    <div
                                        className="relative group/card magic-card rounded-lg overflow-hidden flex flex-col h-full cursor-pointer backdrop-blur-md p-[1px]"
                                        style={{ '--mask-bg': '#0a0a0c' } as React.CSSProperties}
                                    >
                                        <div className="w-full h-full rounded-lg overflow-hidden flex flex-col bg-[#0a0a0c] border-[5px] border-black">
                                            <div className="relative h-[260px] w-full overflow-hidden bg-black/40 p-0 flex gap-0">
                                                {project.cardImages.map((img, idx) => (
                                                    <div key={idx} className="relative flex-1 h-full">
                                                        <Image src={img} alt={project.title} fill className="object-cover" />
                                                    </div>
                                                ))}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent opacity-40 pointer-events-none" />
                                            </div>
                                            <div className="p-4 flex flex-col flex-grow text-center">
                                                <h3 className="text-2xl font-tektur font-medium mb-1 text-[#DE3BD6]">{project.title}</h3>
                                                <p
                                                    className="text-sm text-gray-400 font-satoshi leading-relaxed mb-2"
                                                    style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: project.id === 2 ? 2 : 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        <div className="hidden md:grid md:grid-cols-3 gap-8 w-full">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="relative group/card magic-card rounded-lg overflow-hidden flex flex-col cursor-pointer backdrop-blur-md p-[1px]"
                                    style={{ '--mask-bg': '#0a0a0c' } as React.CSSProperties}
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="w-full h-full rounded-lg overflow-hidden flex flex-col bg-[#0a0a0c] border-[5px] border-black">
                                        <div className="relative h-[300px] w-full overflow-hidden bg-black/40 p-0 flex gap-0">
                                            {project.cardImages.map((img, idx) => (
                                                <div key={idx} className="relative flex-1 h-full">
                                                    <Image src={img} alt={project.title} fill className="object-cover" />
                                                </div>
                                            ))}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent opacity-40 pointer-events-none" />
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow text-center">
                                            <h3 className="text-2xl font-tektur font-medium mb-1 text-[#DE3BD6]">{project.title}</h3>
                                            <p
                                                className="text-xs text-gray-400 font-satoshi leading-relaxed"
                                                style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: project.id === 2 ? 2 : 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-8 md:hidden">
                        <button onClick={prevSlide} className="p-3 rounded-full border border-white/10 bg-white/5 text-white">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={nextSlide} className="p-3 rounded-full border border-white/10 bg-white/5 text-white">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="w-full max-w-5xl h-auto max-h-[90vh] bg-transparent border border-white/5 rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col"
                            style={{
                                backgroundImage: "url('/assets/images/background.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                        >
                            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                            {/* Single Scrollable Container */}
                            <div className="relative z-10 flex flex-col h-full overflow-y-auto custom-scrollbar p-0">

                                {/* Image Container - INSIDE SCROLL - FULL VISIBILITY */}
                                <div className="w-full h-auto flex flex-col items-center pt-8 pb-6 px-8 flex-shrink-0">
                                    <div className="w-full h-64 md:h-[360px] flex gap-0 justify-center items-center bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 mx-auto max-w-4xl relative p-0">
                                        {selectedProject.modalImages.map((img, idx) => {
                                            // Special scaling for "Upcoming Social Website" (ID 1), 1st and 3rd images
                                            const isSpecialProject = selectedProject.id === 1;
                                            const isSpecialImage = idx === 0 || idx === 2;
                                            const scaleClass = (isSpecialProject && isSpecialImage) ? "scale-[1.35]" : "scale-[1]";

                                            return (
                                                <div key={idx} className="relative flex-1 h-full min-w-0 overflow-hidden">
                                                    <Image
                                                        src={img}
                                                        alt={selectedProject.title}
                                                        fill
                                                        className={`object-contain ${scaleClass}`}
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 flex flex-col items-center px-6 md:px-10 pb-10">
                                    {/* Animated Heading */}
                                    <div className="text-center relative mb-6 w-full flex-shrink-0">
                                        <h3 className="font-tektur font-medium text-[#DE3BD6] mb-4 tracking-tight uppercase" style={{ fontSize: '26px' }}>
                                            {selectedProject.title}
                                        </h3>
                                        {/* Glowing Line Container */}
                                        <div className="relative h-[2px] w-[60%] md:w-[50%] mx-auto flex justify-center items-center z-10">
                                            {/* Ambient Glow Area - Visible All Time - Multi-color Gradient */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[20px] bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40 blur-[12px] rounded-full pointer-events-none" />

                                            <div className="relative w-full h-full overflow-hidden rounded-full z-10">
                                                {/* Base Line - Visible All Time with Multi-color Gradient */}
                                                <div className="absolute inset-x-0 h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)]" />

                                                {/* Intense White Glow (Left to Right Only) */}
                                                <motion.div
                                                    className="absolute top-0 h-full bg-white rounded-full blur-[1px]"
                                                    style={{
                                                        boxShadow: "0 0 20px 4px rgba(255, 255, 255, 1), 0 0 40px 8px rgba(194, 67, 254, 0.8)",
                                                        width: "30%"
                                                    }}
                                                    animate={{
                                                        left: ["-30%", "110%"]
                                                    }}
                                                    transition={{
                                                        duration: 2.5,
                                                        repeat: Infinity,
                                                        ease: "linear"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full max-w-4xl mx-auto space-y-4 mb-8">
                                        <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-satoshi font-light px-4 drop-shadow-md text-center">
                                            {selectedProject.description}
                                        </p>

                                        {selectedProject.extendedContent && (
                                            <div className="space-y-6 text-gray-200 font-satoshi font-light text-[10px] md:text-xs text-center px-4">
                                                <p className="font-bold text-white text-xs md:text-sm drop-shadow-lg">
                                                    {selectedProject.extendedContent.mainTitle}
                                                </p>

                                                {selectedProject.extendedContent.sections.map((section, sidx) => (
                                                    <div key={sidx} className="space-y-3">
                                                        {section.title && <p className="text-white/90 font-medium">{section.title}</p>}
                                                        <div className="flex flex-col items-center space-y-1">
                                                            {section.items.map((item, iidx) => (
                                                                <p key={iidx} className="drop-shadow-sm">{item}</p>
                                                            ))}
                                                        </div>
                                                        {section.footer && (
                                                            <p className="mt-4 text-[9px] md:text-[10px] italic text-gray-300/80 max-w-2xl mx-auto leading-relaxed">
                                                                {section.footer}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Purple Separator Line - Updated Color */}
                                    <div className="w-full max-w-3xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#DE3BD6] to-transparent shadow-[0_0_15px_rgba(222,59,214,0.9)] opacity-90 mb-6" />

                                    {/* Cancel Button */}
                                    <div className="w-full flex justify-end px-4 mb-2">
                                        <button
                                            onClick={() => setSelectedProject(null)}
                                            className="px-6 py-1 bg-white/5 backdrop-blur-md border border-white/20 rounded-[12px] text-white/70 font-tektur font-medium tracking-[2px] hover:bg-white/10 hover:border-white/40 hover:text-white transition-all shadow-lg active:scale-95 flex items-center justify-center min-w-[100px]"
                                            style={{ fontSize: '18px' }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
