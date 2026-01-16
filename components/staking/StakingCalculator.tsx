"use client";

import { useState } from "react";

export default function StakingCalculator() {
    const [calcAmount, setCalcAmount] = useState("");
    const [periodDays, setPeriodDays] = useState(264); // random default roughly matching 8m 24d

    // Helper: format days to "Xm Yd"
    // Approx: 30 days = 1m
    const formatDuration = (days: number) => {
        if (days >= 365) return "1yr";
        if (days < 30) return `${days}d`;
        const months = Math.floor(days / 30);
        const remainingDays = days % 30;
        return `${months}m ${remainingDays}d`;
    };

    // Calculation Logic
    // Daily APR = 80% / 365 ? Or just assumes linear 80% APR for calculation
    const apr = 0.80; // 80%
    const dailyRate = apr / 365;

    const oneDayEarnings = parseFloat(calcAmount || "0") * dailyRate;
    const totalEarnings = oneDayEarnings * periodDays;

    return (
        <div className="bg-[#0a0a0c] border border-white/10 rounded-[30px] p-8 md:p-12 relative overflow-hidden h-full flex flex-col justify-center">
            {/* Header */}
            <h2 className="text-4xl text-center font-tektur font-bold mb-4 text-white">
                Staking Calculator
            </h2>
            <p className="text-center text-gray-400 font-satoshi mb-12 text-sm md:text-base px-4">
                Maximize your gains, use our staking calculator to preview your SPCA rewards in seconds.
            </p>

            {/* Input Amount */}
            <div className="mb-8">
                <label className="text-gray-400 font-satoshi text-sm mb-2 block">Enter Staking SPCA Amount</label>
                <input
                    type="number"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#0f0f12] border border-white/10 rounded-xl p-4 text-white font-tektur focus:border-[#FF00FF] transition-colors outline-none placeholder:text-gray-600"
                />
            </div>

            {/* Period Slider */}
            <div className="mb-12">
                <label className="text-gray-400 font-satoshi text-sm mb-4 block">Select the staking period</label>

                <div className="relative w-full h-2 mb-8">
                    <input
                        type="range"
                        min="1"
                        max="365"
                        value={periodDays}
                        onChange={(e) => setPeriodDays(parseInt(e.target.value))}
                        className="absolute w-full h-full opacity-0 z-20 cursor-pointer"
                    />
                    {/* Visual Track */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-800 rounded-full z-10 overflow-hidden">
                        <div
                            className="h-full bg-[#00FFF0] shadow-[0_0_10px_cyan]"
                            style={{ width: `${(periodDays / 365) * 100}%` }}
                        ></div>
                    </div>
                    {/* Thumb Label */}
                    <div
                        className="absolute -top-4 -translate-x-1/2 bg-[#FFD700] text-black px-3 py-1 rounded-full font-bold shadow-[0_0_10px_#FFD700] text-sm z-10 whitespace-nowrap pointer-events-none transition-all duration-75"
                        style={{ left: `${(periodDays / 365) * 100}%` }}
                    >
                        {formatDuration(periodDays)}
                    </div>
                </div>

                <div className="flex justify-between items-center text-gray-400 font-tektur text-sm uppercase">
                    <span>1d</span>
                    <span>1yr</span>
                </div>
            </div>

            {/* Earnings Display */}
            <div className="grid grid-cols-2 gap-6 items-center">
                {/* Right Side: Results Display */}
                <div className="bg-[#FF00FF]/60 border border-[#FF00FF]/30 p-6 rounded-xl shadow-[0_0_20px_#FF00FF]/10 h-full flex flex-col justify-center">
                    <h3 className="text-black/80 font-bold font-tektur mb-6 text-xl">Estimated Earnings</h3>
                    <div className="text-black text-3xl font-tektur font-bold">{oneDayEarnings > 0 ? oneDayEarnings.toFixed(4) : "0.00"}</div>
                </div>

                <div>
                    <div className="text-gray-400 text-sm font-satoshi mb-1 text-right">{formatDuration(periodDays)} Earnings</div>
                    <div className="text-[#00FFF0] text-3xl font-tektur font-bold text-shadow-glow text-right">{totalEarnings > 0 ? totalEarnings.toFixed(2) : "0.00"}</div>
                </div>
            </div>

        </div >
    );
}
