"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function UniqueFeatures() {
    return (
        <section id="unique-features" className="pt-0 pb-24 relative overflow-hidden bg-[#09090F]">
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                {/* New Section: Unique Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-7xl px-6 md:px-4 flex flex-col items-center"
                >
                    <div className="w-full max-w-[1440px] h-auto pt-16 mx-auto bg-transparent relative flex items-center justify-center mb-6 md:mb-8">
                        {/* Top Gradient Line - Moved to absolute top of motion.div */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DE3BD6] to-transparent z-20"></div>
                        <h2 className="text-3xl md:text-[55px] font-tektur font-medium tracking-[-1px] text-center mb-0 text-white text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 whitespace-nowrap">
                            What makes Spica unique ?
                        </h2>
                        {/* Top Gradient Line - Moved to align with section container top if needed, but currently within this header block. 
                           User likely wants it at the very top of the section content area. 
                           Let's move the margin from the parent container to here or adjust position.
                           The parent `motion.div` has `px-6 md:px-4`. The grandparent `container` has `px-6`.
                           The previous tool output shows `top-0` on line 23.
                           If the user wants it at the "unique section's container's top border", maybe they mean the `motion.div` top?
                           Let's move the border out of this header div or adjust `top` value?
                           Actually, "unique section's container's top border is at where the unique section's container's top border is" -> implied consistent placement.
                           Let's look at Roadmap.tsx line 123. It's `absolute bottom-0`.
                           About.tsx line 52. It's `absolute bottom-0`.
                           Hero.tsx line 11 (Wait, Hero title doesn't have a line).
                           Team.tsx line 85. `absolute bottom-0`.
                           
                           The user said "main heading top border line should be at where the unique section's container's top border is".
                           Currently in UniqueFeatures.tsx line 23: `<div className="absolute top-0 ...`.
                           It is inside `w-full max-w-[1440px]`.
                           
                           If I change `top-0` to `top-[-40px]` or similar to push it up to the section edge?
                           Or maybe the user means the line should be *above* the heading, flush with the top of the content container.
                           Use `top-0` relative to `motion.div`? The line is inside the heading container.
                           I will move the line to be a direct child of `motion.div` or adjust its top position to be visually at the very top of the section's content.
                           
                           Let's try pushing it up significantly or moving it outside.
                           Actually, looking at the code, `motion.div` has `flex flex-col items-center`.
                           The header div has `mb-12`.
                           I will just modify the `top-0` to `top-[-20px]` or similar to align it higher, or better yet, move the `div` for the line up in the DOM structure?
                           No, easiest is to adjust `top` or remove the header container's relative positioning? No.
                           
                           Let's try: `top-0` is relative to the `h-[119px]` container.
                           If I want it at the "container's top border", assuming the container is the `motion.div` or the `section` inner container that has padding.
                           The `section` has `py-24`.
                           The header is the first element in `motion.div`.
                           So `top-0` of the header is roughly top of the content.
                           Maybe the user feels it's too low?
                           I will verify the previous state. Line 23 was `top-0`.
                           I will change it to `top-[0]` but ensure the container aligns perfectly.
                           
                           Wait, "main heading top border line". Currently it is `top-0`.
                           Let's assume they want it *at the very top* of the `motion.div` container content.
                           The `motion.div` starts right after `py-24` padding of section.
                           The header div is the first child.
                           So `top-0` should be correct if it's the first child.
                           However, maybe the styling is off.
                           I will try to make it `absolute top-0` of the `motion.div` instead of the header container.
                           But I can't easily move it out with `replace_file_content` if I don't see the context well.
                           I'll try adjusting the `top` to `-30px` to push it up to the "container's top" visually if there's padding or margin.
                           Actually, I'll just change `top-0` to `top-[-10px]` or `top-[0px]` but verify the container height.
                           
                           Let's try `top-0` -> `top-[-40px]`?
                           Wait, maybe the user means it should be a **bottom** border like other sections?
                           about: `bottom-0`.
                           team: `bottom-0`.
                           roadmap: `bottom-0`.
                        {/* Top Gradient Line - Aligned to section container top */}
                        <div className="absolute top-[-50px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DE3BD6] to-transparent"></div>

                    </div>

                    {/* Single White Border Container */}
                    <div className="border-[0.5px] border-white/20 bg-transparent relative rounded-none p-2 md:p-4 w-full max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {/* Card 1: What Is SPICA? */}
                            <div className="relative bg-transparent border border-white/5 rounded-none p-4 overflow-hidden">
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="/assets/images/Unique.png"
                                        alt="Background"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Icon Container (Purple) */}
                                    <div className="w-[64px] h-[68px] flex items-center justify-center mb-4 relative">
                                        <Image src="/assets/images/Unique-1.png" alt="Unique Icon" fill className="object-contain" />
                                    </div>

                                    <h3 className="text-[18px] font-tektur font-semibold mb-3 text-[#DE3BD6]">
                                        What Is SPICA?
                                    </h3>

                                    <p className="text-white/90 font-tektur font-medium mb-6 text-base">
                                        SPICA is a utility coin, not a meme or speculative token
                                    </p>

                                    <ul className="space-y-3 text-left w-full">
                                        {[
                                            "Used across social website, social media platform, game, NFT system, and metaverse",
                                            "Spent to unlock gear, battle passes, upgrades, and boosts",
                                            "Enables creators and artists to monetize content and IP",
                                            "Used to tip creators, join VIP threads, and purchase digital goods",
                                            "Customizes your 3D NFT character with skins, emotes, gear",
                                            "Powers access to metaverse zones, land, and wearables",
                                            "Used to unlock tools, premium visibility, and event access"
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C243FE] shrink-0 shadow-[0_0_8px_#C243FE]"></span>
                                                <span className="text-white/70 font-tektur text-[14px] leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Card 2: Why Invest? */}
                            <div className="relative bg-transparent border border-white/5 rounded-none p-4 overflow-hidden">
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="/assets/images/Unique.png"
                                        alt="Background"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Icon Container (Yellow/Orange) */}
                                    <div className="w-16 h-16 flex items-center justify-center mb-4 relative overflow-hidden">
                                        <Image src="/assets/images/Unique-2.png" alt="Unique Icon" fill className="object-cover" />
                                    </div>

                                    <h3 className="text-[18px] font-tektur font-semibold mb-3 text-[#DE3BD6]">
                                        Why You Should Invest In SPICA
                                    </h3>

                                    <p className="text-white/90 font-tektur font-medium mb-6 text-sm px-2">
                                        SPICA is the core currency powering the entire Ezzstar ecosystem – from social to gameplay and metaverse experiences.
                                    </p>

                                    <ul className="space-y-3 text-left w-full">
                                        {[
                                            "One Token for the Entire Ecosystem",
                                            "Stay Alien (We don't need your punctured face & data in short KYC)",
                                            "Exclusive NFT Signature Benefits for Early Supporters",
                                            "Creator Economy With Instant Monetization",
                                            "Upgrade & Own Your 3D NFT Character Identity",
                                            "Earn SPICA Through Competitive Gameplay",
                                            "Social App Rewards Based on Digital Reputation",
                                            "Trade, Stake, Refer & Shop with SPICA",
                                            "Metaverse Utility - Planet Xebion",
                                            "No Vesting for Presale Investors"
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FFD700] shrink-0 shadow-[0_0_8px_#FFD700]"></span>
                                                <span className="text-white/70 font-tektur text-[14px] leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                {/* End Unique Features */}
            </div >
        </section >
    );
}
