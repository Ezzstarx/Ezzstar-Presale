"use client";

import { useState } from "react";
import Image from "next/image";
import { useWallet } from "../providers/WalletProvider";
import MagicButton from "@/components/ui/MagicButton";

export default function SpicaStakingCard() {
    const { isConnected, connectWallet, openWalletModal } = useWallet();
    const [amount, setAmount] = useState<string>("10,000");
    const [lockDays, setLockDays] = useState(818); // Default 75%
    const [apr, setApr] = useState(100);

    // Mock Base Balances
    const TOTAL_BALANCE = 10000;
    const INITIAL_STAKED = 500;

    // Derived Balances based on input
    const numericAmount = parseFloat(amount.replace(/,/g, "") || "0");
    const stakedBalance = INITIAL_STAKED + numericAmount;
    const stakeableBalance = Math.max(0, TOTAL_BALANCE - numericAmount);

    // APR Calculation Constants
    const MIN_DAYS = 30;
    const MAX_DAYS = 1080;

    const progress = Math.max(0, Math.min(100, ((lockDays - MIN_DAYS) / (MAX_DAYS - MIN_DAYS)) * 100));

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const days = parseInt(e.target.value);
        setLockDays(days);
        // Logic: Map 30-1080 days directly to 0-100% APR
        const calculatedApr = ((days - MIN_DAYS) / (MAX_DAYS - MIN_DAYS)) * 100;
        setApr(Math.round(calculatedApr));
    };

    // Handler for manual amount input to ensure it's editable
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Allow only numbers and commas/dots
        const val = e.target.value;
        setAmount(val);
    };

    const handleAction = () => {
        if (!isConnected) {
            openWalletModal();
        } else {
            console.log("Staking functionality is currently disabled.");
        }
    };

    return (
        <div className="bg-black border border-white/10 rounded-[20px] p-6 md:p-8 pb-6 relative w-full h-full flex flex-col justify-center">
            {/* Header */}
            <h2 className="text-3xl md:text-4xl font-tektur mb-2 text-white text-center">
                <span className="text-[#FF00FF]">SPICA</span> <span className="text-white">Staking</span>
            </h2>
            <p className="text-center text-white/80 font-satoshi mb-6 text-xs md:text-sm px-2">
                Stake SPCA and enjoy variable returns that scale with community growth and ecosystem usage.
            </p>

            {/* Input Section */}
            <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-400 mb-2 font-satoshi">
                    <span>Balance : {TOTAL_BALANCE.toLocaleString()} SPCA</span>
                </div>
                {/* Token Input Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2 bg-[#0f0f12] border border-white/10 rounded-sm p-2 transition-colors focus-within:border-[#FF00FF]/50">
                        <Image src="/assets/images/Unique-1.png" alt="Spica" width={30} height={30} className="object-contain" />
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            className="bg-transparent border-none outline-none text-white text-lg font-tektur w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0f0f12] border border-white/10 rounded-sm p-3">
                    <div className="text-3xl font-tektur text-white mb-1">{stakedBalance.toLocaleString()}</div>
                    <div className="text-white text-xs font-satoshi">Staked Balance</div>
                </div>
                <div className="bg-[#0f0f12] border border-white/10 rounded-sm p-3">
                    <div className="text-3xl font-tektur text-white mb-1">{stakeableBalance.toLocaleString()}</div>
                    <div className="text-white text-xs font-satoshi">Your Stakeable</div>
                </div>
            </div>

            {/* Slider Section */}
            <div className="mb-8">
                <div className="flex justify-between text-gray-400 text-xs font-satoshi mb-3">
                    <span>Lock For : {lockDays} Days</span>
                    <span>APR : {Math.round(((lockDays - MIN_DAYS) / (MAX_DAYS - MIN_DAYS)) * 100)}%</span>
                </div>

                {/* Interactive Slider */}
                <div className="relative w-full h-[28px] flex items-center justify-center rounded-sm border border-white">
                    <input
                        type="range"
                        min={MIN_DAYS}
                        max={MAX_DAYS}
                        value={lockDays}
                        onChange={handleSliderChange}
                        className="absolute w-full h-full opacity-0 z-20 cursor-pointer"
                    />

                    {/* Visual Track Container - Rectangular */}
                    <div className="absolute inset-0 rounded-sm border border-white/20 overflow-hidden">
                        {/* Glow should be gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF00FF]/20 via-[#00FFF0]/10 to-[#FF00FF]/20 blur-sm"></div>
                    </div>

                    {/* The Sliding Line Track - Full Width now */}
                    <div className="absolute left-0 w-full h-[6px] bg-white/10 rounded-[1px] z-10 top-1/2 -translate-y-1/2">
                        {/* Active fill Container (Transparent wrapper for sizing) */}
                        <div
                            className="h-full relative"
                            style={{ width: `${progress}%` }}
                        >
                            {/* 1. Static Gradient Glow (Behind everything) */}
                            <div
                                className="absolute top-[-10px] bottom-[-10px] left-0 w-full bg-gradient-to-r from-[#FF00FF] to-[#00FFF0] blur-[4px] opacity-60 z-0"
                                style={{ animation: 'colorCycle 4s linear infinite' }}
                            ></div>

                            {/* 2. Animated Glow Stream (Behind white line) */}
                            <div className="slider-glow-stream z-0"></div>

                            {/* 3. The White Line Itself (On Top) */}
                            <div className="absolute inset-0 bg-white z-10 rounded-[1px] shadow-[0_0_15px_rgba(255,0,255,0.7)]"></div>
                        </div>
                    </div>

                    {/* Thumb */}
                    <div
                        className="absolute w-4 h-4 rounded-full z-30 pointer-events-none transition-all duration-75"
                        style={{
                            background: 'radial-gradient(circle at center, #DE3BD6 0%, #FFFFFF 100%)',
                            border: '1px solid white',
                            // left: Start (0) to End (100% - 16px)
                            left: `calc(${progress}% - ${progress * 0.16}px)`
                        }}
                    ></div>
                </div>
            </div>

            {/* Action Button */}
            <MagicButton
                onClick={handleAction}
                className="w-full py-3 rounded-md font-tektur font-medium text-xl text-white mb-0 border border-white/30"
                style={{ '--mask-bg': '#1E1E1E' } as React.CSSProperties}
            >
                Connect Wallet
            </MagicButton>

        </div>
    );
}
