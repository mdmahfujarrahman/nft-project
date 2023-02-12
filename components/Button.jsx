const Button = ({ classStyle, btnName, handleClick }) => {
    return (
        <button
            type="button"
            className={`${classStyle} nft-gradient minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${classStyle}`}
            onClick={handleClick}
        >
            {btnName}
        </button>
    );
};

export default Button;
