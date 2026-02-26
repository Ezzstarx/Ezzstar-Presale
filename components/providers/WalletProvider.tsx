"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiProvider, useAccount, useDisconnect, createStorage } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useWeb3Modal } from '@web3modal/wagmi/react'

const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = '02c80f7df2febc83dfaba59aa293c194'

// 2. Create wagmiConfig
const metadata = {
    name: 'Ezzstar',
    description: 'Ezzstar App',
    url: 'https://ezzstar-app.vercel.app', // Update with your actual domain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [bsc, bscTestnet] as const
const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    enableInjected: true,
    enableCoinbase: true,
    enableWalletConnect: true,
    auth: {
        email: false,
        socials: [],
        showWallets: false,
        walletFeatures: false
    }
})

// 3. Create modal - ONLY ON CLIENT
if (typeof window !== 'undefined') {
    createWeb3Modal({
        wagmiConfig: config,
        projectId,
        enableAnalytics: true,
        enableOnramp: false,
        enableSwaps: false
    })
}

interface WalletContextType {
    isConnected: boolean;
    address: string | undefined;
    connectWallet: () => void;
    disconnectWallet: () => void;
    openWalletModal: () => void;
    openNativeModal: () => void; // Helper to force native modal
    isCustomModalOpen: boolean;
    openCustomModal: () => void;
    closeCustomModal: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Define a global reference for the modal open function to be used by the provider
let openModalGlobal: () => Promise<void> = async () => { };

function Web3ModalManager() {
    const { open } = useWeb3Modal();

    useEffect(() => {
        openModalGlobal = open;
    }, [open]);

    return null;
}

function WalletInternalProvider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    useEffect(() => {
        setMounted(true);
    }, []);

    const connectWallet = () => {
        if (mounted) openModalGlobal();
    };
    const disconnectWallet = () => {
        if (mounted) disconnect();
    };
    const openNativeModal = () => {
        if (mounted) openModalGlobal();
    };
    const openWalletModal = () => {
        if (mounted) {
            if (window.innerWidth >= 768) {
                setIsCustomModalOpen(true);
            } else {
                openModalGlobal();
            }
        }
    };
    const openCustomModal = () => {
        if (mounted) setIsCustomModalOpen(true);
    };
    const closeCustomModal = () => {
        setIsCustomModalOpen(false);
    };

    return (
        <WalletContext.Provider value={{
            isConnected: mounted ? isConnected : false,
            address: mounted ? address : undefined,
            connectWallet,
            disconnectWallet,
            openWalletModal,
            openNativeModal,
            isCustomModalOpen,
            openCustomModal,
            closeCustomModal
        }}>
            {children}
            {mounted && <Web3ModalManager />}
        </WalletContext.Provider>
    );
}

export function WalletProvider({ children }: { children: ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <WalletInternalProvider>
                    {children}
                </WalletInternalProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}
