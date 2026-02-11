"use client";

import PresaleWidget from "./PresaleWidget";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicButton from "@/components/ui/MagicButton";

const StarBadge = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0l1.2 7.2L19.2 2.4l-4.8 6L24 12l-9.6 3.6 4.8 6-7.2-4.8L12 24l-1.2-7.2-7.2 4.8 4.8-6L0 12l9.6-3.6-4.8-6 7.2 4.8z" />
    </svg>
);

const NFT_TIERS = [
    {
        id: "lily",
        name: "Lily NFT",
        price: "$50",
        image: "/assets/images/Lily.jpg",
        badge: "/assets/images/LilyBadge.png",
        color: "text-[#4ADE80]",
        borderColor: "border-[#4ADE80]",
        borderGradient: "linear-gradient(to bottom, rgb(74,222,128) 0%, rgb(74,222,128) 30%, rgb(37,111,64) 50%, black 100%)", // Fades from 30%
        zIndex: 10,
        benefits: [
            "Bronze Star Verified Glowing Badge",
            "Standard Profile Frame",
            "Access to Basic Features",
            "Standard Community Support",
            "1 Month Free Membership",
            "Tradable: Sell Your Status"
        ]
    },
    {
        id: "spica",
        name: "Spica NFT",
        price: "$150",
        image: "/assets/images/Spica.jpg",
        badge: "/assets/images/SpicaBadge.png",
        color: "text-[#D946EF]",
        borderColor: "border-[#D946EF]",
        borderGradient: "linear-gradient(to bottom, rgb(217,70,239) 0%, rgb(217,70,239) 60%, rgb(109,35,120) 80%, black 100%)", // Fades from 60%
        zIndex: 30, // Center card on top
        benefits: [
            "Gold Star Verified Glowing Badge",
            "Animated Profile Frame",
            "Early Access to New Feature",
            "Discounted Premium Merch Every Quarter",
            "3 Months Free Membership",
            "Tradable: Sell Your Status"
        ]
    },
    {
        id: "buffo",
        name: "Buffo NFT",
        price: "$100",
        image: "/assets/images/Buffo.jpg",
        badge: "/assets/images/BuffoBadge.png",
        color: "text-[#EF4444]",
        borderColor: "border-[#EF4444]",
        borderGradient: "linear-gradient(to bottom, rgb(239,68,68) 0%, rgb(239,68,68) 85%, rgb(120,34,34) 92%, black 100%)", // Fades from 85%
        zIndex: 20,
        benefits: [
            "Silver Star Verified Glowing Badge",
            "Silver Profile Frame",
            "Early Access to Beta Features",
            "Discounted Merch Selection",
            "2 Months Free Membership",
            "Tradable: Sell Your Status"
        ]
    }
];

import { useWallet } from "../providers/WalletProvider";
// import WalletModal from "../ui/WalletModal";

import NextImage from "next/image";

export default function Hero() {
    // Card Swap State
    const [tiers, setTiers] = useState(NFT_TIERS);

    const handleCardClick = (tierId: string) => {
        const clickedIndex = tiers.findIndex(t => t.id === tierId);
        // If clicking a side card (not center), swap it with center
        if (clickedIndex !== 1) {
            const newTiers = [...tiers];
            const centerCard = newTiers[1];
            const clickedCard = newTiers[clickedIndex];

            // Swap
            newTiers[1] = clickedCard;
            newTiers[clickedIndex] = centerCard;

            setTiers(newTiers);
        }
    };

    // Desktop State
    const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
    // Removed hoveredTierId state as we use click now
    const selectedTier = NFT_TIERS.find(t => t.id === selectedTierId);

    // Wallet State
    const { isConnected, address, disconnectWallet, openWalletModal } = useWallet();

    // Mobile State
    const [mobileTab, setMobileTab] = useState<'widget' | 'spica' | 'buffo' | 'lily'>('widget');

    // MAPPING for Mobile Tabs: Icon + Content
    const MOBILE_TABS = [
        { id: 'widget', icon: '/assets/images/Product-icon1-M.png', label: 'Widget' },
        { id: 'spica', icon: '/assets/images/Product-icon2-M.png', label: 'Spica' }, // Purple
        { id: 'buffo', icon: '/assets/images/Product-icon3-M.png', label: 'Buffo' }, // Red
        { id: 'lily', icon: '/assets/images/Product-icon4-M.png', label: 'Lily' },   // Green
    ];

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-start pt-24 pb-0 overflow-x-hidden text-center sm:px-6 bg-[url('/assets/images/background.png')] bg-cover bg-center">
            <div className="container mx-auto max-w-[1400px] relative z-10 flex flex-col items-center">

                {/* Header Content */}
                <div className="mb-8 md:mb-12 space-y-4">
                    <h1 className="text-[55px] font-tektur font-medium tracking-[-1px] leading-tight text-[#FAFAFA]">
                        Empowering the Future of <br />
                        <span className="tracking-normal font-medium leading-none">
                            Digital <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#FC009F_30%,#3EE1F0_70%)]">Aliens!</span>
                        </span>
                    </h1>

                    <div className="flex flex-row gap-4 justify-center pt-4">
                        <MagicButton className="w-[155px] h-[34px] rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-md text-[16px] font-medium font-tektur bg-black border-[0.5px] border-white/30 text-[#888888] hover:text-white">
                            Presale is Live
                        </MagicButton>
                        <a href="https://ezzstar.gitbook.io/ezzstar-gitbook" target="_blank" rel="noopener noreferrer">
                            <MagicButton
                                style={{ '--mask-bg': '#2C2C2C' } as React.CSSProperties}
                                className="w-[155px] h-[34px] rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-md text-[16px] font-medium font-tektur bg-[#2C2C2C] border-[0.5px] border-white/30 text-[#888888] hover:text-white"
                            >
                                Whitepaper
                            </MagicButton>
                        </a>
                    </div>
                </div>

                {/* DESKTOP CONTENT (Hidden on Mobile) */}
                <div className="hidden lg:grid w-full grid-cols-12 gap-4 items-center justify-center relative min-h-[500px]">
                    {/* LEFT: Presale Widget */}
                    <div className="col-span-4 flex justify-start z-40 ml-[100px]">
                        <PresaleWidget />
                    </div>

                    {/* RIGHT AREA: Dynamic Interaction Zone */}
                    <div
                        className={`col-span-8 flex flex-row items-center relative h-[420px] w-full transition-all duration-500 ease-in-out ${selectedTier ? 'justify-end pr-0 translate-x-20' : 'justify-start pl-[140px] translate-x-0'}`}
                    >
                        {/* CENTER PANEL: Benefits */}
                        <AnimatePresence mode="popLayout">
                            {selectedTier && (
                                <motion.div
                                    key="benefits-panel"
                                    initial={{ width: 0, opacity: 0, marginRight: 0 }}
                                    animate={{ width: 380, opacity: 1, marginRight: 16 }} // Restored 380px, Tightened gap
                                    exit={{ width: 0, opacity: 0, marginRight: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    // Dynamic Border Color
                                    className={`overflow-hidden flex-shrink-0 h-[360px] backdrop-blur-md w-full relative z-30 shadow-2xl`}
                                    style={{
                                        backgroundColor: `${selectedTier.color.replace('text-[', '').replace(']', '')}0D` // 7% opacity
                                    }}
                                >
                                    {/* Manual Override for border opacity since "border-[#...]/30" might not work if not JIT optimized perfectly on the fly, but usually fine.
                                        Let's use inline style for border-color to ensure we can control opacity if needed, OR just trust the tailwind class provided in the object. 
                                        The object has "borderColor: 'border-[#...]'"
                                    */}
                                    <div className={`w-full h-full absolute inset-0 border ${selectedTier.borderColor} opacity-30 pointer-events-none`} />

                                    <div className="w-[360px] px-3 py-5 h-full flex flex-col items-start justify-center relative z-10">

                                        {/* Header Section - No Divider, Larger Text, Single Line Forced */}
                                        <div className="flex flex-row justify-between items-center w-full mb-4 whitespace-nowrap">
                                            {/* Left: Badge + Title */}
                                            <div className="flex items-center gap-1.5">
                                                {/* Actual NFT Badge */}
                                                <img
                                                    src={selectedTier.badge}
                                                    alt="Badge"
                                                    className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                                                />
                                                {/* Semibold Tektur, No Glow */}
                                                <h3 className={`text-3xl font-tektur font-semibold uppercase tracking-wide ${selectedTier.color}`}>
                                                    {selectedTier.name}
                                                </h3>
                                            </div>

                                            {/* Right: Price */}
                                            <div className="flex items-center gap-1.5">
                                                {/* Regular Satoshi */}
                                                <span className="text-white text-base font-satoshi font-normal opacity-80">Invest:</span>
                                                {/* Semibold Tektur, No Glow */}
                                                <span className={`text-3xl font-tektur font-semibold ${selectedTier.color}`}>
                                                    {selectedTier.price}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Benefits List */}
                                        <ul className="space-y-0.5 w-full pl-1">
                                            {selectedTier.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white shrink-0 shadow-[0_0_4px_white]"></div>
                                                    {/* Regular Satoshi */}
                                                    <span className="text-white text-base font-normal font-satoshi leading-snug text-left">
                                                        {benefit}
                                                    </span>
                                                </li>
                                            ))}
                                            {/* Auto-Calculated Receive Amount - No Glow */}
                                            <li className="flex items-start gap-3 pt-1">
                                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white shrink-0 shadow-[0_0_4px_white]"></div>
                                                <span className="text-white text-base font-normal font-satoshi leading-snug text-left">
                                                    Receive: <span className={`font-bold ${selectedTier.color}`}>{(parseInt(selectedTier!.price.replace('$', '')) / 0.004).toLocaleString()} SPCA</span>
                                                </span>
                                            </li>
                                        </ul>

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* RIGHT: NFT Cards Deck */}
                        <motion.div
                            className="flex flex-row items-center relative h-[400px] w-[582px]"
                            layout
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            {tiers.map((tier, index) => {
                                const isDetailsOpen = !!selectedTierId;
                                const defaultMargin = index === 0 ? 0 : -120; // Adjusted overlap
                                const collapsedMargin = index === 0 ? 0 : -200; // Tighter collapse
                                const currentMargin = isDetailsOpen ? collapsedMargin : defaultMargin;

                                // Position-based Z-Index (Center=30, Right=20, Left=10)
                                let baseZIndex = 10;
                                if (index === 1) baseZIndex = 30; // Center
                                else if (index === 2) baseZIndex = 20; // Right

                                const activeZIndex = baseZIndex;
                                const isOtherCardActive = !!selectedTierId && selectedTierId !== tier.id;

                                return (
                                    <motion.div
                                        layout
                                        key={tier.id}
                                        onClick={() => handleCardClick(tier.id)}
                                        // RESIZED CARDS: w-[260px] h-[360px]
                                        className="relative w-[260px] h-[360px] rounded-xl p-[2px] flex flex-col overflow-hidden transition-all duration-300 transform-gpu cursor-pointer"
                                        style={{
                                            zIndex: activeZIndex,
                                            background: tier.borderGradient
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        animate={{
                                            marginLeft: isOtherCardActive ? 0 : (selectedTierId === tier.id ? 0 : currentMargin), // Removed the +20 gap when active to keep it tight
                                            width: isOtherCardActive ? 0 : 260,
                                            opacity: isOtherCardActive ? 0 : 1,
                                            scale: isDetailsOpen ? 1 : 1,
                                            padding: isOtherCardActive ? 0 : '',
                                            marginRight: isOtherCardActive ? 0 : '',
                                        }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                    >
                                        <div className="relative h-full w-full bg-[#0a0a0c] rounded-[calc(0.75rem-1px)] overflow-hidden flex flex-col shadow-2xl">
                                            {/* Image Section */}
                                            <div className="relative w-full h-[72%] bg-black p-3 overflow-hidden">
                                                <img src={tier.image} alt={tier.name} className="w-full h-full object-cover object-center border border-white/10" />
                                            </div>
                                            {/* Content Section */}
                                            <div className="h-[28%] w-full flex flex-col items-center justify-center bg-black/60 backdrop-blur-md pt-1 pb-2 px-4 relative z-10">
                                                <div className="flex items-center gap-2 mb-[2px] justify-center w-full">
                                                    <img src={tier.badge} alt="Badge" className="w-6 h-6 object-contain" />
                                                    <h3 className={`text-[17px] font-medium font-tektur uppercase ${tier.color} tracking-wider`}>{tier.name}</h3>
                                                </div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-gray-400 text-xs font-satoshi">Invest:</span>
                                                    <span className={`font-medium text-[15px] ${tier.color}`}>{tier.price}</span>
                                                </div>
                                                <MagicButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedTierId(selectedTierId === tier.id ? null : tier.id);
                                                    }}
                                                    style={{ '--mask-bg': '#000000' } as React.CSSProperties}
                                                    className={`w-[124px] h-[30px] rounded-lg border-[0.5px] border-white/30 font-tektur font-medium text-xs text-white transition-all ${selectedTierId === tier.id ? 'bg-white/20' : 'bg-transparent'}`}
                                                >
                                                    {selectedTierId === tier.id ? "Close Benefits" : "See Benefits"}
                                                </MagicButton>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>

                {/* MOBILE CONTENT (Visible on Mobile/Tablet) */}
                <div className="flex lg:hidden flex-col w-full items-center gap-8 min-h-[600px] pb-12">

                    {/* Content Display Area */}
                    <div className="w-full flex justify-center items-start min-h-[480px]">
                        <AnimatePresence mode="wait">
                            {mobileTab === 'widget' ? (
                                <motion.div
                                    key="mobile-widget"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full flex justify-center"
                                >
                                    <PresaleWidget />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={`mobile-tier-${mobileTab}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full flex flex-col items-center justify-center px-4"
                                >
                                    {(() => {
                                        const tier = NFT_TIERS.find(t => t.id === mobileTab);
                                        if (!tier) return null;

                                        // Calculate received amount (Example logic: Price / 0.004)
                                        const priceVal = parseInt(tier.price.replace('$', ''));
                                        const receiveAmount = (priceVal / 0.004).toLocaleString();

                                        return (
                                            <div
                                                className="relative w-full max-w-[340px] rounded-[32px] p-[2px] flex flex-col items-start gap-6"
                                                style={{ background: tier.borderGradient }}
                                            >
                                                <div className="relative h-full w-full bg-[#0a0a0c]/90 backdrop-blur-xl rounded-[calc(2rem-1px)] p-6 overflow-hidden flex flex-col">

                                                    {/* Top: Icon + Name */}
                                                    <div className="flex items-center gap-3 w-full">
                                                        <img src={tier.badge} alt="Badge" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                                                        <h3 className={`text-2xl font-tektur font-medium uppercase tracking-wider ${tier.color} drop-shadow-[0_0_10px_currentColor]`}>
                                                            {tier.name}
                                                        </h3>
                                                    </div>

                                                    {/* Middle: Bullet Points */}
                                                    <ul className="space-y-3 w-full pl-2">
                                                        {tier.benefits.map((benefit, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-200 font-medium">
                                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />
                                                                <span className="leading-tight">{benefit}</span>
                                                            </li>
                                                        ))}
                                                        <li className="flex items-start gap-3 text-sm text-gray-200 font-medium pt-2">
                                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />
                                                            <span className="leading-tight">
                                                                Receive: <span className={`font-medium ${tier.color}`}>{receiveAmount} SPCA</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                    {/* Bottom: Icon Left, Action Right */}
                                                    <div className="w-full flex items-end justify-between mt-2 pt-4 border-t border-white/5">

                                                        {/* Left: Tab Icon (Rounded Square, Black BG) */}
                                                        <div className="w-16 h-16 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden shadow-lg shrink-0 p-1 flex items-center justify-center">
                                                            {(() => {
                                                                const iconSrc = MOBILE_TABS.find(tab => tab.id === tier.id)?.icon;
                                                                return <img src={iconSrc} alt={tier.name} className="w-full h-full object-contain" />;
                                                            })()}
                                                        </div>

                                                        {/* Right: Invest + Button */}
                                                        <div className="flex flex-col items-end gap-3 ml-4 flex-1 mr-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400 text-[18px] font-satoshi">Invest:</span>
                                                                <span className={`font-bold text-xl ${tier.color}`}>{tier.price}</span>
                                                            </div>
                                                            {isConnected ? (
                                                                <button
                                                                    onClick={disconnectWallet}
                                                                    className="w-full max-w-[160px] py-2.5 rounded-lg bg-green-500/10 border border-green-500/50 hover:bg-green-500/20 text-green-400 font-tektur font-medium text-sm tracking-wide transition-all shadow-[0_0_10px_rgba(74,222,128,0.2)]"
                                                                >
                                                                    {address?.slice(0, 4)}...{address?.slice(-4)}
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={openWalletModal}
                                                                    className="w-full max-w-[160px] py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-tektur font-medium text-sm tracking-wide transition-all shadow-lg active:scale-95"
                                                                >
                                                                    Connect Wallet
                                                                </button>
                                                            )}
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Tab Selector (Squared Rounded Buttons) */}
                    <div className="grid grid-cols-4 gap-4 p-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl">
                        {MOBILE_TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setMobileTab(tab.id as any)}
                                className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center border transition-all duration-300
                                    ${mobileTab === tab.id
                                        ? 'bg-white/20 border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                                        : 'bg-black border-white/10 opacity-60 hover:opacity-100'
                                    }
                                `}
                            >
                                <img
                                    src={tab.icon}
                                    alt={tab.label}
                                    className="w-full h-full object-contain p-1 rounded-full"
                                />
                            </button>
                        ))}
                    </div>

                </div>

                {/* Promo Text & Socials - Moved from About Section */}
                <div className="flex flex-col items-center w-full mb-12 mt-4">
                    <p className="text-[16px] font-tektur font-medium text-gray-300 text-center tracking-wide mb-10 mt-0">
                        Don't miss out! Invest in <span className="text-[#FF00FF] font-medium">$SPCA</span> during our ongoing presale and receive an <span className="text-[#FFD700] font-medium">Exclusive NFT Signature</span> directly in your wallet.
                    </p>

                    <div className="flex items-center gap-8 md:gap-14 opacity-80 mt-8">
                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/company/ezzstar/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                            <div className="relative w-12 h-12 md:w-16 md:h-16">
                                <NextImage src="/assets/images/Social-LinkedIn.png" alt="LinkedIn" fill className="object-contain" />
                            </div>
                        </a>
                        {/* X (Twitter) */}
                        <a href="https://x.com/ezzstarx?s=21" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                            <div className="relative w-5 h-5 md:w-7 md:h-7">
                                <NextImage src="/assets/images/Social-X.png" alt="X" fill className="object-contain" />
                            </div>
                        </a>
                        {/* Medium (Wordmark) */}
                        <a href="#" className="hover:scale-105 transition-transform">
                            <div className="relative w-28 h-7 md:w-40 md:h-10">
                                <NextImage src="/assets/images/Social-Medium.png" alt="Medium" fill className="object-contain" />
                            </div>
                        </a>
                        {/* Discord (Wordmark) */}
                        <a href="https://discord.gg/sY3gsZVyeg" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
                            <div className="relative w-28 h-7 md:w-40 md:h-10">
                                <NextImage src="/assets/images/Social-Discord.png" alt="Discord" fill className="object-contain" />
                            </div>
                        </a>
                        {/* Telegram */}
                        <a href="https://t.me/EzzstarSPCA" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                            <div className="relative w-6 h-6 md:w-8 md:h-8">
                                <NextImage src="/assets/images/Social-Telegram.png" alt="Telegram" fill className="object-contain" />
                            </div>
                        </a>
                        {/* Instagram */}
                        <a href="#" className="hover:scale-110 transition-transform">
                            <div className="relative w-6 h-6 md:w-8 md:h-8">
                                <NextImage src="/assets/images/Social-Instagram.png" alt="Instagram" fill className="object-contain" />
                            </div>
                        </a>
                    </div>
                </div>

            </div>
        </section >
    );
}
