"use client";

import { useState, useEffect } from "react";
import { ArrowDown, Loader2 } from "lucide-react";
import { useWallet } from "../providers/WalletProvider";
import MagicButton from "@/components/ui/MagicButton";

export default function PresaleWidget() {
    const { isConnected, openWalletModal } = useWallet();
    const [payCurrency, setPayCurrency] = useState<string>("USDT");
    const [amount, setAmount] = useState<string>("0.002");
    const [receiveAmount, setReceiveAmount] = useState<string>("0.5");

    // Force Rebuild
    const RATES: Record<string, number> = {
        "ETH": 650000,    // 1 ETH = $2600 = 650k SPCA
        "USDT": 250,      // 1 USDT = 250 SPCA
        "BNB": 162500,    // 1 BNB = $650 = 162.5k SPCA
        "SOL": 37500,     // 1 SOL = $150 = 37.5k SPCA
        "USDC": 250,
        "DAI": 250        // 1 DAI = $1 = 250 SPCA,
    };

    const CURRENCIES = [
        { id: "ETH", icon: "/assets/icons/crypto/icon-eth.png" },
        { id: "USDT", icon: "/assets/icons/crypto/icon-usdt-v2.png" },
        { id: "BNB", icon: "/assets/icons/crypto/icon-bnb.png" },
        { id: "SOL", icon: "/assets/icons/crypto/icon-sol.png" },
        { id: "USDC", icon: "/assets/icons/crypto/icon-usdc-v2.png" },
        { id: "DAI", icon: "/assets/icons/crypto/icon-dai.png" },
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
        <div className="relative w-[370px] h-[370px] mx-auto lg:mx-0 shrink-0">
            <div className="relative bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/5 rounded-xl p-6 shadow-2xl h-full flex flex-col justify-center overflow-hidden">
                {/* Gradient Bottom Border */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white via-50% to-transparent opacity-100" />
                {/* Title */}
                <div className="text-left mb-4">
                    <h3 className="text-base font-tektur font-medium text-[#DE3BD6]">
                        1 SPCA = 0.004 USDT
                    </h3>
                </div>

                {/* Progress Bar - Thin Line with Traveling Glow */}
                <style>{`
                    @keyframes glowTravel {
                        0% {
                            left: 0;
                            opacity: 0.6;
                            filter: brightness(1.2);
                            transform: translateY(-50%) scale(0.9);
                        }
                        100% {
                            left: calc(75% - 25px);
                            opacity: 1;
                            filter: brightness(2.7);
                            transform: translateY(-50%) scale(1.1);
                        }
                    }
                    
                    .glow-travel-presale {
                        animation: glowTravel 3s infinite ease-in;
                    }
                `}</style>
                <div className="mb-4 w-full flex flex-col items-center">
                    <div className="relative w-full h-[10px] bg-black border border-white rounded-full overflow-hidden">
                        {/* Thin Progress Line with Gradient */}
                        <div className="absolute top-1/2 left-0 w-[75%] h-[2px] -translate-y-1/2 bg-gradient-to-r from-[#FF00FF] via-[#00FFF0] to-[#FF00FF] rounded-full shadow-[0_0_8px_rgba(255,0,255,0.5)]">
                        </div>
                        {/* Traveling Glow Spot - Centered */}
                        <div className="glow-travel-presale absolute top-1/2 -translate-y-1/2 w-[25px] h-[2px] rounded-full"
                            style={{
                                background: 'radial-gradient(ellipse at center, rgba(0,255,240,1) 0%, transparent 70%)',
                                boxShadow: '0 0 10px 2px rgba(0,255,240,0.8), 0 0 20px 4px rgba(255,0,255,0.4)',
                                filter: 'brightness(2.1)'
                            }}>
                        </div>
                    </div>
                    <div className="w-full flex justify-between text-[12px] font-satoshi font-normal text-white/60 mt-2">
                        <span>75%</span>
                        <span>$9M</span>
                    </div>
                </div>

                {/* Balance Display */}
                <div className="text-left mb-1 px-1">
                    <span className="text-[12px] text-white/40 font-satoshi font-medium">Balance: 0.00 USDC</span>
                </div>

                {/* Input Fields - Unified Dark */}
                <div className="space-y-1.5">
                    {/* Pay Input */}
                    <div className="bg-[#050507] border-[0.5px] border-white/30 rounded-xl p-1.5 flex items-center gap-3">
                        <div className="w-6 h-6 flex items-center justify-center">
                            <img
                                src={CURRENCIES.find(c => c.id === payCurrency)?.icon}
                                alt={payCurrency}
                                className="w-[24px] h-[24px] object-contain"
                            />
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
                    <div className="text-left px-1 mt-0.5">
                        <span className="text-[12px] text-white/40 font-satoshi font-medium">Receive</span>
                    </div>

                    {/* Receive Input */}
                    <div className="bg-[#050507] border-[0.5px] border-white/30 rounded-xl p-1.5 flex items-center gap-3">
                        <div className="w-6 h-6 flex items-center justify-center">
                            <img
                                src="/assets/icons/crypto/icon-spca.png"
                                alt="SPCA"
                                className="w-[24px] h-[24px] object-contain"
                            />
                        </div>
                        <input
                            type="text"
                            readOnly
                            className="bg-transparent text-lg font-tektur font-bold w-full focus:outline-none text-white"
                            value={receiveAmount}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center mt-3 mb-3 w-full">
                    <div className="flex items-center w-fit h-[38px] bg-black/40 px-1 rounded-full">
                        {CURRENCIES.map((curr) => (
                            <button
                                key={curr.id}
                                onClick={() => setPayCurrency(curr.id)}
                                className={`relative flex items-center justify-center transition-all duration-300 h-[37px] ${payCurrency === curr.id
                                    ? "w-[100px] bg-teal-900/40 border-cyan-400 py-0 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                                    : "w-[48px]"
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <div className="flex items-center justify-center shrink-0">
                                        <img
                                            src={curr.icon}
                                            alt={curr.id}
                                            className="w-[15px] h-[15px] object-contain"
                                        />
                                    </div>
                                    {payCurrency === curr.id && (
                                        <span className="text-[14px] font-montserrat font-medium text-white tracking-wider whitespace-nowrap">
                                            {curr.id}
                                        </span>
                                    )}
                                </div>
                                {/* Right Border for all except last or active */}
                                {payCurrency !== curr.id && (
                                    <div className="absolute right-0 top-0 w-[1px] h-full bg-white/30 pointer-events-none"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Button */}
                <div className="flex flex-col gap-2">
                    <MagicButton
                        onClick={handleBuy}
                        style={{ '--mask-bg': '#0a0a0c' } as React.CSSProperties}
                        className={`w-full py-2 border-[0.5px] border-white/30 rounded-xl font-tektur text-sm transition-all flex items-center justify-center gap-2 ${isConnected
                            ? "bg-green-500/20 text-green-400 border-green-500/30 cursor-default"
                            : "bg-transparent text-white/60 hover:bg-white/5"
                            }`}
                    >
                        {!isConnected ? "Connect Wallet" : "CONNECTED"}
                    </MagicButton>
                </div>
            </div>
        </div>
    );
}
