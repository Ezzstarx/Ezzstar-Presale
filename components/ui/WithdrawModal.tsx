"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MagicButton from "./MagicButton";

interface WithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const tokens = [
    { id: "usdc", name: "USDC", balance: "0.000", icon: "/assets/icons/crypto/icon-usdc.png" },
    { id: "bnb", name: "BNB", balance: "0.000", icon: "/assets/icons/crypto/icon-bnb.png" },
    { id: "usdt", name: "USDT", balance: "0.000", icon: "/assets/icons/crypto/icon-usdt.png" },
    { id: "dai", name: "DAI", balance: "0.000", icon: "/assets/icons/crypto/icon-dai.png" },
    { id: "spca", name: "SPCA", balance: "0.000", icon: "/assets/icons/crypto/icon-spca.png" },
];

export default function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
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
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-[300px] bg-black border border-white/20 rounded-2xl p-4 shadow-2xl max-h-[85vh] flex flex-col my-auto"
                    >
                        {/* Header */}
                        <div className="flex flex-col items-center mb-3 relative shrink-0">
                            <button
                                onClick={onClose}
                                className="absolute right-0 -top-1 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                            <h2 className="text-xl font-tektur font-bold text-white mb-1">Withdrawal</h2>
                            <p className="text-gray-400 text-[10px] font-tektur">Take Rewards from your Referrals</p>
                        </div>

                        {/* Token List */}
                        <div className="space-y-2 mb-4 overflow-y-auto min-h-0 pr-1 custom-scrollbar">
                            {tokens.map((token) => (
                                <div
                                    key={token.id}
                                    className="flex items-center justify-between p-2 rounded-lg border border-white/20 bg-black hover:border-white/40 transition-colors shrink-0"
                                >
                                    <div className="flex items-center gap-2">
                                        <Image src={token.icon} alt={token.name} width={20} height={20} className="w-5 h-5 object-contain" />
                                        <span className="font-tektur font-bold text-white text-xs">{token.name}</span>
                                    </div>
                                    <span className="font-satoshi font-bold text-white tracking-wider text-xs">{token.balance}</span>
                                </div>
                            ))}
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex items-center justify-end gap-2 mt-auto shrink-0">
                            <MagicButton
                                onClick={onClose}
                                className="px-4 h-[28px] rounded-md text-[10px] font-tektur bg-black border-[0.5px] border-white/20 text-white/70 hover:text-white"
                            >
                                Cancel
                            </MagicButton>
                            <MagicButton
                                style={{ '--mask-bg': '#96428E' } as React.CSSProperties}
                                className="px-4 h-[28px] rounded-md text-[10px] font-tektur border-[0.5px] border-white/20 text-white font-bold"
                            >
                                Claim
                            </MagicButton>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
