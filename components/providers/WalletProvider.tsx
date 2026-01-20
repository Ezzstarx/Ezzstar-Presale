"use client";

import { createContext, useContext, ReactNode } from "react";
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiProvider, useAccount, useDisconnect } from 'wagmi'
import { bsc, mainnet } from 'wagmi/chains'
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

const chains = [bsc, mainnet] as const
const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
})

// 3. Create modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
    enableOnramp: true
})

interface WalletContextType {
    isConnected: boolean;
    address: string | undefined;
    connectWallet: () => void;
    disconnectWallet: () => void;
    openWalletModal: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

function WalletInternalProvider({ children }: { children: ReactNode }) {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { open } = useWeb3Modal();

    const connectWallet = () => open();
    const disconnectWallet = () => disconnect();
    const openWalletModal = () => open();

    return (
        <WalletContext.Provider value={{
            isConnected,
            address,
            connectWallet,
            disconnectWallet,
            openWalletModal
        }}>
            {children}
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
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}
