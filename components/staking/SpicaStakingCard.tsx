"use client";

import { useState } from "react";
import Image from "next/image";
import { useWallet } from "../providers/WalletProvider";
import MagicButton from "@/components/ui/MagicButton";

export default function SpicaStakingCard() {
    const { isConnected, connectWallet, openWalletModal } = useWallet();
    const [amount, setAmount] = useState<string>("10,000");
    const [lockDays, setLockDays] = useState(1080);
    const [apr, setApr] = useState(80);

    // Mock Base Balances
    const TOTAL_BALANCE = 10000;
    const INITIAL_STAKED = 500;

    // Derived Balances based on input
    const numericAmount = parseFloat(amount.replace(/,/g, "") || "0");
    const stakedBalance = INITIAL_STAKED + numericAmount;
    const stakeableBalance = Math.max(0, TOTAL_BALANCE - numericAmount);

    // Calculate APR based on lock days (Example logic: Base 20% + bonus per day)
    // 1080 days = 80% (Max)
    // Linear interpolation for demo
    // Calculate properties for UI rendering
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
        <div className="bg-[#0a0a0c]/60 border border-white/10 rounded-[20px] p-5 md:p-6 pb-4 relative overflow-hidden w-full h-full flex flex-col">
            {/* Header */}
            <h2 className="text-2xl md:text-3xl font-tektur font-bold mb-1 text-white">
                <span className="text-[#FF00FF]">SPICA</span> <span className="text-white">Staking</span>
            </h2>
            <p className="text-center text-gray-400 font-satoshi mb-4 text-[10px] md:text-xs px-2">
                Stake SPCA and enjoy variable returns that scale with community growth and ecosystem usage.
            </p>

            {/* Input Section */}
            <div className="mb-4">
                <div className="flex justify-between text-[10px] text-gray-400 mb-2 font-satoshi">
                    <span>Balance : {TOTAL_BALANCE.toLocaleString()} SPCA</span>
                </div>
                {/* Token Input Section */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-[#FF00FF] p-1 flex items-center justify-center overflow-hidden">
                            <Image src="/assets/images/SpicaBadge.png" alt="Spica" width={28} height={28} className="object-cover" />
                        </div>
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            className="bg-transparent border-none outline-none text-white text-base font-tektur font-bold w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#0f0f12] border border-white/5 rounded-xl p-3">
                    <div className="text-xl font-tektur font-bold text-white mb-0.5">{stakedBalance.toLocaleString()}</div>
                    <div className="text-gray-400 text-[10px] font-satoshi">Staked Balance</div>
                </div>
                <div className="bg-[#0f0f12] border border-white/5 rounded-xl p-3">
                    <div className="text-xl font-tektur font-bold text-white mb-0.5">{stakeableBalance.toLocaleString()}</div>
                    <div className="text-gray-400 text-[10px] font-satoshi">Your Stakeable</div>
                </div>
            </div>

            {/* Slider Section */}
            <div className="mb-6">
                <div className="flex justify-between text-gray-400 text-[10px] font-satoshi mb-2">
                    <span>Lock For : {lockDays} Days</span>
                    <span>APR : {apr}%</span>
                </div>

                {/* Interactive Slider */}
                {/* Container Size: scaled down lightly? 29px was fine, maybe just standardizing */}
                <div className="relative w-full h-[29px] flex items-center justify-center">
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
                    <div className="absolute left-0 w-full h-[6px] bg-white/10 rounded-[1px] overflow-hidden z-10 top-1/2 -translate-y-1/2">
                        {/* Active fill */}
                        <div
                            className="h-full bg-gradient-to-r from-[#FF00FF] to-[#00FFF0] shadow-[0_0_10px_#FF00FF]"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    {/* Thumb */}
                    <div
                        className="absolute w-4 h-4 bg-[#FF00FF] border border-white rounded-full shadow-[0_0_10px_#FF00FF] z-30 pointer-events-none transition-all duration-75"
                        style={{
                            // left: Start (0) to End (100% - 16px)
                            left: `calc(${progress}% - ${progress * 0.16}px)`
                        }}
                    ></div>
                </div>
            </div>

            {/* Action Button */}
            <button
                onClick={handleAction}
                className="w-full py-3 rounded-xl font-tektur font-medium text-base text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10 relative overflow-hidden group mb-0"
                style={{
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%)"
                }}
            >
                <span className="relative z-10 text-gray-200 group-hover:text-white transition-colors">Connect Wallet</span>
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

        </div>
    );
}
