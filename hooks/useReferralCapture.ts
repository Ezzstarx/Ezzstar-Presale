"use client";

import { useEffect } from "react";

export function useReferralCapture() {
    useEffect(() => {
        const captureReferralOnce = () => {
            let ref: string | null = null;

            // Check standard search params (?ref=...)
            const params = new URLSearchParams(window.location.search);
            ref = params.get("ref");

            // Fallback for hash routing (#/ref=...)
            if (!ref && window.location.hash.includes("ref=")) {
                ref = window.location.hash.split("ref=")[1];
            }

            if (ref && /^0x[a-fA-F0-9]{40}$/.test(ref)) {
                localStorage.setItem("spica_referral", ref);
            }
        };

        captureReferralOnce();
    }, []);
}
