"use client";

import { Link as LinkIcon, Users, DollarSign, Copy } from "lucide-react";

export default function Referral() {
    return (
        <section id="referral" className="py-24 relative bg-black/50 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    {/* Content */}
                    <div className="relative z-10 text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-tektur font-bold mb-4">
                            Invite Your Friends And Earn <span className="text-accent-cyan">20%</span>
                        </h2>
                        <p className="text-gray-400 font-satoshi max-w-2xl mx-auto">
                            Share the love, stack the rewards! Earn 10% of what your friend deposits and another 10% in SPICA when they invest $10+ in the pre-sale. Cash out anytime — no limits!
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-blue-500/50 via-yellow-500/50 to-green-500/50 border-t border-dashed border-white/20"></div>

                        {/* Step 1 */}
                        <div className="flex flex-col items-center relative z-10">
                            <div className="w-24 h-24 rounded-full bg-black border border-blue-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                <LinkIcon className="text-blue-500" size={32} />
                            </div>
                            <h3 className="text-blue-500 font-tektur font-bold mb-1">Share Your Link</h3>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center relative z-10">
                            <div className="w-24 h-24 rounded-full bg-black border border-yellow-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                                <Users className="text-yellow-500" size={32} />
                            </div>
                            <h3 className="text-yellow-500 font-tektur font-bold mb-1">Friend Invests $10</h3>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center relative z-10">
                            <div className="w-24 h-24 rounded-full bg-black border border-green-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                                <DollarSign className="text-green-500" size={32} />
                            </div>
                            <h3 className="text-green-500 font-tektur font-bold mb-1">You Earn Instantly</h3>
                        </div>
                    </div>

                    {/* Connector Button */}
                    <div className="text-center mb-16">
                        <button className="px-8 py-3 rounded-full border border-accent-pink/50 bg-accent-pink/10 text-accent-pink font-tektur text-sm hover:bg-accent-pink/20 transition-colors">
                            Connect your wallet to access the referral system
                        </button>
                    </div>

                    {/* Interface */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Link Box */}
                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <h4 className="text-accent-pink font-tektur font-bold mb-4">Share the referral link</h4>
                            <p className="text-xs text-gray-500 mb-4">Share your referral link by copying and sending it to your friends or sharing it on social media.</p>

                            <div className="flex bg-black/60 border border-white/10 rounded-lg p-1.5 mb-4">
                                <input type="text" value="Connect your wallet first" readOnly className="bg-transparent flex-1 px-3 text-sm text-gray-500 focus:outline-none" />
                                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-white text-xs font-bold transition-colors">
                                    Connect Wallet
                                </button>
                            </div>
                        </div>

                        {/* Stats Box */}
                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <div className="text-center mb-6">
                                <h4 className="inline-flex items-center gap-2 text-2xl font-tektur font-bold">
                                    Referred <span className="text-yellow-500">(03)</span>
                                </h4>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-accent-cyan font-bold border-b border-white/5 pb-2">
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
        </section>
    );
}
