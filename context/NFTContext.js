import React, { createContext, useEffect, useState } from "react";
import web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client"


import { marketAddress, marketAddressABI } from "./constants";

const client = ipfsHttpClient(`https://ipfs.infura.io:5001/api/v0`)

export const NFTContext = createContext();

export const NFTProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const nftCurrancy = "ETH";

    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return alert("Please install MetaMask");

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        if (accounts.length) {
            setCurrentAccount(accounts[0]);
        } else {
            alert("No authorized account found");
        }

        console.log(accounts);
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const connectWallet = async () => {
        if (!window.ethereum) return alert("Please install MetaMask");
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        setCurrentAccount(accounts[0]);

        window.location.reload();
    };

    const uploadToIPFS = async (file) => {
        console.log(file)
        try {

            const added = await client.add({ content: file });
            debugger
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            return url
        } catch (error) {
            console.log(error)
            console.log('Error adding file')
        }
    }

    return (
        <NFTContext.Provider
            value={{ nftCurrancy, connectWallet, currentAccount, uploadToIPFS }}
        >
            {children}
        </NFTContext.Provider>
    );
};
