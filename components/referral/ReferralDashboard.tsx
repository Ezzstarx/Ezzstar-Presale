"use client";

import { useState } from "react";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Send } from "lucide-react";
import { useWallet } from "../providers/WalletProvider";
import MagicButton from "@/components/ui/MagicButton";

// Custom X (Twitter) Icon
const XIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

// Custom Discord Icon
const DiscordIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
    </svg>
);

export default function ReferralDashboard() {
    const { isConnected, address, openWalletModal } = useWallet();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const link = `https://ezzstar.space/?ref=${address ? address.slice(0, 10) : '0878871527'}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-[1000px] mx-auto">
            <div className="grid md:grid-cols-[2.7fr_2.3fr] gap-8">
                {/* Link Box */}
                <div className="glass-card rounded-xl p-8 bg-black/40 border border-white/10">
                    <h4 className="text-[25px] text-accent-pink font-tektur font-medium mb-4">Share the referral link</h4>
                    <p className="text-xs text-gray-200 mb-4">Share your referral link by copying and sending it to your friends or sharing it on social media.</p>

                    <p className="text-[10px] text-gray-400 font-satoshi mb-1 ml-1 text-left">Copy the Unique Link from here</p>
                    <div className="flex bg-black/60 border border-white/10 rounded-lg p-1.5 mb-6">
                        {!isConnected ? (
                            <>
                                <input type="text" value="Connect your wallet first" readOnly className="bg-transparent flex-1 px-3 text-sm text-gray-400 focus:outline-none" />
                                <MagicButton
                                    onClick={openWalletModal}
                                    className="px-4 py-1 rounded-md text-white/80 text-lg font-medium transition-colors"
                                    style={{ "--mask-bg": "#000000" } as React.CSSProperties}
                                >
                                    Connect Wallet
                                </MagicButton>
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
                                    className="px-6 py-1 bg-black border border-white/20 rounded-md text-white/80 hover:text-white text-lg font-tektur uppercase tracking-wider hover:border-white/50 transition-all shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                                >
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                            </>
                        )}
                    </div>

                    {/* Social Icons */}
                    <div>
                        <p className="text-sm text-gray-400 mb-3">Invite via:</p>
                        <div className="flex gap-4 items-center text-gray-400">
                            <DiscordIcon className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                            <Send className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                            <XIcon className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                            <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                            <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                            <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Stats Box */}
                <div className="glass-card rounded-xl p-5 bg-black/40 border border-white/10">
                    <div className="text-center mb-6">
                        {/* Ref-referred Icon */}
                        <div className="flex justify-center mb-2">
                            <Image src="/assets/images/Ref-Referred.png" alt="Referred" width={50} height={50} className="object-contain" />
                        </div>
                        <h4 className="inline-flex items-center gap-2 text-2xl font-tektur font-medium">
                            Referred <span className="text-yellow-500">(03)</span>
                        </h4>
                    </div>

                    <div className="space-y-0 font-satoshi">
                        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center text-sm text-[#3EE1F0] font-medium pb-0 px-8 mb-[2px]">
                            <span className="text-left">Address</span>
                            <span className="text-lg text-[#3EE1F0] text-center">-</span>
                            <span className="text-center">Amount</span>
                            <span className="text-lg text-[#3EE1F0] text-center">-</span>
                            <span className="text-right">Date</span>
                        </div>
                        <div className="bg-gradient-to-r from-[#DE3BD6]/40 to-[#01F1E3]/40 p-[1px]">
                            <div className="bg-black">
                                <div className="flex flex-col bg-white/5">
                                    {['7oeFZe....rW7C', '7oeFZe....rW7C', '7oeFZe....rW7C'].map((addr, i) => (
                                        <div key={i} className="flex flex-col">
                                            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center text-xs text-gray-400 py-[2px] px-8">
                                                <span className="text-left">{addr}</span>
                                                <span className="text-xl text-gray-600 text-center">-</span>
                                                <span className="text-center">{(10 - i * 5)} USDT</span>
                                                <span className="text-xl text-gray-600 text-center">-</span>
                                                <span className="text-right">01/08/25</span>
                                            </div>
                                            {(i < 2) && (
                                                <div className="w-full h-[1px] bg-gradient-to-r from-[#DE3BD6]/30 to-[#01F1E3]/30"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
