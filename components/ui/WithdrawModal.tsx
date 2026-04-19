"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MagicButton from "./MagicButton";
import TransactionModal from "./TransactionModal";
import { useWeb3Presale, useReferralData } from "@/hooks/useWeb3Presale";
import { useWallet } from "../providers/WalletProvider";
import { formatUnits } from "viem";

interface WithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
    const { address } = useWallet();
    const { withdrawRewards } = useWeb3Presale();
    const { data: refData, refetch } = useReferralData(address);

    const [isWithdrawing, setIsWithdrawing] = useState(false);

    // Transaction modal state
    const [txModalOpen, setTxModalOpen] = useState(false);
    const [txModalStatus, setTxModalStatus] = useState<"success" | "error" | "loading">("loading");
    const [txModalTitle, setTxModalTitle] = useState("");
    const [txModalMessage, setTxModalMessage] = useState("");
    const [txModalHash, setTxModalHash] = useState<string | undefined>(undefined);

    // Parse referral balances
    const spicaRaw = refData?.[0]?.result as bigint | undefined;
    const bnbRaw = refData?.[1]?.result as bigint | undefined;
    const usdtRaw = refData?.[2]?.result as bigint | undefined;
    const usdcRaw = refData?.[3]?.result as bigint | undefined;
    const daiRaw = refData?.[4]?.result as bigint | undefined;

    const tokens = [
        {
            id: "spca",
            name: "SPCA",
            balance: spicaRaw ? parseFloat(formatUnits(spicaRaw, 18)).toFixed(4) : "0.0000",
            icon: "/assets/icons/crypto/icon-spca.png",
        },
        {
            id: "bnb",
            name: "BNB",
            balance: bnbRaw ? parseFloat(formatUnits(bnbRaw, 18)).toFixed(6) : "0.000000",
            icon: "/assets/icons/crypto/icon-bnb.png",
        },
        {
            id: "usdt",
            name: "USDT",
            balance: usdtRaw ? parseFloat(formatUnits(usdtRaw, 18)).toFixed(4) : "0.0000",
            icon: "/assets/icons/crypto/icon-usdt.png",
        },
        {
            id: "usdc",
            name: "USDC",
            balance: usdcRaw ? parseFloat(formatUnits(usdcRaw, 18)).toFixed(4) : "0.0000",
            icon: "/assets/icons/crypto/icon-usdc.png",
        },
        {
            id: "dai",
            name: "DAI",
            balance: daiRaw ? parseFloat(formatUnits(daiRaw, 18)).toFixed(4) : "0.0000",
            icon: "/assets/icons/crypto/icon-dai.png",
        },
    ];

    const hasRewards = tokens.some((t) => parseFloat(t.balance) > 0);

    const handleWithdraw = async () => {
        setIsWithdrawing(true);
        setTxModalStatus("loading");
        setTxModalTitle("Withdrawing Rewards");
        setTxModalMessage("Please confirm the transaction in your wallet...");
        setTxModalHash(undefined);
        setTxModalOpen(true);
        try {
            const txHash = await withdrawRewards();
            setTxModalStatus("success");
            setTxModalTitle("Rewards Withdrawn!");
            setTxModalMessage("Your referral rewards have been successfully sent to your wallet.");
            if (txHash) setTxModalHash(txHash as string);
            refetch(); // Refresh balances
        } catch (error: any) {
            console.error(error);
            setTxModalStatus("error");
            setTxModalTitle("Withdrawal Failed");
            const reason = error?.shortMessage || error?.message || "Unknown error";
            setTxModalMessage(reason.length > 120 ? reason.slice(0, 120) + "..." : reason);
        } finally {
            setIsWithdrawing(false);
        }
    };

    return (
        <>
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
                            className="relative w-full max-w-[320px] rounded-2xl p-[1px] shadow-2xl max-h-[85vh] flex flex-col my-auto"
                            style={{
                                background: `linear-gradient(135deg, rgba(222,59,214,0.4), rgba(62,225,240,0.3), rgba(222,59,214,0.2))`,
                            }}
                        >
                            <div className="relative w-full bg-[#0a0a0f] rounded-2xl p-4 flex flex-col overflow-hidden"
                                style={{
                                    boxShadow: `0 0 40px rgba(222,59,214,0.15), 0 0 80px rgba(62,225,240,0.1)`,
                                }}
                            >
                                {/* Background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#DE3BD6]/5 to-[#3EE1F0]/5 pointer-events-none" />

                                {/* Header */}
                                <div className="flex flex-col items-center mb-4 relative shrink-0 z-10">
                                    <button
                                        onClick={onClose}
                                        className="absolute right-0 -top-1 text-gray-500 hover:text-white transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                    <h2 className="text-xl font-tektur font-bold text-white mb-1">Referral Rewards</h2>
                                    <p className="text-gray-400 text-[10px] font-tektur">Your earned rewards from referrals</p>
                                </div>

                                {/* Token List */}
                                <div className="space-y-2 mb-4 overflow-y-auto min-h-0 pr-1 custom-scrollbar relative z-10">
                                    {tokens.map((token) => (
                                        <div
                                            key={token.id}
                                            className="flex items-center justify-between p-2.5 rounded-lg border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200 shrink-0"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <Image src={token.icon} alt={token.name} width={22} height={22} className="w-[22px] h-[22px] object-contain" />
                                                <span className="font-tektur font-bold text-white text-xs">{token.name}</span>
                                            </div>
                                            <span className={`font-satoshi font-bold tracking-wider text-xs ${parseFloat(token.balance) > 0 ? "text-[#3EE1F0]" : "text-white/40"}`}>
                                                {token.balance}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer Buttons */}
                                <div className="flex items-center justify-end gap-2 mt-auto shrink-0 relative z-10">
                                    <MagicButton
                                        onClick={onClose}
                                        className="px-4 h-[30px] rounded-md text-[10px] font-tektur bg-black border-[0.5px] border-white/20 text-white/70 hover:text-white"
                                    >
                                        Cancel
                                    </MagicButton>
                                    <MagicButton
                                        onClick={handleWithdraw}
                                        disabled={isWithdrawing || !hasRewards}
                                        style={{ '--mask-bg': '#96428E' } as React.CSSProperties}
                                        className={`px-4 h-[30px] rounded-md text-[10px] font-tektur border-[0.5px] border-white/20 text-white font-bold transition-all ${!hasRewards ? "opacity-40 cursor-not-allowed" : "hover:brightness-125"}`}
                                    >
                                        {isWithdrawing ? (
                                            <span className="inline-flex items-center gap-1">
                                                <Loader2 size={12} className="animate-spin" /> Withdrawing...
                                            </span>
                                        ) : (
                                            "Withdraw All"
                                        )}
                                    </MagicButton>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Transaction Result Modal */}
            <TransactionModal
                isOpen={txModalOpen}
                onClose={() => setTxModalOpen(false)}
                status={txModalStatus}
                title={txModalTitle}
                message={txModalMessage}
                txHash={txModalHash}
            />
        </>
    );
}
