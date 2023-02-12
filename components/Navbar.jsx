import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import images from "../assets";

const MenuItems = () => {
    const genaretMenu = () => {

    }
    return (
        <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
            {['Explore NFTs', 'Create NFTs', 'My NFTs', 'My Wallet'].map((item, index) => (
                <li key={index} className="flexCenter flex-row">
                    <Link href="/">
                        <a className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
                    </Link>
                </li>
            ))}
        </ul>
    )
}



const Navbar = () => {
    const { theme, setTheme } = useTheme();
    return (
        <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
            <div className="flex flex-1 flex-row justify-start">
                <Link href="/">
                    <div
                        onClick={() => {}}
                        className="flexCenter md:hidden cursor-pointer"
                    >
                        <Image
                            className=""
                            alt="logos"
                            src={images.logo02}
                            objectFit="contain"
                            width={32}
                            height={32}
                        />
                        <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
                            CryptoKet
                        </p>
                    </div>
                </Link>
                <Link href="/">
                    <div className="hidden md:flex">
                        <Image
                            className=""
                            alt="logos"
                            src={images.logo02}
                            objectFit="contain"
                            width={32}
                            height={32}
                        />
                    </div>
                </Link>
            </div>
            <div className="flex flex-initial flex-row justify-end">
                <div className="flex items-center mr-2">
                    <input
                        onChange={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                        }
                        type="checkbox"
                        className="checkbox"
                        id="checkbox"
                    />
                    <label
                        htmlFor="checkbox"
                        className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
                    >
                        <i className="fa fa-sun" />
                        <i className="fa fa-moon" />
                        <div className="w-3 h-3 absolute bg-white rounded-full ball" />
                    </label>
                </div>
            </div>
            <div className="md:hidden flex">
                <ul className="list-none flexCenter flex-row">
                    <MenuItems/>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
