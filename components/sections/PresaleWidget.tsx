"use client";

import { useState, useEffect } from "react";
import { ArrowDown, Loader2 } from "lucide-react";
import { useWallet } from "../providers/WalletProvider";

export default function PresaleWidget() {
    const { isConnected, openWalletModal } = useWallet();
    const [payCurrency, setPayCurrency] = useState<string>("USDT");
    const [amount, setAmount] = useState<string>("0.002");
    const [receiveAmount, setReceiveAmount] = useState<string>("0.5");

    const RATES: Record<string, number> = {
        "USDT": 250,      // 1 USDT = 250 SPCA
        "BTC": 24000000,  // 1 BTC = $96,000 = 24M SPCA
        "ETH": 825000,    // 1 ETH = $3,300 = 825k SPCA
        "SOL": 47500,     // 1 SOL = $190 = 47.5k SPCA
        "BNB": 162500,    // 1 BNB = $650 = 162.5k SPCA
        "USDC": 250
    };

    const CURRENCIES = [
        { id: "USDT", icon: "₮" },
        { id: "BTC", icon: "₿" },
        { id: "ETH", icon: "Ξ" },
        { id: "SOL", icon: "S" },
        { id: "BNB", icon: "B" },
        { id: "USDC", icon: "U" }
    ];

    useEffect(() => {
        calculateReceive(amount, payCurrency);
    }, [amount, payCurrency]);

    const calculateReceive = (val: string, curr: string) => {
        const num = parseFloat(val);
        if (isNaN(num)) {
            setReceiveAmount("0");
            return;
        }
        const rate = RATES[curr] || 250;
        setReceiveAmount((num * rate).toLocaleString(undefined, { maximumFractionDigits: 2 }));
    };

    const handleBuy = async () => {
        if (!isConnected) {
            openWalletModal();
            return;
        }
        // Transaction logic disabled as per user request
        console.log("Wallet already connected. Purchase functionality is currently disabled.");
    };

    return (
        <div className="relative w-[422px] h-[431px] mx-auto lg:mx-0">
            <div className="relative bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl h-full flex flex-col justify-center">
                {/* Title */}
                <div className="text-left mb-6">
                    <h3 className="text-base font-tektur font-bold text-[#ff00ff]">
                        1 SPCA = 0.004 USDT
                    </h3>
                </div>

                {/* Progress Bar - Slim & Glowing */}
                <div className="mb-6">
                    <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ff00ff] to-[#7000ff] w-[25%] rounded-full shadow-[0_0_10px_#ff00ff]"></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-tektur text-white/40 mt-2">
                        <span>25%</span>
                        <span>$3M</span>
                    </div>
                </div>

                {/* Balance Display */}
                <div className="text-left mb-2 px-1">
                    <span className="text-[10px] text-white/40 font-satoshi">Balance: 0.00 USDC</span>
                </div>

                {/* Input Fields - Unified Dark */}
                <div className="space-y-3">
                    {/* Pay Input */}
                    <div className="bg-[#050507] border border-white/5 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-400">
                            {CURRENCIES.find(c => c.id === payCurrency)?.icon}
                        </div>
                        <input
                            type="number"
                            step="any"
                            className="bg-transparent text-lg font-tektur font-bold w-full focus:outline-none text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    {/* Label */}
                    <div className="text-left px-1">
                        <span className="text-[10px] text-white/40 font-satoshi">Receive</span>
                    </div>

                    {/* Receive Input */}
                    <div className="bg-[#050507] border border-white/5 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#ff00ff]/10 border border-[#ff00ff]/20 flex items-center justify-center text-[10px] font-bold text-[#ff00ff]">
                            S
                        </div>
                        <input
                            type="text"
                            readOnly
                            className="bg-transparent text-lg font-tektur font-bold w-full focus:outline-none text-white"
                            value={receiveAmount}
                        />
                    </div>
                </div>

                {/* Currency Selector - Matches Reference Image */}
                <div className="flex items-center justify-between mt-6 mb-6 px-1">
                    <div className="flex items-center w-full bg-black/40 rounded-xl border border-white/5 overflow-hidden">
                        {CURRENCIES.map((curr, idx) => (
                            <div key={curr.id} className="flex items-center flex-1">
                                <button
                                    onClick={() => setPayCurrency(curr.id)}
                                    className={`flex items-center justify-center transition-all duration-300 ${payCurrency === curr.id
                                        ? "bg-teal-900/40 border-r-2 border-cyan-400 py-3 px-4 flex-[2.5]"
                                        : "py-3 px-2 flex-1 grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`flex items-center justify-center rounded-full bg-white/10 font-bold ${payCurrency === curr.id ? "w-8 h-8 text-base" : "w-6 h-6 text-xs"
                                            }`}>
                                            {curr.icon}
                                        </div>
                                        {payCurrency === curr.id && (
                                            <span className="text-sm font-tektur font-bold text-white tracking-wider">
                                                {curr.id}
                                            </span>
                                        )}
                                    </div>
                                </button>
                                {idx < CURRENCIES.length - 1 && payCurrency !== curr.id && payCurrency !== CURRENCIES[idx + 1].id && (
                                    <div className="w-[1px] h-6 bg-white/10"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleBuy}
                        className={`w-full py-2.5 border border-white/10 rounded-xl font-tektur text-sm transition-all flex items-center justify-center gap-2 ${isConnected
                            ? "bg-green-500/20 text-green-400 border-green-500/30 cursor-default"
                            : "bg-transparent text-white/60 hover:bg-white/5"
                            }`}
                    >
                        {!isConnected ? "Connect Wallet" : "CONNECTED"}
                    </button>
                </div>
            </div>
        </div>
    );
}
