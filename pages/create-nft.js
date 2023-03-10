import { useState, useMemo, useCallback, useContext } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";

import Image from "next/image";
import images from "../assets";
import { Button, Input } from "../components";
import { NFTContext } from "../context/NFTContext";

const CreateNft = () => {
    const { uploadToIPFS } = useContext(NFTContext)
    const { theme } = useTheme();
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, setFormInput] = useState({
        name: "",
        description: "",
        price: "",
    });
    console.log(formInput);

    const onDrop = useCallback(async (acceptedFile) => {
        const url = await uploadToIPFS(acceptedFile)
        console.log(url);
        setFileUrl(url)
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: "image/*",
        maxSize: 5000000,
    });

    const fileStyle = useMemo(() => {
        return `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
        
        ${isDragActive && "border-file-active"}
        ${isDragAccept && "border-file-accept"}
        ${isDragReject && "border-file-reject"}
        
        `;
    }, [isDragActive, isDragAccept, isDragReject]);

    return (
        <div className="flex justify-center sm:px-4 p-12">
            <div className="w-3/5 md:w-full">
                <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold">
                    Create new NFTs
                </h1>
                <div className="mt-16">
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                        Upload File
                    </p>
                    <div className="mt-4">
                        <div {...getRootProps()} className={fileStyle}>
                            <input {...getInputProps()} type="text" />
                            <div className="flexCenter flex-col text-center">
                                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                                    JPG, PNG, GIF, SVG, WEBM Max 100mb.
                                </p>
                                <div className="my-12 w-full flex justify-center">
                                    <Image
                                        width={100}
                                        height={100}
                                        objectFit="contain"
                                        alt="file Upload"
                                        className={
                                            theme === "light" && "filter invert"
                                        }
                                        src={images.upload}
                                    />
                                </div>
                                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xm">
                                    Drag and Drop File
                                </p>
                                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xm mt-2">
                                    or browse media on your device
                                </p>
                            </div>
                        </div>
                        {fileUrl && (
                            <aside>
                                <div>
                                    <img src={fileUrl} alt="asset_file" />
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
                <Input
                    inputType="input"
                    title="Name"
                    placeholder="Enter NFT Name"
                    handleClick={(e) =>
                        setFormInput({ ...formInput, name: e.target.value })
                    }
                />
                <Input
                    inputType="textarea"
                    title="Description"
                    placeholder="Decription of your NFTs"
                    handleClick={(e) =>
                        setFormInput({
                            ...formInput,
                            description: e.target.value,
                        })
                    }
                />
                <Input
                    inputType="number"
                    title="Price"
                    placeholder="Enter Price"
                    handleClick={(e) =>
                        setFormInput({ ...formInput, price: e.target.value })
                    }
                />
                <div className="mt-7 w-full flex justify-end">
                    <Button
                        classStyle=" rounded-xl"
                        btnName="Create Item"
                        handleClick={() => { }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateNft;
