"use client";

import { useState } from "react";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Send, MessageCircle, Twitter } from "lucide-react";
import { useWallet } from "../providers/WalletProvider";
import WithdrawModal from "../ui/WithdrawModal";

export default function Referral() {
    const { isConnected, address, openWalletModal } = useWallet();
    const [copied, setCopied] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

    const handleCopy = () => {
        const link = `https://ezzstar.space/?ref=${address ? address.slice(0, 10) : '0878871527'}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (

        <section className="py-24 relative bg-transparent overflow-hidden text-white">
            <div className="container mx-auto px-6 space-y-12">

                {/* Top Section: Header & Steps Combined */}
                <div className="max-w-4xl mx-auto">
                    <div className="glass-card rounded-xl p-8 md:p-12 relative overflow-hidden z-10">
                        {/* Header Content */}
                        <div className="mb-24 relative z-10">
                            <div className="w-full max-w-[1440px] h-[119px] mx-auto bg-transparent relative flex items-center justify-center mb-4">
                                <h2 className="text-[55px] font-tektur font-medium tracking-[-1px] mb-0">
                                    Invite Your Friends And Earn <span className="text-accent-cyan">20%</span>
                                </h2>
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-black via-[#FF00FF] to-black"></div>
                            </div>
                            <p className="text-gray-400 font-satoshi max-w-2xl text-sm">
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
                                            disabled
                                            className="px-4 py-2 md:px-8 md:py-2.5 rounded-full bg-gray-600/50 text-white/40 font-tektur font-medium cursor-not-allowed text-[10px] md:text-base whitespace-nowrap"
                                        >
                                            Withdraw Reward
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Interface Split (Standalone Cards) */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-5 gap-8">
                        {/* Link Box */}
                        <div className="glass-card rounded-xl p-8 bg-black/40 border border-white/10 md:col-span-3">
                            <h4 className="text-accent-pink font-tektur font-medium mb-4">Share the referral link</h4>
                            <p className="text-xs text-gray-500 mb-4">Share your referral link by copying and sending it to your friends or sharing it on social media.</p>

                            <div className="flex bg-black/60 border border-white/10 rounded-lg p-1.5 mb-6">
                                {!isConnected ? (
                                    <>
                                        <input type="text" value="Connect your wallet first" readOnly className="bg-transparent flex-1 px-3 text-sm text-gray-500 focus:outline-none" />
                                        <button onClick={openWalletModal} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-white text-xs font-medium transition-colors">
                                            Connect Wallet
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="text"
                                            value={`https://ezzstar.space/?ref=${address ? address.slice(0, 10) : '0878871527'}`}
                                            readOnly
                                            className="bg-transparent flex-1 px-3 text-sm text-gray-300 focus:outline-none font-mono"
                                        />
                                        <button
                                            onClick={handleCopy}
                                            className="px-6 py-2 bg-black border border-white/20 rounded-md text-white/80 hover:text-white text-xs font-tektur uppercase tracking-wider hover:border-white/50 transition-all shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                                        >
                                            {copied ? "Copied!" : "Copy"}
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Social Icons */}
                            <div>
                                <p className="text-sm text-gray-400 mb-3">Invite via:</p>
                                <div className="flex gap-4 text-gray-400">
                                    <MessageCircle className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                                    <Send className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                                    <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                                    <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                                    <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                                    <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Stats Box */}
                        <div className="glass-card rounded-xl p-8 bg-black/40 border border-white/10 md:col-span-2">
                            <div className="text-center mb-6">
                                {/* Ref-referred Icon */}
                                <div className="flex justify-center mb-2">
                                    <Image src="/assets/images/Ref-referred.png" alt="Referred" width={32} height={32} className="object-contain" />
                                </div>
                                <h4 className="inline-flex items-center gap-2 text-2xl font-tektur font-medium">
                                    Referred <span className="text-yellow-500">(03)</span>
                                </h4>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-accent-cyan font-medium border-b border-white/5 pb-2">
                                    <span>Address</span>
                                    <span>Amount</span>
                                    <span>Date</span>
                                </div>
                                {['7oeFZe....rW7C', '7oeFZe....rW7C', '7oeFZe....rW7C'].map((addr, i) => (
                                    <div key={i} className="flex justify-between text-xs text-gray-400 py-1">
                                        <span>{addr}</span>
                                        <span>{(10 - i * 5)} USDT</span>
                                        <span>01/08/25</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <WithdrawModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} />
        </section>
    );
}
