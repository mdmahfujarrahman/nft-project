import React, { createContext, useEffect, useState } from "react";
import web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

import { marketAddress, marketAddressABI } from "./constants";

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

    return (
        <NFTContext.Provider
            value={{ nftCurrancy, connectWallet, currentAccount }}
        >
            {children}
        </NFTContext.Provider>
    );
};
