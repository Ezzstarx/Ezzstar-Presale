"use client";

import { useState } from "react";
import { History, RefreshCw } from "lucide-react";

type Tab = "unlock" | "history";

const UNLOCK_DATA = [
    { id: 1, address: "0x1a98...1a34", amount: "5,791.59", period: "365 Days", countdown: "355d: 56m: 34s" },
    { id: 2, address: "7oefXe...rW7C", amount: "5,791.59", period: "70 Days", countdown: "355d: 56m: 34s" },
    { id: 3, address: "4iXWFr...XYMT", amount: "5,791.59", period: "1 Day", countdown: "355d: 56m: 34s" },
    { id: 4, address: "0xd581...ec4b", amount: "5,791.59", period: "30 Days", countdown: "355d: 56m: 34s" },
    { id: 5, address: "htB4iE...vVnN", amount: "5,791.59", period: "50 Days", countdown: "355d: 56m: 34s" },
    { id: 6, address: "9xK2mP...zL9Q", amount: "1,200.00", period: "90 Days", countdown: "355d: 56m: 34s" },
    { id: 7, address: "3bJ4nR...kM2P", amount: "3,500.50", period: "180 Days", countdown: "355d: 56m: 34s" },
    { id: 8, address: "5cL7tS...wR1X", amount: "9,999.99", period: "365 Days", countdown: "355d: 56m: 34s" },
    { id: 9, address: "2aH8vD...yU4N", amount: "500.00", period: "30 Days", countdown: "355d: 56m: 34s" },
    { id: 10, address: "8fG1wE...qT6B", amount: "7,777.77", period: "120 Days", countdown: "355d: 56m: 34s" },
];

export default function StakingHistorySection() {
    const [activeTab, setActiveTab] = useState<Tab>("unlock"); // Default to unlock as requested

    return (
        <section className="py-12 bg-[url('/assets/images/background-main.png')] bg-cover bg-center">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Content Container (Card Background) */}
                <div className="bg-[#0f0f12] rounded-3xl p-6 md:p-8 border border-white/5">

                    {/* Tabs */}
                    <div className="flex justify-center mb-8">
                        <div className="flex rounded-lg overflow-hidden border border-white/10 bg-[#1a1a1a]">
                            <button
                                onClick={() => setActiveTab("unlock")}
                                className={`flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 font-tektur font-medium text-sm md:text-base transition-all ${activeTab === "unlock"
                                    ? "bg-[#FF00FF]/60 text-black"
                                    : "bg-transparent text-gray-300 hover:text-white"
                                    }`}
                            >
                                <RefreshCw size={16} />
                                <span>Unlock Period</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("history")}
                                className={`flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 font-tektur font-medium text-sm md:text-base transition-all ${activeTab === "history"
                                    ? "bg-[#FF00FF] text-black"
                                    : "bg-transparent text-gray-300 hover:text-white border-l border-white/10"
                                    }`}
                            >
                                <History size={16} />
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

                    {/* Content Area */}
                    <div className="flex flex-col gap-3">
                        {activeTab === "unlock" ? (
                            UNLOCK_DATA.map((item) => (
                                <div key={item.id} className="relative bg-[#050505] border border-white/40 rounded-xl p-3 grid grid-cols-1 md:grid-cols-5 gap-4 items-center group hover:border-[#FF00FF]/50 transition-colors">
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

                                    <div className="col-span-1 text-white font-tektur font-bold text-sm text-center">
                                        {item.amount} <span className="text-[#FF00FF]">SPCA</span>
                                    </div>

                                    <div className="col-span-1 text-white font-satoshi text-sm text-center">
                                        {item.period}
                                    </div>

                                    <div className="col-span-1 text-white font-satoshi text-sm text-right">
                                        {item.countdown}
                                    </div>
                                </div>
                            ))
                        ) : (
                            /* Empty History State */
                            <div className="border border-white/20 rounded-xl py-12 px-4 flex items-center justify-center bg-transparent backdrop-blur-sm min-h-[200px]">
                                <span className="font-tektur text-white text-lg tracking-wide">
                                    Yours Transaction History is Empty
                                </span>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}
