"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "../providers/WalletProvider";

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const wallets = [
    { name: "Metamask", color: "from-orange-400 to-orange-600", icon: "/assets/images/Metamask.png" },
    { name: "Binance Web3", color: "from-yellow-400 to-yellow-600", icon: "/assets/images/Binance.png" },
    { name: "Trust Wallet", color: "from-blue-400 to-blue-600", icon: "/assets/images/Trust.png" },
    { name: "OKX Wallet", color: "from-gray-100 to-gray-400 text-black", icon: "/assets/images/OKX.png" },
    { name: "Coinbase", color: "from-blue-500 to-blue-700", icon: "/assets/images/Coinbase.png" },
    { name: "WalletConnect", color: "from-blue-400 to-blue-500", icon: "/assets/images/WalletConnect.png" },
];

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
    const { connectWallet } = useWallet();
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-[95vw] md:max-w-3xl bg-[#09090F] border border-white/10 rounded-2xl p-5 shadow-2xl my-auto"
                    >

                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg md:text-xl font-tektur font-bold text-white">Connect Wallet</h2>
                            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <p className="text-gray-400 text-xs md:text-sm mb-5 font-satoshi">
                            Start by connecting with one of the wallets below. Be sure to store your private keys securely.
                        </p>

                        {/* Horizontal Scroll Container */}
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                            {wallets.map((wallet) => (
                                <button
                                    key={wallet.name}
                                    onClick={() => {
                                        connectWallet();
                                        onClose();
                                    }}
                                    className="flex-shrink-0 snap-start w-[100px] md:w-[120px] flex flex-col items-center justify-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl transition-all group"
                                >
                                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
                                        <Image
                                            src={wallet.icon}
                                            alt={wallet.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="text-[10px] md:text-xs font-tektur text-gray-300 group-hover:text-white text-center leading-tight h-8 flex items-center justify-center">{wallet.name}</span>
                                </button>
                            ))}
                            <button
                                className="flex-shrink-0 snap-start w-[100px] md:w-[120px] flex flex-col items-center justify-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl transition-all group"
                            >
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <div className="flex gap-0.5">
                                        <div className="w-1 h-1 bg-black rounded-full"></div>
                                        <div className="w-1 h-1 bg-black rounded-full"></div>
                                        <div className="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                </div>
                                <span className="text-[10px] md:text-xs font-tektur text-gray-300 group-hover:text-white text-center leading-tight h-8 flex items-center justify-center">More</span>
                            </button>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full py-2.5 mt-2 border border-white/10 hover:bg-white/5 rounded-xl font-tektur text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            Cancel
                        </button>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
