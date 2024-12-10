const CloseIcon = ({ onClick }) => {
    return (
        <svg
            width="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-2 cursor-pointer fill-zinc-400"
            onClick={onClick}
        >
            <path d="M6 18L18 6M6 6L18 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};
export default CloseIcon;
