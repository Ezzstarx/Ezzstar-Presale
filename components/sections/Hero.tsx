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
        supply: "20,000",
        supplyColor: "text-[#4ADE80]",
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
        supply: "10,000",
        supplyColor: "text-[#D946EF]",
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
        supply: "15,000",
        supplyColor: "text-[#EF4444]",
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
    // Carousel State: [leftIdx, centerIdx, rightIdx] into NFT_TIERS
    const [cardOrder, setCardOrder] = useState([0, 1, 2]);

    // Desktop State
    const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
    const selectedTier = NFT_TIERS.find(t => t.id === selectedTierId);

    const rotateLeft = () => {
        if (selectedTierId) return;
        setCardOrder(prev => [prev[1], prev[2], prev[0]]);
    };
    const rotateRight = () => {
        if (selectedTierId) return;
        setCardOrder(prev => [prev[2], prev[0], prev[1]]);
    };

    // Click a side card to bring it to center
    const handleCardClick = (tierIdx: number) => {
        if (selectedTierId) return;
        const posIdx = cardOrder.indexOf(tierIdx);
        if (posIdx === 1) return; // Already center
        if (posIdx === 0) rotateRight(); // Left card → rotate right to bring it to center
        if (posIdx === 2) rotateLeft();  // Right card → rotate left to bring it to center
    };

    // Fixed positions for the 3-card carousel
    const CARD_POSITIONS = [
        { x: -140, scale: 1, zIndex: 10, opacity: 1, brightness: 1 },  // Left
        { x: 0, scale: 1, zIndex: 20, opacity: 1, brightness: 1 },     // Center
        { x: 140, scale: 1, zIndex: 30, opacity: 1, brightness: 1 },   // Right
    ];

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
        <section className="relative min-h-screen flex flex-col items-center justify-start pt-20 sm:pt-24 pb-0 overflow-x-hidden text-center px-4 sm:px-6 bg-[url('/assets/images/background.png')] bg-cover bg-center">
            <div className="container mx-auto max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] relative z-10 flex flex-col items-center">

                {/* Header Content */}
                <div className="mb-6 sm:mb-8 md:mb-12 space-y-3 sm:space-y-4">
                    <h1 className="text-[22px] sm:text-2xl md:text-[55px] font-tektur font-medium tracking-[-0.5px] md:tracking-[-1px] leading-tight text-[#FAFAFA]">
                        <span className="whitespace-normal sm:whitespace-nowrap">Empowering the Future of</span> <br />
                        <span className="tracking-normal font-medium leading-none">
                            Digital <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#FC009F_30%,#3EE1F0_70%)]">Aliens!</span>
                        </span>
                    </h1>

                    <div className="flex flex-row gap-3 sm:gap-4 justify-center pt-3 sm:pt-4">
                        <MagicButton className="w-[130px] sm:w-[155px] h-[32px] sm:h-[34px] rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-md text-[14px] sm:text-[16px] font-medium font-tektur bg-black border-[0.5px] border-white/30 text-[#888888] hover:text-white">
                            Presale is Live
                        </MagicButton>
                        <a href="https://ezzstar.gitbook.io/ezzstar-gitbook" target="_blank" rel="noopener noreferrer">
                            <MagicButton
                                style={{ '--mask-bg': '#2C2C2C' } as React.CSSProperties}
                                className="w-[130px] sm:w-[155px] h-[32px] sm:h-[34px] rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-md text-[14px] sm:text-[16px] font-medium font-tektur bg-[#2C2C2C] border-[0.5px] border-white/30 text-[#888888] hover:text-white"
                            >
                                Whitepaper
                            </MagicButton>
                        </a>
                    </div>
                </div>

                {/* DESKTOP CONTENT (Hidden on Mobile) */}
                <div className="hidden lg:flex w-full items-center justify-center relative min-h-[500px] xl:min-h-[600px] 2xl:min-h-[700px] py-10">
                    <div className="flex items-center justify-center gap-[60px] xl:gap-[80px] origin-center scale-[0.9] lg:scale-100 xl:scale-[1.15] 2xl:scale-[1.3] transition-transform duration-300">
                        {/* LEFT: Presale Widget - Never moves */}
                        <div className="shrink-0 z-40">
                            <PresaleWidget />
                        </div>

                        {/* RIGHT GROUP: Cards + Benefits overlay */}
                        <div className="relative shrink-0 w-[540px] h-[400px]">

                            {/* NFT Cards Carousel */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {NFT_TIERS.map((tier, tierIdx) => {
                                    const posIdx = cardOrder.indexOf(tierIdx);
                                    const pos = CARD_POSITIONS[posIdx];
                                    const isDetailsOpen = !!selectedTierId;
                                    const isOtherCardActive = isDetailsOpen && selectedTierId !== tier.id;
                                    const isThisSelected = selectedTierId === tier.id;

                                    return (
                                        <motion.div
                                            key={tier.id}
                                            drag={!isDetailsOpen ? "x" : false}
                                            dragConstraints={{ left: -120, right: 120 }}
                                            dragElastic={0.15}
                                            onDragEnd={(_e, info) => {
                                                if (info.offset.x < -60) rotateLeft();
                                                else if (info.offset.x > 60) rotateRight();
                                            }}
                                            onClick={() => handleCardClick(tierIdx)}
                                            className={`absolute w-[260px] h-[360px] rounded-xl p-[2px] flex flex-col overflow-hidden transition-[filter] duration-300 ${posIdx === 1 && !isDetailsOpen ? 'cursor-default' : !isDetailsOpen ? 'cursor-pointer hover:brightness-75' : 'cursor-default'
                                                }`}
                                            style={{
                                                background: tier.borderGradient,
                                                left: '50%',
                                                marginLeft: '-130px',
                                                filter: isOtherCardActive ? 'brightness(1)' : `brightness(${pos.brightness})`,
                                            }}
                                            animate={{
                                                x: isThisSelected ? 170 : isOtherCardActive ? 0 : pos.x,
                                                y: 0,
                                                scale: isOtherCardActive ? 0 : pos.scale,
                                                opacity: isOtherCardActive ? 0 : pos.opacity,
                                                zIndex: isOtherCardActive ? 0 : pos.zIndex,
                                                width: isOtherCardActive ? 0 : 260,
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 120,
                                                damping: 18,
                                                mass: 0.8,
                                            }}
                                        >
                                            <div className="relative h-full w-full bg-[#0a0a0c] rounded-[calc(0.75rem-1px)] overflow-hidden flex flex-col shadow-2xl select-none">
                                                {/* Image Section */}
                                                <div className="relative w-full h-[72%] bg-black p-3 overflow-hidden">
                                                    <img src={tier.image} alt={tier.name} draggable={false} className="w-full h-full object-cover object-center border border-white/10 pointer-events-none" />
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
                            </div>

                            {/* Benefits Panel - overlays LEFT side of cards area */}
                            <AnimatePresence mode="popLayout">
                                {selectedTier && (
                                    <motion.div
                                        key="benefits-panel"
                                        initial={{ opacity: 0, x: 40, scale: 0.95 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: 40, scale: 0.95 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="absolute -left-16 top-1/2 -translate-y-1/2 w-[340px] h-[360px] backdrop-blur-md z-30 shadow-2xl rounded-xl overflow-hidden"
                                        style={{
                                            backgroundColor: `${selectedTier.color.replace('text-[', '').replace(']', '')}0D`
                                        }}
                                    >
                                        <div className={`w-full h-full absolute inset-0 border ${selectedTier.borderColor} opacity-30 pointer-events-none rounded-xl`} />

                                        <div className="w-full px-5 py-5 h-full flex flex-col items-start justify-center gap-4 relative z-10">
                                            {/* Header: Badge + Name + Invest on one row */}
                                            <div className="flex items-center gap-2 w-full flex-wrap">
                                                <img
                                                    src={selectedTier.badge}
                                                    alt="Badge"
                                                    className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                                                />
                                                <h3 className={`text-2xl font-tektur font-semibold uppercase tracking-wide ${selectedTier.color}`}>
                                                    {selectedTier.name}
                                                </h3>
                                                <div className="flex items-baseline gap-1.5 ml-auto">
                                                    <span className="text-white text-sm font-satoshi font-normal opacity-80">Invest:</span>
                                                    <span className={`text-2xl font-tektur font-bold ${selectedTier.color}`}>
                                                        {selectedTier.price}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Benefits List */}
                                            <ul className="space-y-3 w-full pl-1">
                                                {selectedTier.benefits.map((benefit, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className="mt-2 w-2 h-2 rounded-full bg-white shrink-0 shadow-[0_0_4px_white]"></div>
                                                        <span className="text-white text-[15px] font-normal font-satoshi leading-snug text-left">
                                                            {benefit}
                                                        </span>
                                                    </li>
                                                ))}
                                                <li className="flex items-start gap-3 pt-1">
                                                    <div className="mt-2 w-2 h-2 rounded-full bg-white shrink-0 shadow-[0_0_4px_white]"></div>
                                                    <span className="text-white text-[15px] font-semibold font-satoshi leading-snug text-left">
                                                        Receive: <span className={`font-bold ${selectedTier.color}`}>{(parseInt(selectedTier!.price.replace('$', '')) / 0.004).toLocaleString()} SPCA</span>
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-3 pt-1">
                                                    <div className="mt-2 w-2 h-2 rounded-full bg-white shrink-0 shadow-[0_0_4px_white]"></div>
                                                    <span className="text-white text-[15px] font-semibold font-satoshi leading-snug text-left">
                                                        {selectedTier.name.replace(' NFT', '')} Supply: <span className={`font-bold ${selectedTier.color}`}>{selectedTier.supply}</span>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </div>
                </div>

                {/* MOBILE CONTENT (Visible on Mobile/Tablet) */}
                <div className="flex lg:hidden flex-col w-full items-center gap-4 min-h-0 pb-4 px-4">

                    {/* Content Display Area */}
                    <div className="w-full min-h-[480px] flex justify-center items-start">
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
                                    className="w-full h-full flex flex-col items-center justify-center"
                                >
                                    {(() => {
                                        const tier = NFT_TIERS.find(t => t.id === mobileTab);
                                        if (!tier) return null;

                                        // Calculate received amount (Example logic: Price / 0.004)
                                        const priceVal = parseInt(tier.price.replace('$', ''));
                                        const receiveAmount = (priceVal / 0.004).toLocaleString();

                                        return (
                                            <div
                                                className="relative w-full h-[480px] max-w-[340px] rounded-[24px] sm:rounded-[32px] p-[2px] flex flex-col items-start gap-6"
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
                                                            <p className="text-sm font-tektur font-semibold tracking-wide text-white">
                                                                {tier.name.replace(' NFT', '')} Supply: <span className={tier.supplyColor}>{tier.supply}</span>
                                                            </p>
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
                    <div className="grid grid-cols-4 gap-3 sm:gap-4 p-0 bg-transparent border-none my-4">
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
                <div className="flex flex-col items-center w-full mb-8 sm:mb-12 mt-4 px-2 sm:px-0">
                    <p className="text-[13px] sm:text-[14px] md:text-[16px] font-tektur font-medium text-gray-300 text-center tracking-wide mb-6 sm:mb-10 mt-0 leading-relaxed">
                        Don't miss out! Invest in <span className="text-[#FF00FF] font-medium">$SPCA</span> during our ongoing presale and receive an <span className="text-[#FFD700] font-medium">Exclusive NFT Signature</span> directly in your wallet.
                    </p>

                    <div className="flex items-center justify-center gap-4 sm:gap-5 md:gap-14 opacity-80 mt-6 sm:mt-8 flex-wrap">
                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/company/ezzstar/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16">
                                <NextImage src="/assets/images/Social-LinkedIn.png" alt="LinkedIn" fill className="object-contain" />
                            </div>
                        </a>
                        {/* X (Twitter) */}
                        <a href="https://x.com/ezzstarx?s=21" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                                <NextImage src="/assets/images/Social-X.png" alt="X" fill className="object-contain" />
                            </div>
                        </a>
                        {/* Medium (Wordmark) */}
                        <a href="https://medium.com/@ezzstar" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
                            <div className="relative w-20 h-5 sm:w-24 sm:h-6 md:w-40 md:h-10">
                                <NextImage src="/assets/images/Social-Medium.png" alt="Medium" fill className="object-contain" />
                            </div>
                        </a>
                        {/* Discord (Wordmark) */}
                        <a href="https://discord.gg/sY3gsZVyeg" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
                            <div className="relative w-20 h-5 sm:w-24 sm:h-6 md:w-40 md:h-10">
                                <NextImage src="/assets/images/Social-Discord.png" alt="Discord" fill className="object-contain" />
                            </div>
                        </a>
                        {/* Telegram */}
                        <a href="https://t.me/EzzstarSPCA" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8">
                                <NextImage src="/assets/images/Social-Telegram.png" alt="Telegram" fill className="object-contain" />
                            </div>
                        </a>
                        {/* Instagram */}
                        <a href="https://www.instagram.com/ezzstars/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8">
                                <NextImage src="/assets/images/Social-Instagram.png" alt="Instagram" fill className="object-contain" />
                            </div>
                        </a>
                    </div>
                </div>

            </div>
        </section >
    );
}
