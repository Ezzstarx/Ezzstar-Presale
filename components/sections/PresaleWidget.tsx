"use client";

import { useState, useEffect } from "react";
import { ArrowDown, Loader2 } from "lucide-react";
import { useWallet } from "../providers/WalletProvider";
import MagicButton from "@/components/ui/MagicButton";
import { useWeb3Presale } from "@/hooks/useWeb3Presale";

export default function PresaleWidget() {
    const { isConnected, openWalletModal } = useWallet();
    const { buyWithToken } = useWeb3Presale();
    const [payCurrency, setPayCurrency] = useState<string>("USDT");
    const [amount, setAmount] = useState<string>("0.002");
    const [receiveAmount, setReceiveAmount] = useState<string>("0.05");
    const [isBuying, setIsBuying] = useState(false);

    // Force Rebuild
    const RATES: Record<string, number> = {
        "USDT": 25,      // 1 USDT = 25 SPCA
        "BNB": 16250,    // 1 BNB = $650 = 16.25k SPCA
        "USDC": 25,
        "DAI": 25        // 1 DAI = $1 = 25 SPCA,
    };

    const CURRENCIES = [
        { id: "USDT", icon: "/assets/icons/crypto/icon-usdt-v2.png" },
        { id: "BNB", icon: "/assets/icons/crypto/icon-bnb.png" },
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
        setIsBuying(true);
        try {
            await buyWithToken(payCurrency as any, parseFloat(amount));
            alert("Purchase successful!");
        } catch (e: any) {
            console.error(e);
            alert("Purchase failed: " + e.message);
        } finally {
            setIsBuying(false);
        }
    };

    return (
        <div className="relative w-full max-w-[320px] lg:max-w-[340px] h-[370px] mx-auto lg:mx-0 shrink-0">
            <div className="relative bg-transparent lg:bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/5 rounded-xl p-6 shadow-2xl h-full flex flex-col justify-center overflow-hidden">
                {/* Gradient Bottom Border */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white via-50% to-transparent opacity-100" />
                {/* Title */}
                <div className="text-left mb-4">
                    <h3 className="text-base font-tektur font-medium text-[#DE3BD6]">
                        1 SPCA = 0.04 USDT
                    </h3>
                </div>

                {/* Progress Bar - Thin Line with Traveling Glow */}
                <div className="mb-4 w-full flex flex-col items-center">
                    <div className="relative w-full h-[10px] bg-black border border-white rounded-full overflow-hidden">
                        {/* Progress Fill Container */}
                        <div className="absolute top-1/2 left-0 w-[75%] h-[2px] -translate-y-1/2 relative">
                            {/* 1. Static Gradient Glow (Behind everything) */}
                            <div
                                className="absolute top-[-6px] bottom-[-6px] left-0 w-full bg-gradient-to-r from-[#FF00FF] to-[#00FFF0] blur-[4px] opacity-60 z-0"
                                style={{ animation: 'colorCycle 4s linear infinite' }}
                            ></div>

                            {/* 2. Animated Glow Stream (Behind white line) - Left to Right */}
                            <div className="presale-glow-stream z-0"></div>

                            {/* 3. The White Line Itself (On Top) */}
                            <div className="absolute inset-0 bg-white z-10 rounded-full shadow-[0_0_15px_rgba(255,0,255,0.7)]"></div>
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
                        disabled={isBuying}
                        style={{ '--mask-bg': '#0a0a0c' } as React.CSSProperties}
                        className={`w-full py-2 border-[0.5px] border-white/30 rounded-xl font-tektur text-sm transition-all flex items-center justify-center gap-2 ${isConnected
                            ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 font-bold"
                            : "bg-transparent text-white/60 hover:bg-white/5"
                            }`}
                    >
                        {!isConnected ? "Connect Wallet" : isBuying ? <><Loader2 className="animate-spin" size={16} /> Processing...</> : "Buy Now"}
                    </MagicButton>
                </div>
            </div>
        </div>
    );
}
