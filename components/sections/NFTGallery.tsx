"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

// Updated data with colors and invest amounts
const nfts = [
    {
        id: 3,
        name: "Lily",
        role: "Scout", // Keeping role if needed, or can remove
        image: "/Lily $50.jpg",
        price: "$50",
        color: "text-green-500",
        borderColor: "border-green-500",
        glowColor: "shadow-[0_0_30px_rgba(34,197,94,0.3)]",
        bgGradient: "from-green-900/20 to-black"
    },
    {
        id: 1,
        name: "Spica NFT",
        role: "Commander",
        image: "/Spica.png",
        price: "$150",
        color: "text-[#BF5AF2]",
        borderColor: "border-[#BF5AF2]",
        glowColor: "shadow-[0_0_30px_rgba(191,90,242,0.3)]",
        bgGradient: "from-[#BF5AF2]/20 to-black"
    },
    {
        id: 2,
        name: "Buffo NFT",
        role: "Tank",
        image: "/Buffo $100.jpg",
        price: "$100",
        color: "text-red-500",
        borderColor: "border-red-500",
        glowColor: "shadow-[0_0_30px_rgba(239,68,68,0.3)]",
        bgGradient: "from-red-900/20 to-black"
    },
];

export default function NFTGallery() {
    const [activeId, setActiveId] = useState<number | null>(null);

    return (
        <section id="portfolios" className="py-24 relative overflow-hidden bg-black">
            <div className="container mx-auto px-6">
                <h2 className="text-5xl font-tektur font-bold text-center mb-16">
                    Choose Your <span className="text-accent-cyan">Character</span>
                </h2>

                {/* Straight Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {nfts.map((nft, i) => {
                        return (
                            <div
                                key={nft.id}
                                className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 h-[500px] flex flex-col
                                ${nft.borderColor} ${nft.glowColor} bg-gray-900`}
                            >
                                {/* Decorative Corner Lines */}
                                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/30 z-20"></div>
                                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/30 z-20"></div>

                                {/* Image Area */}
                                <div className="relative flex-1 bg-gradient-to-b from-gray-800 to-black overflow-hidden group">
                                    {/* Placeholder for missing images - or use real image if available */}
                                    <div className={`absolute inset-0 bg-gradient-to-b ${nft.bgGradient} opacity-60`}></div>

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {/* We'll try to load the image, fallback to text */}
                                        <div className="relative w-full h-full">
                                            {/* Note: In a real scenario, use next/image with error handling. For now assuming paths might need adjustment or placeholders */}
                                            {/* <Image src={nft.image} alt={nft.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" /> */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className={`text-6xl font-tektur ${nft.color} opacity-50`}>{nft.name[0]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative floating shapes replication */}
                                    <div className="absolute top-1/4 left-1/4 text-cyan-400 text-4xl font-bold opacity-60 rotate-12">~</div>
                                    <div className="absolute top-1/3 right-1/4 text-pink-400 text-4xl font-bold opacity-60 -rotate-12">x</div>
                                    <div className="absolute bottom-1/3 left-1/3 text-yellow-400 text-4xl font-bold opacity-60 rotate-45">o</div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 bg-black z-10 flex flex-col items-center border-t border-white/10">
                                    <h3 className={`text-3xl font-tektur font-bold mb-2 ${nft.color}`}>{nft.name}</h3>

                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="text-gray-400 font-satoshi">Invest:</span>
                                        <span className={`text-2xl font-bold ${nft.color}`}>{nft.price}</span>
                                    </div>

                                    <button
                                        className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/5 transition-all text-white font-tektur tracking-wide uppercase hover:border-white/50"
                                    >
                                        See Benefits
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
