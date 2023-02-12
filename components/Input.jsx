import React from "react";

const Input = ({ title, inputType, handleClick, placeholder }) => {
    return (
        <div className="mt-16">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                {title}
            </p>

            {inputType === "number" ? (
                <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
                    <input
                        className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
                        type="number"
                        onChange={handleClick}
                        placeholder={placeholder}
                    />
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                        ETH
                    </p>
                </div>
            ) : inputType === "textarea" ? (
                <textarea
                    onChange={handleClick}
                    placeholder={placeholder}
                    className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
                    rows={10}
                />
            ) : (
                <input
                    className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
                    type={inputType}
                    onChange={handleClick}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};

export default Input;
