"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "../providers/WalletProvider";

interface DummyStake {
    id: number;
    wallet: string;
    amount: number;
    unlockTime: number; // timestamp
}

export default function Staking() {
    const { isConnected, openWalletModal } = useWallet();
    const [duration, setDuration] = useState(30); // days
    const [apy, setApy] = useState(12);
    const [amount, setAmount] = useState(1000);
    const [now, setNow] = useState(Date.now());
    const [dummyStakes, setDummyStakes] = useState<DummyStake[]>([]);

    useEffect(() => {
        // Generate 55 dummy transactions
        const generateDummyStakes = () => {
            const list: DummyStake[] = [];
            // Use a deterministic-ish approach for visual consistency if needed, but random is fine for "dummy".
            // We'll just generate them once on mount.
            const nowTime = Date.now();
            for (let i = 0; i < 55; i++) {
                const randomAddress = `0x${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}...${Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0')}`;

                list.push({
                    id: i,
                    wallet: randomAddress,
                    amount: Math.floor(Math.random() * 500000) + 1000,
                    unlockTime: nowTime + Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000) + 3600000 // 1 hour to 60 days
                });
            }
            // Sort by largest amount
            return list.sort((a, b) => b.amount - a.amount);
        };
        setDummyStakes(generateDummyStakes());

        // Update countdown every second
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Derived earnings calculation
    const earnings = (amount * (apy / 100) * (duration / 365));

    const handleStakeAction = () => {
        if (!isConnected) {
            openWalletModal();
        } else {
            console.log("Stake Spica button clicked. Implementing real staking logic later.");
            alert("Staking functionality is coming soon.");
        }
    };

    const formatCountdown = (unlockTime: number, currentNow: number) => {
        const diff = unlockTime - currentNow;
        if (diff <= 0) return "Unlocked";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) return `${days}d ${hours}h`;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <section className="py-24 relative bg-transparent border-t border-white/5">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">

                {/* Left Text */}
                <div className="sticky top-24">
                    <h2 className="text-5xl font-tektur font-bold mb-6">
                        Staking <span className="text-accent-pink">Calculator</span>
                    </h2>
                    <p className="text-gray-400 font-satoshi text-lg mb-8">
                        Stake your SPICA tokens to earn passive rewards. The longer you lock, the higher the APY multiplier.
                    </p>

                    <ul className="space-y-4 mb-12">
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-accent-cyan"></div>
                            <span className="font-tektur text-white">Up to 450% APY</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-accent-pink"></div>
                            <span className="font-tektur text-white">Daily Rewards Distribution</span>
                        </li>
                    </ul>

                    {/* Live Staking Feed (Dummy) */}
                    <div className="hidden md:block">
                        <h3 className="text-xl font-tektur font-bold text-white mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            Live Staking Activity
                        </h3>
                        <div className="bg-black/40 border border-white/5 rounded-xl h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <table className="w-full text-left text-sm font-satoshi text-gray-300">
                                <thead className="bg-white/5 sticky top-0 backdrop-blur-md">
                                    <tr>
                                        <th className="py-3 px-4 font-medium text-white/50">Wallet</th>
                                        <th className="py-3 px-4 font-medium text-white/50 text-right">Amount</th>
                                        <th className="py-3 px-4 font-medium text-white/50 text-right">Unlocks In</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dummyStakes.map(stake => (
                                        <tr key={stake.id} className="border-t border-white/5 hover:bg-white/5">
                                            <td className="py-3 px-4 font-tektur text-accent-cyan/80">{stake.wallet}</td>
                                            <td className="py-3 px-4 text-right font-medium text-white">{stake.amount.toLocaleString()} SPCA</td>
                                            <td className="py-3 px-4 text-right text-accent-pink/80 font-mono text-xs">{formatCountdown(stake.unlockTime, now)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
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

                    <button
                        onClick={handleStakeAction}
                        className="w-full mt-6 py-4 btn-primary-glow text-white font-bold rounded-xl font-tektur transition-all"
                    >
                        {isConnected ? "Stake Spica" : "Connect Wallet"}
                    </button>
                </div>
            </div>

            {/* Mobile dummy stakes feed */}
            <div className="container mx-auto px-6 mt-12 md:hidden">
                <h3 className="text-xl font-tektur font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    Live Staking Activity
                </h3>
                <div className="bg-black/40 border border-white/5 rounded-xl h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <table className="w-full text-left text-sm font-satoshi text-gray-300">
                        <thead className="bg-white/5 sticky top-0 backdrop-blur-md">
                            <tr>
                                <th className="py-2 px-3 font-medium text-white/50 text-xs">Wallet</th>
                                <th className="py-2 px-3 font-medium text-white/50 text-right text-xs">Amount</th>
                                <th className="py-2 px-3 font-medium text-white/50 text-right text-xs">Unlocks In</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyStakes.map(stake => (
                                <tr key={stake.id} className="border-t border-white/5">
                                    <td className="py-2 px-3 font-tektur text-accent-cyan/80 text-xs truncate max-w-[80px]">{stake.wallet}</td>
                                    <td className="py-2 px-3 text-right font-medium text-white text-xs">{stake.amount.toLocaleString()}</td>
                                    <td className="py-2 px-3 text-right text-accent-pink/80 font-mono text-[10px]">{formatCountdown(stake.unlockTime, now)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
