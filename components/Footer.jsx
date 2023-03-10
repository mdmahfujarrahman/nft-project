import Image from "next/image";
import { useTheme } from "next-themes";

import images from "../assets";
import { Button } from ".";

const FooterLinks = ({ heading, itmes }) => {
    return (
        <div className="flex-1 justify-start items-start">
            <h3 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10">
                {heading}
            </h3>
            {itmes.map((item, index) => (
                <p
                    key={index}
                    className="font-poppins dark:text-white text-nft-balck-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-gray-1 my-3"
                >
                    {item}
                </p>
            ))}
        </div>
    );
};

const Footer = () => {
    const { theme } = useTheme();
    return (
        <footer className="flexCenter flex-col sm:py-8 py-16 border-t dark:border-nft-black-1 border-nft-gray-1">
            <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
                <div className="flexStart flex-1 flex-col">
                    <div className="flexCenter cursor-pointer">
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
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base mt-6 ">
                        Get the lastes Updates
                    </p>
                    <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 rounded-md ">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none"
                        />
                        <div>
                            <Button
                                btnName="Email Me"
                                classStyle="rounded-md"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8">
                    <FooterLinks
                        heading="CryptoKet"
                        itmes={["Explore", "How it Works", "Contact Us"]}
                    />
                    <FooterLinks
                        heading="Support"
                        itmes={[
                            "Help center",
                            "Terms od service",
                            "Legal",
                            "Privacy Policy",
                        ]}
                    />
                </div>
            </div>
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
