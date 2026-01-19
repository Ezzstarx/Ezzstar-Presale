"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface WithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const tokens = [
    { id: "usdc", name: "USDC", balance: "0.000", color: "bg-blue-500", iconText: "$" },
    { id: "bnb", name: "BNB", balance: "0.000", color: "bg-yellow-500", icon: "/assets/images/Binance.png" },
    { id: "sol", name: "SOL", balance: "0.000", color: "bg-teal-500", iconText: "S" },
    { id: "usdt", name: "USDT", balance: "0.000", color: "bg-green-500", iconText: "T" },
    { id: "dai", name: "DAI", balance: "0.000", color: "bg-orange-500", iconText: "D" },
    { id: "eth", name: "ETH", balance: "0.000", color: "bg-gray-600", iconText: "E" },
    { id: "spca", name: "SPCA", balance: "0.000", color: "bg-[#FF00FF]", icon: "/assets/images/SpicaBadge.png" },
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
                        className="relative w-full max-w-[340px] bg-[#09090F] border border-white/10 rounded-2xl p-5 shadow-2xl max-h-[85vh] flex flex-col my-auto"
                    >
                        {/* Header */}
                        <div className="flex flex-col items-center mb-4 relative shrink-0">
                            <button
                                onClick={onClose}
                                className="absolute right-0 top-0 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-tektur font-bold text-white mb-1">Withdrawal</h2>
                            <p className="text-gray-400 text-xs font-satoshi">Take Rewards from your Referrals</p>
                        </div>

                        {/* Token List */}
                        <div className="space-y-3 mb-4 overflow-y-auto min-h-0 pr-1 custom-scrollbar">
                            {tokens.map((token) => (
                                <div
                                    key={token.id}
                                    className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors shrink-0"
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Icon */}
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${token.color} bg-opacity-20`}>
                                            {token.icon ? (
                                                <Image src={token.icon} alt={token.name} width={32} height={32} className="object-cover" />
                                            ) : (
                                                <span className="font-tektur font-bold text-white text-sm">{token.iconText}</span>
                                            )}
                                        </div>
                                        <span className="font-tektur font-bold text-white uppercase">{token.name}</span>
                                    </div>
                                    <span className="font-tektur font-bold text-white tracking-wider">{token.balance}</span>
                                </div>
                            ))}
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex items-center gap-4 mt-auto shrink-0">
                            <button
                                onClick={onClose}
                                className="flex-1 py-2.5 border border-white/20 rounded-xl font-tektur text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 py-2.5 rounded-xl font-tektur text-white font-bold text-sm bg-gradient-to-r from-[#D659E4] to-[#9F40D6] shadow-[0_0_15px_rgba(214,89,228,0.4)] hover:shadow-[0_0_20px_rgba(214,89,228,0.6)] hover:brightness-110 transition-all border border-white/10"
                            >
                                Claim
                            </button>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
