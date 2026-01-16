"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Staking() {
    const [duration, setDuration] = useState(30); // days
    const [apy, setApy] = useState(12);
    const [amount, setAmount] = useState(1000);
    // Derived earnings calculation
    const earnings = (amount * (apy / 100) * (duration / 365));

    return (
        <section className="py-24 relative bg-[#080808] border-t border-white/5">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* Left Text */}
                <div>
                    <h2 className="text-5xl font-tektur font-bold mb-6">
                        Staking <span className="text-accent-pink">Calculator</span>
                    </h2>
                    <p className="text-gray-400 font-satoshi text-lg mb-8">
                        Stake your SPICA tokens to earn passive rewards. The longer you lock, the higher the APY multiplier.
                    </p>

                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-accent-cyan"></div>
                            <span className="font-tektur text-white">Up to 450% APY</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-accent-pink"></div>
                            <span className="font-tektur text-white">Daily Rewards Distribution</span>
                        </li>
                    </ul>
                </div>

                {/* Right: Calculator Card */}
                <div className="glass-card rounded-2xl p-8 relative overflow-hidden group">
                    {/* Backglow */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent-cyan/10 blur-[80px] rounded-full group-hover:bg-accent-cyan/20 transition-colors duration-500"></div>

                    {/* Tabs */}
                    <div className="flex bg-black/40 rounded-lg p-1 mb-8 relative">
                        <motion.div
                            layoutId="activeTab"
                            className="absolute top-1 bottom-1 left-1 w-[48%] bg-white/10 rounded-md"
                        />
                        <button className="flex-1 py-2 text-center text-sm font-tektur font-bold relative z-10 text-white">Calculator</button>
                        <button className="flex-1 py-2 text-center text-sm font-tektur font-bold relative z-10 text-gray-500 hover:text-white transition-colors">My Staking</button>
                    </div>

                    {/* Slider */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-400 font-satoshi">Lock Duration</span>
                            <span className="text-white font-bold font-tektur">{duration} Days</span>
                        </div>
                        <input
                            type="range"
                            min="7"
                            max="365"
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-pink hover:accent-accent-cyan transition-colors"
                        />
                        <div className="flex justify-between text-xs text-gray-600 mt-2">
                            <span>7 Days</span>
                            <span>1 Year</span>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-black/40 rounded-xl p-6 border border-white/5">
                        <div className="text-sm text-gray-400 mb-1">Estimated Earnings</div>
                        <div className="text-4xl font-tektur font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-pink animate-pulse-scale">
                            {earnings.toFixed(2)} <span className="text-sm text-white/50">SPICA</span>
                        </div>
                    </div>

                    <button className="w-full mt-6 py-4 btn-primary-glow text-white font-bold rounded-xl font-tektur">
                        Stake Now
                    </button>
                </div>
            </div>
        </section>
    );
}
