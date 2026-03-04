"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Partner Data
const partners = [
    { name: "BNB Chain", role: "Blockchain", link: "#", image: "/assets/images/partners/bnb-chain.png" },
    { name: "IQ.Wiki", role: "Encyclopedia", link: "https://iq.wiki/wiki/ezzstar", image: "/assets/images/partners/iq-wiki.png" },
    { name: "Collably Network", role: "Social", link: "https://x.com/CollablyNetwork/status/2019274063739564236?s=20", image: "/assets/images/partners/collably-network.png" },
    { name: "AWS", role: "Cloud", link: "#", image: "/assets/images/partners/aws.png" },
    { name: "GCB", role: "Gaming", link: "https://www.youtube.com/@greatchampionsbattle", image: "/assets/images/partners/gcb.png" },
];

export default function Partners() {
    // Infinite Loop Logic
    // We triplicate the list: [Buffer-Left] [Main-Center] [Buffer-Right]
    // Start view at the beginning of [Main-Center]
    const extendedPartners = [...partners, ...partners, ...partners];
    const totalOriginal = partners.length;

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
                    const mobileGap = 12;
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
    useEffect(() => {
        if (!isTransitioning) return;

        const timeout = setTimeout(() => {
            setIsTransitioning(false);

            // If we reached the end of the second set, jump back to start of second set
            if (currentIndex >= totalOriginal * 2) {
                setCurrentIndex(totalOriginal);
            }
            // If we reached the start of the first set, jump to end of second set
            else if (currentIndex < totalOriginal) {
                setCurrentIndex(totalOriginal * 2 - 1);
            }
        }, 500); // Match CSS transition duration

        return () => clearTimeout(timeout);
    }, [currentIndex, isTransitioning, totalOriginal]);

    return (
        <section id="partners" className="pb-12 relative overflow-hidden bg-[url('/assets/images/background-main.png')] bg-cover bg-center">
            <div className="relative z-10 w-full">
                <div className="w-full max-w-[1440px] h-auto min-h-[60px] sm:min-h-[80px] md:h-[119px] mx-auto bg-transparent relative flex items-center justify-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-[55px] font-tektur font-medium tracking-[-0.5px] md:tracking-[-1px] text-center mb-0 text-white">
                        Our <span className="text-[#00ffcc] text-shadow-glow">Partners</span>
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
                            {extendedPartners.map((partner, idx) => (
                                <div
                                    key={idx}
                                    className="flex-shrink-0"
                                    style={{ width: cardWidth }}
                                >
                                    <a
                                        href={partner.link}
                                        target={partner.link !== "#" ? "_blank" : undefined}
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
                                                <div className="relative aspect-square w-full cursor-pointer flex items-center justify-center p-8">
                                                    <NextImage
                                                        src={partner.image}
                                                        alt={partner.name}
                                                        fill
                                                        className="object-contain p-6"
                                                    />
                                                    <div className="absolute inset-0 bg-transparent opacity-20 mix-blend-overlay pointer-events-none"></div>
                                                </div>
                                                <div className="p-4 flex flex-col justify-end flex-grow bg-transparent">
                                                    <h3 className="text-xl font-tektur font-medium text-white mb-1">
                                                        {partner.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_8px_#39FF14]"></div>
                                                        <p className="text-[#39FF14] font-tektur font-medium tracking-wide text-xs">
                                                            {partner.role}
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
                        aria-label="Previous partner"
                    >
                        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={isTransitioning}
                        className="absolute right-1 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-16 z-20 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#00ffcc] to-purple-600 text-black font-bold text-xl hover:shadow-[0_0_20px_#00ffcc] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next partner"
                    >
                        <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}
