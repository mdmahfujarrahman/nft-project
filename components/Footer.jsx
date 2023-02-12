import Image from "next/image";
import { useTheme } from "next-themes";

import images from "../assets";
import { Button } from ".";

const Footer = () => {
    const { theme } = useTheme();
    return (
        <footer className="flexCenter flex-col sm:py-8 py-16 border-t dark:border-nft-black-1 border-nft-gray-1">
            <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
                <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
                        CryptoKet, Inc. All Right Reserved.
                    </p>
                    <div className="flex flex-row sm:mt-4">
                        {[
                            images.instagram,
                            images.twitter,
                            images.telegram,
                            images.discord,
                        ].map((item, index) => (
                            <div className="mx-2 cursor-pointer" key={index}>
                                <Image
                                    objectFit="contain"
                                    width={24}
                                    height={24}
                                    alt="icons"
                                    className={
                                        theme === "ligth" && "filter invert"
                                    }
                                    src={item}
                                />
                            </div>;
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
