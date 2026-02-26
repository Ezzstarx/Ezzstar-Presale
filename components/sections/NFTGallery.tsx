import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useState, useCallback } from "react";
import Image from "next/image";
import MagicButton from "@/components/ui/MagicButton";
import { X } from "lucide-react";

// Updated data with colors and invest amounts
const nfts = [
    {
        id: 3,
        name: "Lily",
        role: "Scout",
        image: "/assets/images/Lily.jpg",
        price: "$50",
        color: "text-green-500",
        borderGradient: "linear-gradient(to bottom, rgb(34,197,94) 0%, rgb(34,197,94) 30%, rgb(17,99,47) 50%, black 100%)",
        bgGradient: "from-green-900/20 to-black"
    },
    {
        id: 1,
        name: "Spica NFT",
        role: "Commander",
        image: "/assets/images/Spica.jpg",
        price: "$150",
        color: "text-[#BF5AF2]",
        borderGradient: "linear-gradient(to bottom, rgb(191,90,242) 0%, rgb(191,90,242) 60%, rgb(96,45,121) 80%, black 100%)",
        bgGradient: "from-[#BF5AF2]/20 to-black"
    },
    {
        id: 2,
        name: "Buffo NFT",
        role: "Tank",
        image: "/assets/images/Buffo.jpg",
        price: "$100",
        color: "text-red-500",
        borderGradient: "linear-gradient(to bottom, rgb(239,68,68) 0%, rgb(239,68,68) 85%, rgb(120,34,34) 92%, black 100%)",
        bgGradient: "from-red-900/20 to-black"
    },
];

// Position configs for left, center, right
const positionVariants = {
    left: {
        x: "-55%",
        scale: 0.82,
        opacity: 0.6,
        zIndex: 1,
        filter: "brightness(0.5)",
    },
    center: {
        x: "0%",
        scale: 1,
        opacity: 1,
        zIndex: 10,
        filter: "brightness(1)",
    },
    right: {
        x: "55%",
        scale: 0.82,
        opacity: 0.6,
        zIndex: 1,
        filter: "brightness(0.5)",
    },
};

// Mobile position configs
const mobilePositionVariants = {
    left: {
        x: "-40%",
        scale: 0.78,
        opacity: 0.5,
        zIndex: 1,
        filter: "brightness(0.45)",
    },
    center: {
        x: "0%",
        scale: 1,
        opacity: 1,
        zIndex: 10,
        filter: "brightness(1)",
    },
    right: {
        x: "40%",
        scale: 0.78,
        opacity: 0.5,
        zIndex: 1,
        filter: "brightness(0.45)",
    },
};

type Position = "left" | "center" | "right";

export default function NFTGallery() {
    const [centerIndex, setCenterIndex] = useState(1); // Start with Spica (index 1) in center
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile on mount
    useState(() => {
        if (typeof window !== "undefined") {
            const check = () => setIsMobile(window.innerWidth < 768);
            check();
            window.addEventListener("resize", check);
        }
    });

    // Get position for each card based on centerIndex
    const getPosition = useCallback((index: number): Position => {
        const total = nfts.length;
        const diff = (index - centerIndex + total) % total;
        if (diff === 0) return "center";
        if (diff === 1) return "right";
        return "left"; // diff === 2 (or total - 1)
    }, [centerIndex]);

    // Handle click on a card
    const handleCardClick = useCallback((index: number) => {
        if (expandedId !== null) return; // Don't swap while expanded
        const position = getPosition(index);
        if (position === "center") return; // Already centered
        setCenterIndex(index);
    }, [expandedId, getPosition]);

    // Handle drag on side cards
    const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (expandedId !== null) return;
        const threshold = 50;
        if (info.offset.x < -threshold) {
            // Dragged left → bring right card to center
            setCenterIndex(prev => (prev + 1) % nfts.length);
        } else if (info.offset.x > threshold) {
            // Dragged right → bring left card to center
            setCenterIndex(prev => (prev - 1 + nfts.length) % nfts.length);
        }
    }, [expandedId]);

    const isExpanded = expandedId !== null;

    return (
        <section id="portfolios" className="py-24 relative overflow-hidden bg-transparent min-h-[800px]">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-5xl font-tektur font-bold text-center mb-10 md:mb-16">
                    Choose Your <span className="text-accent-cyan">Character</span>
                </h2>

                {/* Carousel container */}
                <div className="relative w-full max-w-5xl mx-auto flex justify-center items-center min-h-[550px] md:min-h-[650px]">
                    <AnimatePresence mode="popLayout">
                        {nfts.map((nft, index) => {
                            const position = getPosition(index);
                            const isCenter = position === "center";
                            const isThisExpanded = expandedId === nft.id;
                            const variants = isMobile ? mobilePositionVariants : positionVariants;

                            // If another card is expanded and this isn't the one, hide it
                            if (isExpanded && !isThisExpanded) {
                                return null;
                            }

                            return (
                                <motion.div
                                    key={nft.id}
                                    layout
                                    initial={variants[position]}
                                    animate={
                                        isThisExpanded
                                            ? {
                                                x: "0%",
                                                scale: 1.02,
                                                opacity: 1,
                                                zIndex: 50,
                                                filter: "brightness(1)",
                                            }
                                            : variants[position]
                                    }
                                    exit={{
                                        opacity: 0,
                                        scale: 0.7,
                                        transition: { duration: 0.4, ease: "easeInOut" },
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        type: "spring",
                                        stiffness: 80,
                                        damping: 18,
                                    }}
                                    drag={!isCenter && !isExpanded ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.3}
                                    onDragEnd={!isCenter && !isExpanded ? handleDragEnd : undefined}
                                    onClick={() => handleCardClick(index)}
                                    className={`absolute rounded-2xl p-[2px] transition-shadow duration-300
                                        w-[280px] md:w-[340px] lg:w-[380px]
                                        ${isThisExpanded ? 'w-full max-w-2xl' : ''}
                                        ${!isCenter ? 'cursor-pointer' : ''}
                                        ${!isCenter && !isExpanded ? 'hover:opacity-80' : ''}
                                        h-[420px] md:h-[520px] lg:h-[580px]`}
                                    style={{
                                        background: nft.borderGradient,
                                    }}
                                >
                                    {/* Inner Card Content */}
                                    <div className="relative h-full w-full bg-[#0a0a0c] rounded-2xl overflow-hidden flex flex-col">

                                        {/* Back Button if expanded */}
                                        {isThisExpanded && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setExpandedId(null);
                                                }}
                                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white border border-white/20 transition-colors"
                                            >
                                                <X size={24} />
                                            </button>
                                        )}

                                        {/* Decorative Corner Lines */}
                                        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/30 z-20"></div>
                                        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/30 z-20"></div>

                                        {/* Image Area */}
                                        <div className="relative flex-1 bg-gradient-to-b from-gray-800 to-black overflow-hidden group">
                                            <div className={`absolute inset-0 bg-gradient-to-b ${nft.bgGradient} opacity-60`}></div>
                                            <div className="absolute inset-0 flex items-center justify-center p-2 bg-black">
                                                <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/10">
                                                    <Image src={nft.image} alt={nft.name} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </div>

                                            {/* Decorative floating shapes */}
                                            <div className="absolute top-1/4 left-1/4 text-cyan-400 text-4xl font-bold opacity-60 rotate-12">~</div>
                                            <div className="absolute top-1/3 right-1/4 text-pink-400 text-4xl font-bold opacity-60 -rotate-12">x</div>
                                            <div className="absolute bottom-1/3 left-1/3 text-yellow-400 text-4xl font-bold opacity-60 rotate-45">o</div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="px-6 pb-8 pt-5 bg-[#0a0a0c] z-10 flex flex-col items-center border-t border-white/10">
                                            <h3 className={`text-2xl md:text-3xl font-tektur font-bold mb-2 ${nft.color}`}>{nft.name}</h3>

                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-gray-400 font-satoshi">Invest:</span>
                                                <span className={`text-xl md:text-2xl font-bold ${nft.color}`}>{nft.price}</span>
                                            </div>

                                            {isCenter && !isThisExpanded && (
                                                <MagicButton
                                                    onClick={(e: React.MouseEvent) => {
                                                        e.stopPropagation();
                                                        setExpandedId(nft.id);
                                                    }}
                                                    className="w-full h-[50px] rounded-xl border border-white/20 text-white font-tektur tracking-wide uppercase mb-2"
                                                >
                                                    See Benefits
                                                </MagicButton>
                                            )}

                                            {isThisExpanded && (
                                                <div className="w-full text-center animate-fadeIn">
                                                    <p className="text-gray-300 mb-4 font-satoshi">
                                                        Benefits revealed for {nft.name}!
                                                        <br />
                                                        (Placeholder for benefits content)
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Navigation arrows (visible only when not expanded) */}
                    {!isExpanded && (
                        <>
                            <button
                                onClick={() => setCenterIndex(prev => (prev - 1 + nfts.length) % nfts.length)}
                                className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all duration-300 backdrop-blur-sm"
                                aria-label="Previous card"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setCenterIndex(prev => (prev + 1) % nfts.length)}
                                className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all duration-300 backdrop-blur-sm"
                                aria-label="Next card"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Dot indicators */}
                    {!isExpanded && (
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                            {nfts.map((nft, index) => (
                                <button
                                    key={nft.id}
                                    onClick={() => setCenterIndex(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${getPosition(index) === "center"
                                            ? "bg-accent-cyan scale-125 shadow-[0_0_8px_rgba(0,255,255,0.5)]"
                                            : "bg-white/20 hover:bg-white/40"
                                        }`}
                                    aria-label={`Go to ${nft.name}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
