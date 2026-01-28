"use client";

import { motion } from "framer-motion";
import MagicButton from "@/components/ui/MagicButton";

export default function StakingHero() {
    return (
        <section className="pt-40 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#FF00FF]/10 blur-[150px] -z-10" />

            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-[50px] font-medium font-tektur tracking-[-1px] mb-6 relative z-10 text-white leading-tight">
                        Earn Rewards by Staking <br />
                        <span className="text-[#FF00FF] text-shadow-glow">SPICA</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center gap-8 mt-12"
                >
                    <div className="flex gap-6 justify-center items-center">
                        <MagicButton
                            className="px-10 py-2 cursor-default h-auto rounded-xl"
                            style={{ "--mask-bg": "#000000" } as React.CSSProperties}
                        >
                            <div className="flex flex-col items-center justify-center pointer-events-none">
                                <span className="block text-white text-xs font-satoshi font-medium uppercase tracking-wider mb-0">Estimated APR</span>
                                <span className="text-2xl font-medium font-tektur text-white leading-none">100%</span>
                            </div>
                        </MagicButton>

                        <MagicButton
                            className="px-10 py-2 h-auto rounded-xl"
                            style={{ "--mask-bg": "#000000" } as React.CSSProperties}
                        >
                            <div className="flex flex-col items-center justify-center pointer-events-none">
                                <div className="text-white font-tektur font-medium text-2xl leading-none">174.71M</div>
                                <div className="text-gray-400 text-xs font-satoshi font-medium uppercase tracking-wider">SPICA Staked</div>
                            </div>
                        </MagicButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
