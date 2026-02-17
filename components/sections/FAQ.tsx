"use client";

import { useState } from "react";
import { X } from "lucide-react"; // Only need X, logic will toggle
import { motion, AnimatePresence } from "framer-motion";

// Updated data based on the provided image and original content
const faqs = [
    {
        q: "What is SPICA?",
        a: "Spica (SPCA) is the utility token of the Ezzstar ecosystem, used for earning, staking, and powering features across social, gaming, and metaverse experiences."
    },
    {
        q: "Why should i buy the $SPCA crypto presale?",
        a: "By holding $SPCA, you get many benefits such as NFT Signature, discord role, early access to test new projects."
    },
    {
        q: "What is an NFT Signature used for?",
        a: "An NFT Signature in Ezzstar is a special collectible for early supporters, available during the presale. It comes with utility like verified star badge, rewards, and recognition across the Ezzstar ecosystem."
    },
    // Keeping existing ones but potentially updated style
    {
        q: "When will the token launch?",
        a: "The token is scheduled to list on major DEXs immediately after the presale concludes. See our Roadmap for the exact timeline."
    },
    {
        q: "Is the smart contract audited?",
        a: "Yes, our smart contract has undergone rigorous security audits to ensure safety and transparency for all investors."
    },
];

export default function FAQ() {
    // Default open ALL items -> CHANGED to default closed
    const [openIndices, setOpenIndices] = useState<number[]>([]);

    const toggleFAQ = (index: number) => {
        setOpenIndices(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    return (
        <section id="faq" className="pt-12 pb-24 relative overflow-hidden bg-[url('/assets/images/background-main.png')] bg-cover bg-center">
            {/* Pink Top Line/Glow */}


            <div className="container mx-auto px-6 max-w-5xl">
                <div className="w-full max-w-[1440px] h-[119px] mx-auto bg-transparent relative flex items-center justify-center mb-12">
                    <h2 className="text-2xl md:text-[32px] font-tektur font-medium tracking-[-1px] text-center mb-0 text-white whitespace-nowrap">
                        Frequently Asked Questions
                    </h2>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DE3BD6] to-transparent"></div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndices.includes(i);
                        return (
                            <div
                                key={i}
                                className={`
                                    rounded-none border-l-2 transition-all duration-300
                                    ${isOpen ? 'bg-[#0a0a0c] border-[#ff00ff]' : 'bg-[#0a0a0c]/50 border-white/5'}
                                `}
                            >
                                <button
                                    onClick={() => toggleFAQ(i)}
                                    className="w-full flex items-center justify-between p-4 text-left group"
                                >
                                    <span className="font-satoshi font-medium text-lg text-white tracking-wide">{faq.q}</span>

                                    {/* Close Icon (Circle with X) */}
                                    <div className={`
                                        w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                                        ${isOpen ? 'bg-white/10 text-white rotate-0' : 'bg-transparent text-white/50 -rotate-45'}
                                    `}>
                                        <X size={14} />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-4 pt-4 border-t border-white/10 text-gray-400 font-satoshi leading-relaxed text-sm md:text-base max-w-5xl">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
