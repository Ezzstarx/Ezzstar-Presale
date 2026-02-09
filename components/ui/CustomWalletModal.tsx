"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useConnect } from "wagmi";
import MagicButton from "./MagicButton";

interface CustomWalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WALLETS = [
    { id: "metaMask", name: "Metamask\nWallet", icon: "/assets/icons/wallets/MetaMask-Wallet.png" },
    { id: "binanceWeb3Wallet", name: "Binance\nWeb3", icon: "/assets/icons/wallets/Binance-Web3.png" },
    { id: "trust", name: "Trust\nWallet", icon: "/assets/icons/wallets/Trust-Wallet.png" },
    { id: "okx", name: "OKX\nWallet", icon: "/assets/icons/wallets/OKX-Wallet.png" },
    { id: "coinbase", name: "Coinbase\nWallet", icon: "/assets/icons/wallets/Coinbase-Wallet.png" },
    { id: "walletConnect", name: "Wallet\nConnect", icon: "/assets/icons/wallets/Wallet-Connect.png" },
    { id: "more", name: "More", icon: "/assets/icons/wallets/more.png" },
];

export default function CustomWalletModal({ isOpen, onClose }: CustomWalletModalProps) {
    const { connectors, connect } = useConnect();

    const handleConnect = (walletId: string) => {
        if (walletId === "more") {
            onClose();
            return;
        }

        const connector = connectors.find(c =>
            c.id.toLowerCase().includes(walletId.toLowerCase()) ||
            c.name.toLowerCase().includes(walletId.toLowerCase())
        );

        if (connector) {
            connect({ connector });
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Invisible Backdrop to close on click outside */}
                    <div
                        className="fixed inset-0 z-[90] bg-transparent"
                        onClick={onClose}
                    />

                    {/* Modal positioned absolutely to the right */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-24 right-6 md:right-24 z-[100] w-auto max-w-[650px] bg-[#0a0a0c] border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Content */}
                        <div className="p-4 md:p-5">
                            <h2 className="text-xl md:text-2xl font-satoshi font-medium text-white mb-1">
                                Connect Wallet
                            </h2>
                            <p className="text-gray-400 text-xs md:text-sm mb-4 max-w-lg">
                                Start by Connecting with one of the wallets bellow. Be sure to store your private keys or seed phrase securely.
                            </p>

                            {/* Wallet Grid - No Scrollbar */}
                            <div className="flex flex-nowrap gap-4 mb-2 overflow-x-auto pb-0 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                <style jsx>{`
                                    div::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}</style>
                                {WALLETS.map((wallet) => (
                                    <button
                                        key={wallet.id}
                                        onClick={() => handleConnect(wallet.id)}
                                        className="flex flex-col items-center gap-2 p-1 rounded-xl transition-transform hover:scale-105 min-w-[70px]"
                                    >
                                        <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                                            <Image
                                                src={wallet.icon}
                                                alt={wallet.name}
                                                width={wallet.id === 'metaMask' ? 64 : 56} // Bigger for MetaMask
                                                height={wallet.id === 'metaMask' ? 64 : 56}
                                                className={`object-contain ${wallet.id === 'metaMask' ? 'scale-125' : ''}`} // Extra scale for MetaMask
                                            />
                                        </div>
                                        <span className="text-[10px] md:text-xs text-gray-300 font-tektur text-center leading-tight whitespace-pre-line">
                                            {wallet.name}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <a
                                    href="#"
                                    className="text-accent-pink text-xs hover:text-accent-pink/80 transition-colors"
                                >
                                    Learn How to Connect
                                </a>
                                <div className="flex gap-3">
                                    <MagicButton
                                        onClick={onClose}
                                        className="w-[100px] h-[34px] rounded-md shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-md text-[16px] font-medium font-tektur bg-black border-[0.5px] border-white/30 text-[#888888] hover:text-white"
                                    >
                                        Cancel
                                    </MagicButton>
                                    <MagicButton
                                        style={{ '--mask-bg': '#2C2C2C' } as React.CSSProperties}
                                        className="w-[140px] h-[34px] rounded-md shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-md text-[16px] font-medium font-tektur bg-[#2C2C2C] border-[0.5px] border-white/30 text-[#888888] hover:text-white"
                                    >
                                        Connect Wallet
                                    </MagicButton>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
