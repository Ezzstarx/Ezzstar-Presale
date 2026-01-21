"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function About() {
    const [textIndex, setTextIndex] = useState(0);
    const texts = ["EZZSTAR", "SPICA", "Us"];

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % texts.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);



    return (
        <section id="about" className="pt-0 pb-24 relative overflow-hidden bg-[url('/assets/images/background-main.png')] bg-cover bg-center">
            {/* Background Blurs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-pink/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">


                {/* Animated Heading */}
                <div className="w-full max-w-[1440px] h-[119px] mx-auto bg-transparent relative flex items-center justify-center mb-16">
                    <h2 className="text-[55px] font-tektur font-medium tracking-[-1px] mb-0 flex items-center justify-center gap-2">
                        <span className="w-[160px] md:w-[300px] text-right">About</span>
                        <div className="relative h-[1.2em] w-[160px] md:w-[300px] flex items-center justify-start overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={texts[textIndex]}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className={`absolute font-medium text-left ${texts[textIndex] === "EZZSTAR" ? "bg-gradient-to-r from-accent-cyan to-[#ff00ff] text-transparent bg-clip-text" :
                                        texts[textIndex] === "SPICA" ? "text-[#ff00ff]" :
                                            texts[textIndex] === "Us" ? "text-accent-cyan" : "text-white"
                                        }`}
                                >
                                    {texts[textIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </h2>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-black via-[#FF00FF] to-black"></div>
                </div>

                {/* Stylized Black Box Content with Exact Dimensions */}
                <div className="relative flex flex-col items-center bg-[#050507] border border-white/5 rounded-2xl overflow-hidden shadow-2xl w-full max-w-[707px] md:w-[707px] md:h-[809px] h-auto">

                    {/* Top Section: Text Content */}
                    <div className="w-full flex flex-col items-center justify-center px-6 md:px-12 pt-8 md:pt-12 pb-8 md:pb-4 h-auto md:h-[417px]">
                        {/* Logo */}
                        <div className="mb-6">
                            <img
                                src="/assets/images/Footer-Logo.png"
                                alt="About Ezzstar Logo"
                                className="object-contain brightness-110 contrast-125"
                                style={{ width: '93px', height: '85px' }}
                            />
                        </div>

                        {/* Text Content - Professional & Compact */}
                        <div className="space-y-4 text-center w-full max-w-[600px]">
                            <p className="text-sm md:text-[15px] text-white/90 font-satoshi leading-relaxed font-light">
                                Welcome to <span className="font-medium text-white">Ezzstar</span>, a fully interconnected Web3 ecosystem empowering creators,
                                gamers, and anonymous users. We&apos;re not just building platforms. We&apos;re
                                constructing an economy where <span className="font-medium text-white">time, identity, and creativity are currency.</span>
                            </p>

                            <p className="text-base md:text-[17px] font-tektur font-medium text-accent-cyan tracking-wide">
                                From digital aliens to elite-ranked players,
                            </p>

                            <p className="text-sm md:text-[15px] text-white/80 font-satoshi leading-relaxed">
                                Ezzstar enables you to own your identity across a decentralized social hub, a play-
                                to-earn game, and metaverse.
                                <br />
                                All powered by a single currency: <span className="text-[#ff00ff] font-medium tracking-wider">SPICA</span>
                            </p>

                            <p className="text-sm md:text-[16px] font-satoshi font-medium text-red-600 tracking-tight brightness-110 leading-tight pt-2">
                                This is a world where reputation matters, identity is earned, and your presence
                                shapes the future.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Section: Video Content */}
                    <div className="w-full relative bg-black/40 backdrop-blur-md h-[300px] md:h-[390px] md:mt-[5px]">
                        {/* Video Content */}
                        <video
                            className="absolute inset-0 w-full h-full object-cover opacity-90 z-[1]"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                        >
                            <source src="/assets/videos/Video-About-Compressed.mp4" type="video/mp4" />
                        </video>
                        {/* Gradient Overlay for smooth integration */}
                        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#050507] to-transparent z-10"></div>
                    </div>
                </div>

            </div>
        </section>
    );
}
