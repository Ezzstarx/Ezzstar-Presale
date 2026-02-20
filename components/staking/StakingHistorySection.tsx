"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Tab = "unlock" | "history";

interface DummyStake {
    id: number;
    address: string;
    amount: string;
    period: string;
    unlockTime: number; // timestamp
}

export default function StakingHistorySection() {
    const [activeTab, setActiveTab] = useState<Tab>("unlock"); // Default to unlock as requested
    const [dummyStakes, setDummyStakes] = useState<DummyStake[]>([]);
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        // Generate 55 dummy transactions
        const generateDummyStakes = () => {
            const list: DummyStake[] = [];
            const nowTime = Date.now();
            const periods = ["30 Days", "60 Days", "90 Days", "180 Days", "365 Days"];
            for (let i = 1; i <= 55; i++) {
                const randomAddress = `0x${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}...${Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0')}`;
                const amount = (Math.random() * 10000 + 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                const period = periods[Math.floor(Math.random() * periods.length)];

                list.push({
                    id: i,
                    address: randomAddress,
                    amount: amount,
                    period: period,
                    unlockTime: nowTime + Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000) + 3600000 // 1 hour to 60 days
                });
            }
            return list;
        };
        setDummyStakes(generateDummyStakes());

        // Update countdown every second
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatCountdown = (unlockTime: number, currentNow: number) => {
        const diff = unlockTime - currentNow;
        if (diff <= 0) return "Unlocked";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${days}d: ${hours.toString().padStart(2, '0')}h: ${minutes.toString().padStart(2, '0')}m: ${seconds.toString().padStart(2, '0')}s`;
    };

    return (
        <section className="py-12 bg-[url('/assets/images/background-main.png')] bg-cover bg-center">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Content Container (Card Background) */}
                <div className="bg-[#0f0f12] rounded-sm p-6 md:p-8 border border-white/10">

                    {/* Tabs */}
                    <div className="flex justify-center mb-8">
                        <div className="flex gap-[2px] bg-transparent">
                            <button
                                onClick={() => setActiveTab("unlock")}
                                className={`flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 font-tektur font-medium text-sm md:text-base transition-all border border-white/40 ${activeTab === "unlock"
                                    ? "bg-[#AD7AFF] text-black"
                                    : "bg-black text-white hover:text-[#AD7AFF]"
                                    }`}
                            >
                                <Image
                                    src="/assets/images/Unlock-Icon.png"
                                    alt="Unlock Period"
                                    width={20}
                                    height={20}
                                    className={`w-5 h-5 ${activeTab === "unlock" ? "" : "invert"}`}
                                />
                                <span className={activeTab === "unlock" ? "font-bold" : ""}>Unlock Period</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("history")}
                                className={`flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 font-tektur font-medium text-sm md:text-base transition-all border border-white/40 ${activeTab === "history"
                                    ? "bg-[#AD7AFF] text-black"
                                    : "bg-black text-white hover:text-[#AD7AFF]"
                                    }`}
                            >
                                <Image
                                    src="/assets/images/History-Icon.png"
                                    alt="Staking History"
                                    width={20}
                                    height={20}
                                    className={`w-5 h-5 ${activeTab === "history" ? "brightness-0" : ""}`}
                                />
                                <span>Staking History</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-5 gap-4 text-gray-400 font-satoshi text-xs md:text-sm mb-4 px-4 text-center">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-1 text-left">Address</div>
                        <div className="col-span-1">Staking Amount</div>
                        <div className="col-span-1">Period of Staking</div>
                        <div className="col-span-1 text-right">Countdown</div>
                    </div>

                    {/* Content Area - Scrollable */}
                    <div className="max-h-[360px] md:max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                        <div className="flex flex-col gap-2">
                            {activeTab === "unlock" ? (
                                dummyStakes.map((item) => (
                                    <div key={item.id} className="relative md:bg-[#050505] bg-transparent md:border md:border-white border-transparent md:rounded-md rounded-none md:p-3 p-0 group hover:border-[#FF00FF]/50 transition-colors">
                                        {/* Desktop Grid Layout */}
                                        <div className="hidden md:grid grid-cols-5 gap-4 items-center">
                                            {/* ID with Bracket Corners - Smaller */}
                                            <div className="col-span-1 flex justify-center">
                                                <div className="relative w-8 h-8 flex items-center justify-center font-tektur font-bold text-white text-base">
                                                    {/* Corner accents - thinner */}
                                                    <div className="absolute top-0 left-0 w-2 h-2 border-t-[1px] border-l-[1px] border-gray-500 rounded-tl-[2px]"></div>
                                                    <div className="absolute top-0 right-0 w-2 h-2 border-t-[1px] border-r-[1px] border-gray-500 rounded-tr-[2px]"></div>
                                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[1px] border-l-[1px] border-gray-500 rounded-bl-[2px]"></div>
                                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[1px] border-r-[1px] border-gray-500 rounded-br-[2px]"></div>
                                                    {item.id}
                                                </div>
                                            </div>

                                            <div className="col-span-1 text-white font-satoshi text-xs md:text-sm text-center md:text-left truncate">
                                                {item.address}
                                            </div>

                                            <div className="col-span-1 text-white font-satoshi text-sm text-center">
                                                {item.amount} <span className="text-[#FF00FF] font-tektur">SPCA</span>
                                            </div>

                                            <div className="col-span-1 text-white font-satoshi text-sm text-center">
                                                {item.period}
                                            </div>

                                            <div className="col-span-1 text-white font-satoshi text-sm text-right font-mono">
                                                {formatCountdown(item.unlockTime, now)}
                                            </div>
                                        </div>

                                        {/* Mobile Card Layout */}
                                        <div className="flex md:hidden items-center gap-3">
                                            {/* ID Number (Outside) with Brackets */}
                                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-tektur font-bold text-white text-base relative">
                                                {/* Brackets around ID */}
                                                <div className="absolute left-0 top-0 w-2 h-2 border-l-2 border-t-2 border-white/50 rounded-tl-sm"></div>
                                                <div className="absolute left-0 bottom-0 w-2 h-2 border-l-2 border-b-2 border-white/50 rounded-bl-sm"></div>

                                                {/* Right Brackets */}
                                                <div className="absolute right-0 top-0 w-2 h-2 border-r-2 border-t-2 border-white/50 rounded-tr-sm"></div>
                                                <div className="absolute right-0 bottom-0 w-2 h-2 border-r-2 border-b-2 border-white/50 rounded-br-sm"></div>

                                                {item.id}
                                            </div>

                                            {/* Details Card */}
                                            <div className="flex-1 flex flex-col gap-2 relative border border-white bg-[#050505] rounded-md p-3">
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-gray-400 font-satoshi">Address</span>
                                                    <span className="text-white font-tektur">{item.address}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-gray-400 font-satoshi">Staking Amount</span>
                                                    <span className="text-white font-tektur">{item.amount} <span className="text-[#FF00FF] text-[10px]">SPCA</span></span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-gray-400 font-satoshi">Period</span>
                                                    <span className="text-white font-tektur">{item.period}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-gray-400 font-satoshi">Countdown</span>
                                                    <span className="text-white font-tektur font-mono">{formatCountdown(item.unlockTime, now)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                /* Empty History State */
                                <div className="border border-white/20 rounded-md py-12 px-4 flex items-center justify-center bg-transparent backdrop-blur-sm min-h-[200px]">
                                    <span className="font-tektur text-white text-lg tracking-wide">
                                        Yours Transaction History is Empty
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
