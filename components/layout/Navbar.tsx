"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import WalletModal from "../ui/WalletModal";
import { useWallet } from "../providers/WalletProvider";

export default function Navbar() {
    const [showWalletModal, setShowWalletModal] = useState(false);
    const { isConnected, address, disconnectWallet } = useWallet();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        // Clear any existing timer on scroll activity
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (latest > 100) {
            if (latest > previous) {
                // Scrolling down -> Hide immediately
                setHidden(true);
            } else {
                // Scrolling up -> Show
                setHidden(false);

                // Start inactivity timer to hide after stopping
                timeoutRef.current = setTimeout(() => {
                    setHidden(true);
                }, 2000); // 2 seconds delay
            }
        } else {
            // At top -> Always show and clear timer
            setHidden(false);
        }
    });

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setHidden(false);
    };

    const handleMouseLeave = () => {
        if (scrollY.get() > 100) {
            timeoutRef.current = setTimeout(() => {
                setHidden(true);
            }, 2000);
        }
    };

    const navLinks = [
        { name: "Tokenomics", href: "#tokenomics" },
        { name: "Roadmap", href: "#roadmap" },
        { name: "Stake", href: "/staking" },
        { name: "Referral", href: "#referral" },
        { name: "About Us", href: "#about" },
        { name: "Our Team", href: "#team" },
    ];

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-24 md:py-6 backdrop-blur-xl bg-black/40 border-b border-white/5"
        >
            {/* Left Corner: Logo */}
            <div className="flex-shrink-0 z-50">
                <Link href="/" className="flex items-center">
                    <img
                        src="/assets/images/logo.png"
                        alt="Ezzstar"
                        className="h-6 md:h-8 w-auto"
                    />
                </Link>
            </div>

            {/* Middle: Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 font-tektur text-sm text-gray-300 font-medium">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="hover:text-accent-cyan hover:scale-105 transition-all"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Right Corner: Connect Wallet & Mobile Toggle */}
            <div className="flex items-center gap-4 z-50">
                <div className="hidden md:block">
                    {isConnected ? (
                        <button
                            onClick={disconnectWallet}
                            className="flex items-center gap-2 px-6 py-2 bg-white/10 rounded-lg border border-accent-cyan/50 hover:bg-white/20 transition-all font-tektur text-accent-cyan shadow-[0_0_15px_rgba(0,234,255,0.2)]"
                        >
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowWalletModal(true)}
                            className="relative group px-8 py-2.5 bg-gradient-to-r from-secondary to-primary rounded-full font-tektur text-white font-bold tracking-wide hover:brightness-110 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all transform hover:scale-105"
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown (Floating "Container") */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Invisible Backdrop to close on click outside */}
                        <div
                            className="fixed inset-0 z-40 bg-transparent"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-[70px] left-6 right-6 z-50 bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 md:hidden"
                        >
                            {/* Links */}
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-4 py-2 text-base font-tektur text-white/80 hover:text-accent-cyan hover:bg-white/5 rounded-lg transition-all text-center"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full bg-white/5" />

                            {/* Wallet Button */}
                            <div className="flex justify-center">
                                {isConnected ? (
                                    <button
                                        onClick={disconnectWallet}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 rounded-lg border border-accent-cyan/30 font-tektur text-accent-cyan hover:bg-white/10 transition-all text-sm"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                        <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setShowWalletModal(true);
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full px-8 py-2.5 bg-gradient-to-r from-secondary to-primary rounded-lg font-tektur text-white font-bold tracking-wide shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all text-sm"
                                    >
                                        Connect Wallet
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <WalletModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} />
        </motion.nav>
    );
}
