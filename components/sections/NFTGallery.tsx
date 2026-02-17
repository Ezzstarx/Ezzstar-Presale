import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import MagicButton from "@/components/ui/MagicButton";
import { X } from "lucide-react";

// Updated data with colors and invest amounts
const nfts = [
    {
        id: 3,
        name: "Lily",
        role: "Scout", // Keeping role if needed, or can remove
        image: "/assets/images/Lily.jpg",
        price: "$50",
        color: "text-green-500",
        // borderColor: "border-green-500", // Removed literal border class
        borderGradient: "linear-gradient(to bottom, rgb(34,197,94) 0%, rgb(34,197,94) 30%, rgb(17,99,47) 50%, black 100%)", // Fades from 30%
        bgGradient: "from-green-900/20 to-black"
    },
    {
        id: 1,
        name: "Spica NFT",
        role: "Commander",
        image: "/assets/images/Spica.jpg",
        price: "$150",
        color: "text-[#BF5AF2]",
        // borderColor: "border-[#BF5AF2]",
        borderGradient: "linear-gradient(to bottom, rgb(191,90,242) 0%, rgb(191,90,242) 60%, rgb(96,45,121) 80%, black 100%)", // Fades from 60%
        bgGradient: "from-[#BF5AF2]/20 to-black"
    },
    {
        id: 2,
        name: "Buffo NFT",
        role: "Tank",
        image: "/assets/images/Buffo.jpg",
        price: "$100",
        color: "text-red-500",
        // borderColor: "border-red-500",
        borderGradient: "linear-gradient(to bottom, rgb(239,68,68) 0%, rgb(239,68,68) 85%, rgb(120,34,34) 92%, black 100%)", // Fades from 85%
        bgGradient: "from-red-900/20 to-black"
    },
];

export default function NFTGallery() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // Helper to find index for direction calculation
    const getSelectedIndex = () => nfts.findIndex(n => n.id === selectedId);

    return (
        <section id="portfolios" className="py-24 relative overflow-hidden bg-transparent min-h-[800px]">
            <div className="container mx-auto px-6">
                <h2 className="text-5xl font-tektur font-bold text-center mb-16">
                    Choose Your <span className="text-accent-cyan">Character</span>
                </h2>

                {/* Grid container with AnimatePresence */}
                <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start min-h-[600px] gap-6 lg:gap-0">
                    <AnimatePresence mode="popLayout">
                        {nfts.map((nft, index) => {
                            const isSelected = selectedId === nft.id;
                            const selectedIndex = getSelectedIndex();

                            // If something is selected and it's not this one, verify if we should show it
                            // Actually we want to removing non-selected items from the DOM so they exit
                            if (selectedId !== null && !isSelected) {
                                return null;
                            }

                            return (
                                <motion.div
                                    key={nft.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8, x: 0 }}
                                    animate={{
                                        opacity: 1,
                                        scale: isSelected ? 1.05 : 1,
                                        x: 0,
                                        zIndex: isSelected ? 50 : 1,
                                        // On mobile (stacked), width is always 100%. On desktop, it's 33% or 100%
                                        width: isSelected ? "100%" : "100%",
                                    }}
                                    // Use style for desktop media query overrides or classNames
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8,
                                        x: selectedIndex !== -1 && index < selectedIndex ? -1000 : 1000,
                                        transition: { duration: 0.5, ease: "easeInOut" }
                                    }}
                                    transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                                    className={`relative rounded-2xl p-[2px] transition-shadow duration-300 w-full max-w-md lg:max-w-none ${isSelected ? 'mx-auto' : 'mx-0 lg:mx-4'} 
                                        ${!isSelected && 'hover:-translate-y-2'} h-full min-h-[500px] lg:min-h-[580px] lg:w-[33%] ${isSelected ? 'lg:w-full' : ''}`}
                                    style={{
                                        background: nft.borderGradient,
                                    }}
                                >
                                    {/* Inner Card Content */}
                                    <div className="relative h-full w-full bg-[#0a0a0c] rounded-2xl overflow-hidden flex flex-col">

                                        {/* Back Button if selected */}
                                        {isSelected && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedId(null);
                                                }}
                                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white border border-white/20 transition-colors"
                                            >
                                                <X size={24} />
                                            </button>
                                        )}

                                        {/* Decorative Corner Lines inside the actual card */}
                                        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/30 z-20"></div>
                                        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/30 z-20"></div>

                                        {/* Image Area */}
                                        <div className="relative flex-1 bg-gradient-to-b from-gray-800 to-black overflow-hidden group">
                                            {/* Placeholder */}
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
                                        <div className="px-6 pb-12 pt-6 bg-[#0a0a0c] z-10 flex flex-col items-center border-t border-white/10">
                                            <h3 className={`text-3xl font-tektur font-bold mb-2 ${nft.color}`}>{nft.name}</h3>

                                            <div className="flex items-center gap-2 mb-6">
                                                <span className="text-gray-400 font-satoshi">Invest:</span>
                                                <span className={`text-2xl font-bold ${nft.color}`}>{nft.price}</span>
                                            </div>

                                            {!isSelected ? (
                                                <MagicButton
                                                    onClick={() => setSelectedId(nft.id)}
                                                    className="w-full h-[54px] rounded-xl border border-white/20 text-white font-tektur tracking-wide uppercase mb-4"
                                                >
                                                    See Benefits
                                                </MagicButton>
                                            ) : (
                                                <div className="w-full text-center animate-fadeIn">
                                                    <p className="text-gray-300 mb-4 font-satoshi">
                                                        Benefits revealed for {nft.name}!
                                                        <br />
                                                        (Placeholder for benefits content)
                                                    </p>
                                                    {/* You can put more detailed content here */}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
