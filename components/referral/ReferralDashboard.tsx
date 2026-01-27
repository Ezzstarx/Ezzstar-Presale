"use client";

import { useState } from "react";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Send, MessageCircle, Twitter } from "lucide-react";
import { useWallet } from "../providers/WalletProvider";
import MagicButton from "@/components/ui/MagicButton";

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
                                <MagicButton
                                    onClick={openWalletModal}
                                    className="px-4 py-2 rounded-md text-white text-xs font-medium transition-colors"
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
    );
}
