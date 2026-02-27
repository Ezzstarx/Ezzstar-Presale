"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useWallet } from "../providers/WalletProvider";
import WithdrawModal from "../ui/WithdrawModal";
import MagicButton from "../ui/MagicButton";
import { useWeb3Presale, useReferralData } from "@/hooks/useWeb3Presale";
import { formatUnits } from "viem";

const MagicIcon = ({ src, alt, color, reverse = false }: { src: string, alt: string, color: string, reverse?: boolean }) => {
    return (
        <div className="mb-4 relative w-12 h-12 md:w-20 md:h-20 flex items-center justify-center shrink-0">
            {/* Base Image */}
            <Image
                src={src}
                alt={alt}
                width={80}
                height={80}
                className="relative z-10 object-contain w-full h-full"
            />
            {/* Glow Overlay - Masked to Image Shape and Ring Area */}
            <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                    // Mask 1: Radial Ring Only - Ultra Thin and on Border
                    // Adjusted to 88-100% for a very thin, sharp rim at the edge
                    WebkitMaskImage: `radial-gradient(closest-side, transparent 88%, black 90%, black 100%, transparent 100%)`,
                    maskImage: `radial-gradient(closest-side, transparent 88%, black 90%, black 100%, transparent 100%)`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                }}
            >
                <div
                    className="absolute inset-[-100%]"
                    style={{
                        // Double-Faded Arc: Fades in, Peaks, Fades out. 
                        // transparent -> Color (315deg) -> transparent
                        // 90-degree total arc span (270-360)
                        background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, ${color} 315deg, transparent 360deg)`,
                        // Keep drop shadow for bloom
                        filter: `drop-shadow(0 0 8px ${color})`,
                        animation: `spin 3s linear infinite ${reverse ? 'reverse' : 'normal'}`
                    }}
                />
            </div>
        </div>
    );
};

export default function ReferralHero() {
    const { isConnected, address, openWalletModal } = useWallet();
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
    const { setupReferral, withdrawRewards } = useWeb3Presale();
    const { data: refData } = useReferralData(address);

    const [isWithdrawing, setIsWithdrawing] = useState(false);

    // Setup referral when wallet connects
    useEffect(() => {
        if (isConnected && address) {
            setupReferral(address);
        }
    }, [isConnected, address]);

    // Parse data safely
    const spicaRaw = refData?.[0]?.result as bigint | undefined;
    const bnbRaw = refData?.[1]?.result as bigint | undefined;
    const usdtRaw = refData?.[2]?.result as bigint | undefined;
    const usdcRaw = refData?.[3]?.result as bigint | undefined;
    const daiRaw = refData?.[4]?.result as bigint | undefined;

    const spicaFormatted = spicaRaw ? parseFloat(formatUnits(spicaRaw, 18)) : 0;

    // Total stablecoins (assuming 18 decimals)
    const totalStables =
        (usdtRaw ? parseFloat(formatUnits(usdtRaw, 18)) : 0) +
        (usdcRaw ? parseFloat(formatUnits(usdcRaw, 18)) : 0) +
        (daiRaw ? parseFloat(formatUnits(daiRaw, 18)) : 0);

    const handleWithdraw = async () => {
        if (!isConnected) return;
        setIsWithdrawing(true);
        try {
            const tx = await withdrawRewards();
            alert("Withdraw transaction submitted!");
        } catch (error: any) {
            console.error(error);
            alert("Withdraw failed: " + error.message);
        } finally {
            setIsWithdrawing(false);
            setIsWithdrawOpen(false); // Can open a success modal instead if preferred
        }
    };

    return (
        <div className="w-full max-w-[1000px] min-h-[423px] mx-auto">
            <div className="glass-card rounded-sm p-4 md:p-12 relative overflow-hidden z-10 h-full flex flex-col justify-center">
                {/* Header Content */}
                <div className="mb-24 relative z-10 w-full text-left">
                    <div className="w-full mb-4">
                        <h2 className="text-[32px] font-tektur font-medium tracking-[-1px] mb-0 text-white text-left">
                            Invite Your Friends And Earn <span className="text-white">20%</span>
                        </h2>
                    </div>
                    <p className="text-white font-satoshi font-medium text-[13px] max-w-5xl text-left">
                        Share the love, stack the rewards! Earn 10% of what your friend deposits and another 10% in SPICA when they invest $10+ in the pre-sale. <br /> Cash out anytime — no limits!
                    </p>
                </div>

                {/* Steps Content */}
                <div className="relative">
                    {/* Curved Connector Lines (Desktop) */}
                    <svg className="hidden md:block absolute top-[-50px] left-0 w-full h-[170px] pointer-events-none z-0" viewBox="0 0 800 170" preserveAspectRatio="none">
                        {/* Curve 1: Left to Middle - Top Right Origin */}
                        <path
                            d="M 155 65 Q 185 5 355 105"
                            fill="none"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="2"
                            strokeDasharray="2 4"
                        />
                        {/* Curve 2: Middle to Right */}
                        <path
                            d="M 425 65 Q 455 10 625 105"
                            fill="none"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="2"
                            strokeDasharray="2 4"
                        />
                    </svg>

                    <div className="grid grid-cols-3 gap-2 md:gap-8 relative z-10">
                        {/* Mobile Dotted Line Connecting Icons */}
                        <svg className="md:hidden absolute top-[4px] left-0 w-full h-[40px] -z-10 overflow-visible" viewBox="0 0 300 40" preserveAspectRatio="none">
                            {/* Curve 1: Step 1 to Step 2 */}
                            <path
                                d="M 78 20 Q 112 -10 125 20"
                                fill="none"
                                stroke="rgba(255,255,255,0.4)"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                            />
                            {/* Curve 2: Step 2 to Step 3 */}
                            <path
                                d="M 178 20 Q 212 -5 225 20"
                                fill="none"
                                stroke="rgba(255,255,255,0.4)"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                            />
                        </svg>
                        {/* Step 1 */}
                        <div className="flex flex-col items-center">
                            <MagicIcon
                                src="/assets/images/Share-Link-New.png"
                                alt="Share Your Link"
                                color="#068AFE"
                            />
                            <h3 className="text-blue-500 font-tektur font-medium mb-1 text-[10px] md:text-base text-center">Share Your Link</h3>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center">
                            <MagicIcon
                                src="/assets/images/Friend-Invest-New.png"
                                alt="Friend Invests $10"
                                color="#DED73B"
                                reverse={true}
                            />
                            <h3 className="text-yellow-500 font-tektur font-medium mb-1 text-[10px] md:text-base text-center">Friend Invests $10</h3>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center">
                            <MagicIcon
                                src="/assets/images/Earn-Instantly-New.png"
                                alt="You Earn Instantly"
                                color="#52FF00"
                            />
                            <h3 className="text-green-500 font-tektur font-medium mb-1 text-[10px] md:text-base text-center">You Earn Instantly</h3>
                        </div>
                    </div>

                    {/* Connector Button or Dashboard */}
                    <div className="mt-12">
                        {!isConnected ? (
                            <div className="text-center">
                                <button onClick={openWalletModal} className="inline-flex items-center justify-center gap-1 md:gap-3 px-2 md:px-4 py-2 rounded-full border border-white/40 bg-black text-white font-tektur text-[10px] md:text-sm hover:bg-white/5 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] whitespace-nowrap">
                                    <Image src="/assets/images/Ref-Connect.png" alt="" width={24} height={24} className="w-4 h-4 md:w-6 md:h-6" />
                                    <span>Connect your wallet to access the referral system</span>
                                    <Image src="/assets/images/Ref-Connect.png" alt="" width={24} height={24} className="w-4 h-4 md:w-6 md:h-6" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-row items-center justify-center gap-2 md:gap-6">
                                {/* Button 1 */}
                                <MagicButton className="px-4 h-[32px] rounded-md shadow-md backdrop-blur-md text-[10px] md:text-sm font-tektur bg-black border-[0.5px] border-white/20 text-white/80">
                                    EARNED: <span className="font-satoshi text-white ml-1">${totalStables.toFixed(2)}</span>
                                </MagicButton>

                                {/* Button 2 with Icon */}
                                <MagicButton className="px-4 h-[32px] rounded-md shadow-md backdrop-blur-md text-[10px] md:text-sm font-tektur bg-black border-[0.5px] border-white/20 text-white/80 hover:text-white">
                                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                                        SPCA: <span className="font-satoshi text-white">{spicaFormatted.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                        <Image src="/assets/icons/crypto/icon-spca.png" alt="SPCA" width={20} height={20} className="w-4 h-4 md:w-5 md:h-5 object-contain" />
                                    </div>
                                </MagicButton>

                                {/* Button 3: Withdraw */}
                                <MagicButton
                                    onClick={handleWithdraw}
                                    disabled={isWithdrawing}
                                    style={{ '--mask-bg': '#96428E' } as React.CSSProperties}
                                    className="px-4 h-[32px] rounded-md shadow-md backdrop-blur-md text-[14px] md:text-sm font-tektur text-white hover:brightness-110 transition-all tracking-wide"
                                >
                                    {isWithdrawing ? "Processing..." : "Withdraw Reward"}
                                </MagicButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Keeping the WithdrawModal as a potential fallback or extended feature, though we use direct withdraw now */}
            <WithdrawModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} />
        </div>
    );
}
