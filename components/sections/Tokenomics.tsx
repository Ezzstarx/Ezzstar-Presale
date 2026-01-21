"use client";

import Image from "next/image";
import { useState, Fragment } from "react";

export default function Tokenomics() {
    const [copied, setCopied] = useState(false);
    const contractAddress = "0xc50D5CC75D839F005161fdB5a2B8702FdCDDb553";

    const handleCopy = () => {
        navigator.clipboard.writeText(contractAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="tokenomics" className="py-12 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/background-main.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="w-full max-w-[1440px] h-[119px] mx-auto bg-transparent relative flex items-center justify-center mb-8">
                    <h2 className="text-[55px] font-tektur font-medium tracking-[-1px] text-center mb-0 text-white">
                        Tokenomics
                    </h2>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DE3BD6] to-transparent"></div>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-[1137px] h-[388px] mb-4 shrink-0">
                        <Image
                            src="/assets/images/Tokenomics.png"
                            alt="Tokenomics Distribution"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div className="w-full max-w-6xl">
                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-satoshi text-center mb-6 text-white/90">
                            Total Supply: <span className="text-[#FF00FF]">5 Billion SPICA</span>
                        </h3>

                        {/* Distribution Grid - FIXED DIMENSIONS */}
                        {/* Distribution Grid - FULL WIDTH & RECTANGULAR */}
                        <div className="grid grid-cols-6 md:grid-cols-5 gap-4 md:gap-0 bg-black/10 w-full">
                            {[
                                { pct: "5%", label: "Private-Sale" },
                                { pct: "10%", label: "Pre-sale" },
                                { pct: "15%", label: "Owner & Advisors" },
                                { pct: "10%", label: "Treasury" },
                                { pct: "5%", label: "Marketing, Airdrops, & Giveaways" },
                                { pct: "10%", label: "Teams" },
                                { pct: "10%", label: "Development" },
                                { pct: "10%", label: "Liquidity Provision" },
                                { pct: "10%", label: "Community Reward" },
                                { pct: "15%", label: "Spica Reserved" },
                            ].map((item, idx) => {
                                return (
                                    <Fragment key={idx}>
                                        <div
                                            className={`relative p-4 flex flex-col gap-0 col-span-2 md:col-span-1 items-center md:items-start group/item border-t border-white/20`}
                                        >
                                            <span className="text-[24px] font-satoshi text-white mb-0 leading-tight">{item.pct}</span>
                                            <span className="text-gray-400 text-[14px] leading-tight font-satoshi text-center md:text-left">{item.label}</span>

                                            {/* Custom Separators - Mobile Only */}
                                            {/* Right Line */}
                                            <div className={`absolute right-0 top-4 bottom-0 w-[1px] bg-white/20 md:hidden`} />
                                            {/* Bottom Line */}
                                            <div className={`absolute bottom-0 left-2 right-0 h-[1px] bg-white/20 md:hidden`} />

                                            {/* Desktop Vertical Separator - Centered & Not Touching Borders */}
                                            {/* Conditionally render to ensure it is NOT present on the last item of the row (idx 4 and 9) */}
                                            {((idx + 1) % 5 !== 0) && (
                                                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-[60%] w-[1px] bg-white/20" />
                                            )}
                                        </div>

                                        {/* Spacer for 3-2-3-2 Layout (Mobile) */}
                                        {idx === 4 && (
                                            <div className="block md:hidden col-span-2 pointer-events-none"></div>
                                        )}
                                    </Fragment>
                                );
                            })}
                        </div>

                        {/* Contract Section - FULL WIDTH & RECTANGULAR */}
                        <div className="mt-4 bg-black/10 w-full flex flex-col">
                            {/* Top Section with Border */}
                            <div className="p-6 md:p-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h4 className="text-xl font-tektur font-medium text-white mb-2">Contract Address</h4>
                                    <div className="flex flex-col gap-1">
                                        <code className="text-gray-400 font-mono text-sm break-all">
                                            {contractAddress}
                                        </code>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2 self-end md:self-auto">
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 text-[#F1C40F] hover:text-[#d4ac0d] transition-colors font-tektur text-sm uppercase tracking-wide"
                                    >
                                        {copied ? (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                <span className="text-green-500">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                                <span>Copy Address</span>
                                            </>
                                        )}
                                    </button>
                                    <div className="flex items-center gap-2 text-red-500/80 text-xs font-satoshi">
                                        <span>✋</span>
                                        <span>(Do not send any tokens to this address)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-6 md:grid-cols-5 gap-4 md:gap-0 justify-items-center md:justify-items-start">
                                {[
                                    { value: "SPICA", label: "Name" },
                                    { value: "SPCA", label: "Symbol" },
                                    { value: "18", label: "Decimal" },
                                    { value: "BEP20", label: "Network" },
                                    { value: "BSC", label: "Chain" },
                                ].map((item, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className="relative col-span-2 md:col-span-1 text-center md:text-left w-full flex flex-col items-center md:items-start p-4 border-t border-white/20"
                                        >
                                            <span className="block text-[24px] font-satoshi text-white mb-0 leading-tight">{item.value}</span>
                                            <span className="text-gray-400 text-[14px] text-center md:text-left block w-full leading-tight font-satoshi">{item.label}</span>

                                            {/* Custom Separators - Mobile Only */}
                                            {/* Right Line */}
                                            <div className={`absolute right-0 top-2 bottom-0 w-[1px] bg-white/20 md:hidden`} />
                                            {/* Bottom Line */}
                                            <div className={`absolute bottom-0 left-2 right-0 h-[1px] bg-white/20 md:hidden`} />

                                            {/* Desktop Vertical Separator - Centered & Not Touching Borders */}
                                            {/* Conditionally render to ensure it is NOT present on the last item (idx 4) */}
                                            {((idx + 1) % 5 !== 0) && (
                                                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-[60%] w-[1px] bg-white/20" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
