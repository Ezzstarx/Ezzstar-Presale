import { useState, useEffect, useMemo } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, parseUnits, keccak256 as viemKeccak256, encodePacked, getAddress, hexToBytes, bytesToHex } from 'viem';
import { MerkleTree } from 'merkletreejs';

export const PRESALE_ADDRESS = "0x49AefFF551B1E68F6799E64c0b6F72BBbd176f2E";
export const SPICA_ADDRESS = "0x28AbE997d4AB43d3f938D99DC0c074E463Bec7ed";

export const TOKENS = {
    USDT: "0x55d398326f99059fF775485246999027B3197955", // BSC Mainnet USDT
    USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", // BSC Mainnet USDC
    DAI: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",  // BSC Mainnet DAI
};

export const PRESALE_ABI = [
    {
        "inputs": [],
        "name": "price",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }],
        "name": "buyWithBNB",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }
        ],
        "name": "buyWithUSDT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }
        ],
        "name": "buyWithUSDC",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }
        ],
        "name": "buyWithDAI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "referrer", "type": "address" }],
        "name": "setReferrer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
        "name": "referrerOf",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    }
] as const;

export const ERC20_ABI = [
    {
        "inputs": [
            { "internalType": "address", "name": "spender", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "owner", "type": "address" },
            { "internalType": "address", "name": "spender", "type": "address" }
        ],
        "name": "allowance",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
] as const;

const whiteListJSON = [
    "0x6A3858a1Df0ADd14f8efCfF62775289b25Daeb1b",
    "0x029a2691a29d0c59f2173489916bcfDC32119Fa0",
    "0x33d7bBD5FdD75eB767527F4a9Ed8B2C6d6eb5574",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x7741A5e8DFFAbaA3208cb20A782F62ffdC86fC8F"
];

const whitelist = whiteListJSON.map(a => a.toLowerCase());

function customHash(data: Uint8Array) {
    return hexToBytes(viemKeccak256(data));
}

export function useWeb3Presale() {
    const { address } = useAccount();

    // Merkle Tree Setup
    const merkleTree = useMemo(() => {
        const leaves = whitelist.map(addr => {
            const hashHex = viemKeccak256(encodePacked(['address'], [getAddress(addr)]));
            return hexToBytes(hashHex);
        });
        return new MerkleTree(leaves, customHash, { sortPairs: true, hashLeaves: false });
    }, []);

    const getProof = (userAddress: string) => {
        if (!userAddress) return [];
        const leafHex = viemKeccak256(encodePacked(['address'], [getAddress(userAddress)]));
        const leaf = hexToBytes(leafHex);
        return merkleTree.getHexProof(Buffer.from(leaf)) as `0x${string}`[];
    };

    const { writeContractAsync } = useWriteContract();

    // Setup Referral
    const setupReferral = async (user: string) => {
        if (!user) return;
        const ref = localStorage.getItem("spica_referral");
        if (!ref || user.toLowerCase() === ref.toLowerCase()) return;

        try {
            await writeContractAsync({
                address: PRESALE_ADDRESS,
                abi: PRESALE_ABI,
                functionName: 'setReferrer',
                args: [ref as `0x${string}`]
            });
            localStorage.removeItem("spica_referral");
        } catch (e) {
            console.error("Failed to set referrer", e);
        }
    };

    // Buying function
    const buyWithToken = async (currency: 'BNB' | 'USDT' | 'USDC' | 'DAI', amount: number) => {
        if (!address) throw new Error("Wallet not connected");

        const proof = getProof(address);

        if (currency === 'BNB') {
            const ethAmount = parseEther(amount.toString());
            const tx = await writeContractAsync({
                address: PRESALE_ADDRESS,
                abi: PRESALE_ABI,
                functionName: 'buyWithBNB',
                args: [proof],
                value: ethAmount
            });
            return tx;
        }

        // ERC20 Flow
        const tokenAddress = TOKENS[currency as keyof typeof TOKENS] as `0x${string}`;
        const decimals = 18; // Defaulting to 1e18 following the HTML standard
        const tokenAmount = parseUnits(amount.toString(), decimals);

        console.log(`Approving ${currency}...`);

        await writeContractAsync({
            address: tokenAddress,
            abi: ERC20_ABI,
            functionName: 'approve',
            args: [PRESALE_ADDRESS, tokenAmount]
        });

        console.log(`Buying with ${currency}...`);
        const functionName = `buyWith${currency}` as "buyWithUSDT" | "buyWithUSDC" | "buyWithDAI";
        const tx = await writeContractAsync({
            address: PRESALE_ADDRESS,
            abi: PRESALE_ABI,
            functionName: functionName,
            args: [tokenAmount, proof]
        });

        return tx;
    };

    return {
        setupReferral,
        buyWithToken,
        getProof,
    };
}
