"use client";

import { useState } from "react";
import Image from "next/image";
import { useWallet } from "../providers/WalletProvider";
import WithdrawModal from "../ui/WithdrawModal";

export default function ReferralHero() {
    const { isConnected, openWalletModal } = useWallet();
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

    return (
        <div className="w-full max-w-[1110px] min-h-[423px] mx-auto">
            <div className="glass-card rounded-xl p-8 md:p-12 relative overflow-hidden z-10 h-full flex flex-col justify-center">
                {/* Header Content */}
                <div className="mb-24 relative z-10 w-full text-left">
                    <div className="w-full mb-4">
                        <h2 className="text-[32px] font-tektur font-medium tracking-[-1px] mb-0 text-white text-left">
                            Invite Your Friends And Earn <span className="text-white">20%</span>
                        </h2>
                    </div>
                    <p className="text-white font-satoshi font-medium text-[16px] max-w-2xl text-left">
                        Share the love, stack the rewards! Earn 10% of what your friend deposits and another 10% in SPICA when they invest $10+ in the pre-sale. Cash out anytime — no limits!
                    </p>
                </div>

                {/* Steps Content */}
                <div className="relative">
                    {/* Curved Connector Lines (Desktop) */}
                    <svg className="hidden md:block absolute top-[-50px] left-0 w-full h-[170px] pointer-events-none z-0" viewBox="0 0 800 170" preserveAspectRatio="none">
                        {/* Curve 1: Left to Middle - Top Right Origin */}
                        <path
                            d="M 155 65 Q 185 5 355 105"
                            fill="none"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="2"
                            strokeDasharray="2 4"
                        />
                        {/* Curve 2: Middle to Right */}
                        <path
                            d="M 425 65 Q 455 10 625 105"
                            fill="none"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="2"
                            strokeDasharray="2 4"
                        />
                    </svg>

                    <div className="grid grid-cols-3 gap-2 md:gap-8 relative z-10">
                        {/* Mobile Dotted Line Connecting Icons */}
                        <svg className="md:hidden absolute top-[4px] left-0 w-full h-[40px] -z-10 overflow-visible" viewBox="0 0 300 40" preserveAspectRatio="none">
                            {/* Curve 1: Step 1 to Step 2 */}
                            <path
                                d="M 78 20 Q 112 -10 125 20"
                                fill="none"
                                stroke="rgba(255,255,255,0.4)"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                            />
                            {/* Curve 2: Step 2 to Step 3 */}
                            <path
                                d="M 178 20 Q 212 -5 225 20"
                                fill="none"
                                stroke="rgba(255,255,255,0.4)"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                            />
                        </svg>
                        {/* Step 1 */}
                        <div className="flex flex-col items-center">
                            <div className="mb-4 relative">
                                <Image
                                    src="/assets/images/Share-Link.png"
                                    alt="Share Your Link"
                                    width={80}
                                    height={80}
                                    className="object-contain w-12 h-12 md:w-20 md:h-20"
                                />
                            </div>
                            <h3 className="text-blue-500 font-tektur font-medium mb-1 text-[10px] md:text-base text-center">Share Your Link</h3>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center">
                            <div className="mb-4 relative">
                                <Image
                                    src="/assets/images/Friend-Invest.png"
                                    alt="Friend Invests $10"
                                    width={80}
                                    height={80}
                                    className="object-contain w-12 h-12 md:w-20 md:h-20"
                                />
                            </div>
                            <h3 className="text-yellow-500 font-tektur font-medium mb-1 text-[10px] md:text-base text-center">Friend Invests $10</h3>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center">
                            <div className="mb-4 relative">
                                <Image
                                    src="/assets/images/Earn-Instantly.png"
                                    alt="You Earn Instantly"
                                    width={80}
                                    height={80}
                                    className="object-contain w-12 h-12 md:w-20 md:h-20"
                                />
                            </div>
                            <h3 className="text-green-500 font-tektur font-medium mb-1 text-[10px] md:text-base text-center">You Earn Instantly</h3>
                        </div>
                    </div>

                    {/* Connector Button or Dashboard */}
                    <div className="mt-12">
                        {!isConnected ? (
                            <div className="text-center">
                                <button onClick={openWalletModal} className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-full border border-accent-pink/50 bg-black text-accent-pink font-tektur text-sm hover:bg-white/5 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                                    <Image src="/assets/images/Ref-Connect.png" alt="" width={20} height={20} className="w-4 h-4" />
                                    <span>Connect your wallet to access the referral system</span>
                                    <Image src="/assets/images/Ref-Connect.png" alt="" width={20} height={20} className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-row items-center justify-center gap-2 md:gap-6">
                                {/* Button 1 */}
                                <div className="px-3 py-2 md:px-6 md:py-2.5 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
                                    <span className="text-white/80 font-tektur text-[10px] md:text-sm whitespace-nowrap">0.00 USDT</span>
                                </div>

                                {/* Button 2 with Icon */}
                                <div className="px-3 py-2 md:px-6 md:py-2.5 rounded-full border border-white/20 bg-white/5 flex items-center justify-center gap-1.5">
                                    <span className="text-white/80 font-tektur text-[10px] md:text-sm whitespace-nowrap">0.00 SPICA</span>
                                    <Image src="/assets/images/Ref-Connect.png" alt="icon" width={14} height={14} className="w-3 h-3 md:w-4 md:h-4" />
                                </div>

                                {/* Button 3: Withdraw */}
                                <button
                                    onClick={() => setIsWithdrawOpen(true)}
                                    // disabled // Enabled for now based on logic structure, or keep disabled if original code had it
                                    className="px-4 py-2 md:px-8 md:py-2.5 rounded-full bg-[#C243FE]/20 hover:bg-[#C243FE]/40 text-[#C243FE] border border-[#C243FE]/50 font-tektur font-medium cursor-pointer text-[10px] md:text-base whitespace-nowrap transition-all"
                                >
                                    Withdraw Reward
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <WithdrawModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} />
        </div>
    );
}
