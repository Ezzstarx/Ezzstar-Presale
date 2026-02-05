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
        <div className="bg-black border border-white/10 rounded-[20px] p-6 md:p-8 relative overflow-hidden w-full h-full flex flex-col justify-center">
            {/* Header */}
            <h2 className="text-3xl md:text-4xl text-center font-tektur mb-3 text-white">
                Staking Calculator
            </h2>
            <p className="text-center text-white/80 font-satoshi mb-8 text-xs md:text-sm px-2">
                Maximize your gains, use our staking calculator to preview your SPCA rewards in seconds.
            </p>

            {/* Input Amount */}
            <div className="mb-6">
                <label className="text-[#A1A3A9] font-satoshi text-xs md:text-sm mb-2 block">Enter Staking SPCA Amount</label>
                <input
                    type="number"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(e.target.value)}
                    placeholder="Enter Amount"
                    className="w-full bg-[#0f0f12] border border-white/10 rounded-md p-4 text-white font-tektur text-base focus:border-[#FF00FF]/50 transition-colors outline-none placeholder:text-[#A1A3A9]"
                />
            </div>

            {/* Period Slider */}
            <div className="mb-6">
                <label className="text-[#A1A3A9] font-tektur text-xs md:text-sm mb-3 block">Select the staking period</label>

                <div className="relative w-full h-[18px] mb-3 flex items-center">
                    <input
                        type="range"
                        min="1"
                        max="365"
                        value={periodDays}
                        onChange={(e) => setPeriodDays(parseInt(e.target.value))}
                        className="absolute w-full h-full opacity-0 z-30 cursor-pointer"
                    />

                    {/* Track Container */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black border border-white/20 rounded-sm z-10 overflow-hidden">
                        {/* Active Fill */}
                        <div
                            className="h-full bg-[#00FFF0] shadow-[0_0_10px_#00FFF0]"
                            style={{ width: `${(periodDays / 365) * 100}%` }}
                        ></div>
                    </div>

                    {/* Custom Thumb - Navigation Arrow Style */}
                    <div
                        className="absolute h-6 w-7 bg-[#1E1E1E] border border-white rounded-md flex items-center justify-center z-20 pointer-events-none shadow-lg transition-all duration-75"
                        style={{
                            left: `calc(${(periodDays / 365) * 100}% - 18px)` // Center the thumb
                        }}
                    >
                        {/* < > arrows */}
                        <span className="text-white text-[14px] tracking-widest">{"< >"}</span>
                    </div>

                    {/* Floating Label - Below */}
                    <div
                        className="absolute -bottom-10 -translate-x-1/2 bg-[#FFD700] text-black px-6 py-0.5 rounded-md font-bold text-xs md:text-sm z-20 whitespace-nowrap pointer-events-none transition-all duration-75 border border-white"
                        style={{ left: `${(periodDays / 365) * 100}%` }}
                    >
                        {formatDuration(periodDays)}
                    </div>
                </div>

                <div className="flex justify-between items-center text-white font-tektur text-xs md:text-sm ">
                    <span>1d</span>
                    <span>1yr</span>
                </div>
            </div>

            {/* Earnings Display */}
            <div className="mt-4">
                <div className="text-[#A1A3A9] font-tektur text-xs md:text-sm mb-2 text-left">You Receive</div>
                <div className="flex justify-between items-center gap-4">
                    {/* Left Side: 1d Earnings */}
                    <div className="flex-1 h-[80px] bg-[#DE3BD6] shadow-[0_0_20px_rgba(222,59,214,0.3)] flex flex-col justify-center items-start px-6">
                        <h3 className="text-black font-satoshi mb-0 text-base tracking-wide">1d Earnings</h3>
                        <div className="text-black text-3xl font-tektur font-medium">{oneDayEarnings > 0 ? oneDayEarnings.toFixed(4) : "0.00"}</div>
                    </div>

                    {/* Right Side: Total Earnings */}
                    <div className="flex-1 h-[80px] flex flex-col justify-center items-start">
                        <div className="text-[#A1A3A9] text-sm font-satoshi mb-0.5 text-left tracking-wider">{formatDuration(periodDays)} Earnings</div>
                        <div className="text-[#00FFF0] text-3xl font-tektur font-medium text-shadow-glow text-left leading-none">{totalEarnings > 0 ? totalEarnings.toFixed(2) : "0.00"}</div>
                    </div>
                </div>
            </div>

        </div >
    );
}
