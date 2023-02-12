import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useTheme } from "next-themes";
import { Banner, CreatorCard, NFTCards } from "../components";
import images from "../assets";
import { makeID } from "../utils/makeId";

const Home = () => {
    const parentRef = useRef(null);
    const [hideButton, setHideButton] = useState(false);
    const childRef = useRef(null);
    const { theme } = useTheme();

    const handleScroll = (direction) => {
        const { current } = childRef;
        const scroolAmount = window.innerWidth > 1800 ? 270 : 310;
        if (direction === "left") {
            current.scrollLeft -= scroolAmount;
        }
        if (direction === "right") {
            current.scrollLeft += scroolAmount;
        }
    };

    const isScrollable = () => {
        const { current } = childRef;
        const { current: parent } = parentRef;

        if (current?.scrollWidth >= parent?.offsetWidth) {
            setHideButton(false);
        } else {
            setHideButton(true);
        }
    };

    useEffect(() => {
        isScrollable();
        window.addEventListener("resize", isScrollable);
        return () => {
            window.removeEventListener("resize", isScrollable);
        };
    }, []);

    return (
        <div className="flex justify-center sm:px-4 p-12">
            <div className="w-full minlg:w-4/5">
                <Banner
                    title="Discover, collect, and sell extraordinary NFTs"
                    parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
                    childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
                />
                <div>
                    <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xm:ml-0">
                        Top Sellers
                    </h1>
                    <div
                        ref={parentRef}
                        className="relative flex-1 max-w-full flex mt-3"
                    >
                        <div
                            ref={childRef}
                            className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => {
                                return (
                                    <CreatorCard
                                        rank={item}
                                        creatorImage={images[`creator${item}`]}
                                        item={item}
                                        creatorName={`0x${makeID(3)}...${makeID(
                                            4
                                        )}`}
                                        key={i}
                                        creatorEths={10 - item * 0.5}
                                    />
                                );
                            })}
                            {!hideButton && (
                                <>
                                    <div
                                        onClick={() => handleScroll("left")}
                                        className="absolute w-8 h-8 minlg:w-12 minlg:h-12 left-0 top-45 cursor-pointer"
                                    >
                                        <Image
                                            layout="fill"
                                            objectFit="contain"
                                            className={
                                                theme === "light" &&
                                                "filter invert"
                                            }
                                            alt="left aroow"
                                            src={images.left}
                                        />
                                    </div>
                                    <div
                                        onClick={() => handleScroll("right")}
                                        className="absolute w-8 h-8 minlg:w-12 minlg:h-12 right-0 top-45 cursor-pointer"
                                    >
                                        <Image
                                            layout="fill"
                                            objectFit="contain"
                                            className={
                                                theme === "light" &&
                                                "filter invert"
                                            }
                                            alt="right aroow"
                                            src={images.right}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* Craeted NFTs */}
                <div className="mt-10">
                    <div className="flexBetween mx-4 xm:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                        <h1 className=" flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                            Hot Bids
                        </h1>
                        <div>SearchBar</div>
                    </div>
                    <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                            return (
                                <NFTCards
                                    nft={{
                                        i,
                                        name: `Nifty NFT ${i}`,
                                        image: images[`nft${i}`],
                                        seller: `0x${makeID(3)}...${makeID(4)}`,
                                        owner: `0x${makeID(3)}...${makeID(4)}`,
                                        price: 10 - i * 0.5,
                                        desc: "Best NFTs",
                                    }}
                                    key={i}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
