import Image from "next/image";
import { useContext } from "react";

import images from "../assets";
import { NFTContext } from "../context/NFTContext";

const CreatorCard = ({ rank, creatorImage, creatorName, creatorEths }) => {
    const { nftCurrancy } = useContext(NFTContext);

    return (
        <div className="min-w-190 minlh:min-w-240 dark:bg-nft-gray-3 bg-white border dark:border-nft-black-3 border-nft-gray-1 rounded-3xl flex flex-col p-4 m-4">
            <div className="bg-nft-red-violet flexCenter rounded-full w-8 h-8 minlg:w-10 minlg:h-10">
                <p className="font-poppins text-white font-semibold text-base minlg:text-lg">
                    {rank}
                </p>
            </div>
            <div className="my-2 flex justify-center">
                <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
                    <Image
                        src={creatorImage}
                        layout="fill"
                        objectFit="cover"
                        alt="nft"
                        className="rounded-full"
                    />
                    <div className="absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0">
                        <Image
                            src={images.tick}
                            layout="fill"
                            objectFit="contain"
                            alt="tick"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-3 minlg:mt-7 text-center flexCenter flex-col">
                <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-lg font-semibold">
                    {creatorName}
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-base font-semibold">
                    {creatorEths.toFixed(2)}{" "}
                    <span className="normal">{nftCurrancy}</span>
                </p>
            </div>
        </div>
    );
};

export default CreatorCard;
