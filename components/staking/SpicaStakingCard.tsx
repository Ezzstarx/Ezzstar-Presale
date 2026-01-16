"use client";

import { useState } from "react";
import Image from "next/image";
import { useWallet } from "../providers/WalletProvider";

export default function SpicaStakingCard() {
    const { isConnected, connectWallet } = useWallet();
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
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const days = parseInt(e.target.value);
        setLockDays(days);
        // Logic: Min 30 days (20%) -> Max 1080 days (80%)
        const calculatedApr = 20 + ((days / 1080) * 60);
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
            connectWallet();
        } else {
            // Stake logic would go here
            console.log("Staking", amount, "for", lockDays, "days");
        }
    };

    return (
        <div className="bg-[#0a0a0c] border border-white/10 rounded-[30px] p-6 md:p-8 relative overflow-hidden h-full">
            {/* Header */}
            <h2 className="text-3xl md:text-4xl font-tektur font-bold mb-2 text-white">
                <span className="text-[#FF00FF]">SPICA</span> <span className="text-white">Staking</span>
            </h2>
            <p className="text-center text-gray-400 font-satoshi mb-6 text-xs md:text-sm px-4">
                Stake SPCA and enjoy variable returns that scale with community growth and ecosystem usage.
            </p>

            {/* Input Section */}
            <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-400 mb-2 font-satoshi">
                    <span>Balance : {TOTAL_BALANCE.toLocaleString()} SPCA</span>
                </div>
                {/* Token Input Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#FF00FF] p-1 flex items-center justify-center overflow-hidden">
                            <Image src="/assets/images/SpicaBadge.png" alt="Spica" width={32} height={32} className="object-cover" />
                        </div>
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            className="bg-transparent border-none outline-none text-white text-lg font-tektur font-bold w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#0f0f12] border border-white/5 rounded-xl p-4">
                    <div className="text-2xl font-tektur font-bold text-white mb-1">{stakedBalance.toLocaleString()}</div>
                    <div className="text-gray-400 text-xs font-satoshi">Staked Balance</div>
                </div>
                <div className="bg-[#0f0f12] border border-white/5 rounded-xl p-4">
                    <div className="text-2xl font-tektur font-bold text-white mb-1">{stakeableBalance.toLocaleString()}</div>
                    <div className="text-gray-400 text-xs font-satoshi">Your Stakeable</div>
                </div>
            </div>

            {/* Slider Section */}
            <div className="mb-8">
                <div className="flex justify-between text-gray-400 text-xs font-satoshi mb-2">
                    <span>Lock For : {lockDays} Days</span>
                    <span>APR : {apr}%</span>
                </div>

                {/* Interactive Slider */}
                <div className="relative w-full h-3">
                    <input
                        type="range"
                        min="30"
                        max="1080"
                        value={lockDays}
                        onChange={handleSliderChange}
                        className="absolute w-full h-full opacity-0 z-20 cursor-pointer"
                    />
                    {/* Visual Track */}
                    <div className="absolute top-0 left-0 w-full h-3 bg-gray-800 rounded-full z-10 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#FF00FF] to-[#00FFF0] shadow-[0_0_15px_#FF00FF]"
                            style={{ width: `${(lockDays / 1080) * 100}%` }}
                        ></div>
                    </div>
                    {/* Thumb (Visual only, follows calculation) */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#FF00FF] border-2 border-white rounded-full shadow-[0_0_10px_#FF00FF] z-10 pointer-events-none transition-all duration-75"
                        style={{ left: `calc(${(lockDays / 1080) * 100}% - 10px)` }}
                    ></div>
                </div>
            </div>

            {/* Action Button */}
            <button
                onClick={handleAction}
                className={`w-full py-3 rounded-xl font-tektur font-bold text-lg transition-all shadow-[0_0_20px_rgba(255,0,255,0.2)] hover:shadow-[0_0_30px_rgba(255,0,255,0.4)] hover:scale-[1.02] active:scale-[0.98] ${isConnected
                    ? "bg-[#FF00FF]/60 text-white hover:bg-[#FF00FF]"
                    : "bg-white text-black hover:bg-gray-200"
                    }`}
            >
                {isConnected ? "Stake Spica" : "Connect Wallet"}
            </button>

        </div>
    );
}
