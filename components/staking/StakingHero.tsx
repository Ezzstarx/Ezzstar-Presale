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
                        Earn rewards by Staking <br />
                        <span className="text-[#FF00FF] text-shadow-glow">SPICA</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center gap-8 mt-12"
                >
                    <div className="flex gap-4 justify-center items-center">
                        <MagicButton
                            className="w-40 py-3 cursor-default h-auto rounded-xl flex-shrink-0"
                            style={{ "--mask-bg": "#DE3BD6" } as React.CSSProperties}
                        >
                            <div className="flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-white text-base font-tektur font-medium leading-tight">100%</span>
                                <span className="text-gray-400 text-[18px] font-tektur font-medium tracking-tight leading-tight">Estimated APR</span>
                            </div>
                        </MagicButton>

                        <MagicButton
                            className="w-40 py-3 h-auto rounded-xl flex-shrink-0"
                            style={{ "--mask-bg": "#1B071A" } as React.CSSProperties}
                        >
                            <div className="flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-white text-base font-tektur font-medium leading-tight">174.71M</span>
                                <span className="text-gray-400 text-[18px] font-tektur font-medium tracking-tight leading-tight">SPCA Staked</span>
                            </div>
                        </MagicButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
