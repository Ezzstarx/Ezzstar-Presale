"use client";

import { X, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagicButton from "./MagicButton";

type ModalStatus = "success" | "error" | "loading";

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    status: ModalStatus;
    title?: string;
    message?: string;
    txHash?: string;
}

export default function TransactionModal({
    isOpen,
    onClose,
    status,
    title,
    message,
    txHash,
}: TransactionModalProps) {
    const statusConfig = {
        success: {
            icon: <CheckCircle2 size={48} className="text-[#3EE1F0] drop-shadow-[0_0_15px_rgba(62,225,240,0.6)]" />,
            defaultTitle: "Transaction Successful!",
            defaultMessage: "Your purchase has been confirmed on the blockchain.",
            gradient: "from-[#3EE1F0]/20 to-[#DE3BD6]/10",
            borderColor: "border-[#3EE1F0]/30",
            glowColor: "rgba(62,225,240,0.3)",
        },
        error: {
            icon: <XCircle size={48} className="text-[#FF4444] drop-shadow-[0_0_15px_rgba(255,68,68,0.6)]" />,
            defaultTitle: "Transaction Failed",
            defaultMessage: "Something went wrong. Please try again.",
            gradient: "from-[#FF4444]/20 to-[#DE3BD6]/10",
            borderColor: "border-[#FF4444]/30",
            glowColor: "rgba(255,68,68,0.3)",
        },
        loading: {
            icon: <Loader2 size={48} className="text-[#DE3BD6] animate-spin drop-shadow-[0_0_15px_rgba(222,59,214,0.6)]" />,
            defaultTitle: "Processing...",
            defaultMessage: "Please wait while your transaction is being confirmed.",
            gradient: "from-[#DE3BD6]/20 to-[#3EE1F0]/10",
            borderColor: "border-[#DE3BD6]/30",
            glowColor: "rgba(222,59,214,0.3)",
        },
    };

    const config = statusConfig[status];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/85 backdrop-blur-md"
                        onClick={status !== "loading" ? onClose : undefined}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 30 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className={`relative w-full max-w-[340px] rounded-2xl p-[1px] shadow-2xl`}
                        style={{
                            background: `linear-gradient(135deg, rgba(62,225,240,0.4), rgba(222,59,214,0.4), rgba(62,225,240,0.2))`,
                        }}
                    >
                        <div
                            className={`relative w-full bg-[#0a0a0f] rounded-2xl p-6 overflow-hidden`}
                            style={{
                                boxShadow: `0 0 60px ${config.glowColor}, 0 0 120px ${config.glowColor}`,
                            }}
                        >
                            {/* Background gradient effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-50 pointer-events-none`} />

                            {/* Animated particles/dots background */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 rounded-full bg-white/20"
                                        style={{
                                            left: `${15 + i * 15}%`,
                                            top: `${20 + (i % 3) * 25}%`,
                                        }}
                                        animate={{
                                            opacity: [0.1, 0.4, 0.1],
                                            scale: [1, 1.5, 1],
                                        }}
                                        transition={{
                                            duration: 2 + i * 0.3,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Close Button */}
                            {status !== "loading" && (
                                <button
                                    onClick={onClose}
                                    className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors z-20"
                                >
                                    <X size={18} />
                                </button>
                            )}

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                {/* Icon with pulse ring */}
                                <div className="relative">
                                    {status === "success" && (
                                        <motion.div
                                            className="absolute inset-[-8px] rounded-full border border-[#3EE1F0]/30"
                                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    )}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                                    >
                                        {config.icon}
                                    </motion.div>
                                </div>

                                {/* Title */}
                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="text-xl font-tektur font-bold text-white"
                                >
                                    {title || config.defaultTitle}
                                </motion.h3>

                                {/* Message */}
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-sm text-gray-400 font-satoshi leading-relaxed max-w-[280px]"
                                >
                                    {message || config.defaultMessage}
                                </motion.p>

                                {/* Transaction Hash */}
                                {txHash && status === "success" && (
                                    <motion.a
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        href={`https://testnet.bscscan.com/tx/${txHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[11px] text-[#3EE1F0]/70 hover:text-[#3EE1F0] font-mono transition-colors underline underline-offset-2"
                                    >
                                        View on BscScan ↗
                                    </motion.a>
                                )}

                                {/* OK Button */}
                                {status !== "loading" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25 }}
                                        className="w-full mt-2"
                                    >
                                        <MagicButton
                                            onClick={onClose}
                                            style={{ '--mask-bg': '#0a0a0f' } as React.CSSProperties}
                                            className={`w-full py-2.5 rounded-xl font-tektur text-sm font-bold tracking-wider border-[0.5px] ${config.borderColor} transition-all hover:brightness-125 ${status === "success"
                                                ? "bg-[#3EE1F0]/10 text-[#3EE1F0]"
                                                : "bg-[#FF4444]/10 text-[#FF4444]"
                                                }`}
                                        >
                                            OK
                                        </MagicButton>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
