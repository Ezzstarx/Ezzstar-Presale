"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import WalletModal from "../ui/WalletModal";

interface WalletContextType {
    isConnected: boolean;
    address: string | null;
    connectWallet: () => void;
    disconnectWallet: () => void;
    openWalletModal: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Check custom simulations
    useEffect(() => {
        // In a real app, check window.ethereum or localStorage
        const saved = localStorage.getItem("ezzstar_wallet_connected");
        if (saved === "true") {
            setIsConnected(true);
            setAddress("0x71...3A9"); // Mock address
        }
    }, []);

    const connectWallet = () => {
        // Simulate connection delay
        setTimeout(() => {
            setIsConnected(true);
            setAddress("0x71...3A9");
            localStorage.setItem("ezzstar_wallet_connected", "true");
        }, 1000);
    };

    const disconnectWallet = () => {
        setIsConnected(false);
        setAddress(null);
        localStorage.removeItem("ezzstar_wallet_connected");
    };

    const openWalletModal = () => setIsModalOpen(true);

    return (
        <WalletContext.Provider value={{ isConnected, address, connectWallet, disconnectWallet, openWalletModal }}>
            {children}
            <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}
