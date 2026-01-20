"use client";

import { motion } from "framer-motion";

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
                    <h1 className="text-[55px] font-medium font-tektur tracking-[-1px] mb-6 relative z-10 text-white">
                        STAKE <span className="text-[#FF00FF] text-shadow-glow">SPICA</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center gap-8 mt-12"
                >
                    <div className="flex gap-6 justify-center items-center">
                        <div className="bg-[#FF00FF]/60 border border-[#FF00FF]/20 rounded-xl px-10 py-2 backdrop-blur-md hover:bg-[#FF00FF] hover:shadow-[0_0_20px_rgba(255,0,255,0.4)] transition-all duration-300 group cursor-default">
                            <span className="block text-white text-xs font-satoshi font-medium uppercase tracking-wider mb-0 group-hover:text-white transition-colors">Current APR</span>
                            <span className="text-2xl font-medium font-tektur text-white leading-none group-hover:text-white transition-colors">100%</span>
                        </div>

                        {/* Stat Card 2 */}
                        <div className="bg-[#1a001a] border border-[#FF00FF]/20 rounded-xl px-10 py-2 backdrop-blur-md hover:bg-[#2a002a] hover:border-[#FF00FF]/50 hover:shadow-[0_0_15px_rgba(255,0,255,0.3)] transition-all duration-300">
                            <div className="text-white font-tektur font-medium text-2xl leading-none">174.71M</div>
                            <div className="text-gray-400 text-xs font-satoshi font-medium uppercase tracking-wider">SPCA Staked</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
