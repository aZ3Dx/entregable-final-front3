const Footer = () => {
    return (
        <div className="h-[180px] bg-zinc-900">
            <div className="flex h-full flex-col items-center justify-center gap-4">
                <div className="flex gap-4">
                    <a className="hover:underline" href="https://www.linkedin.com/in/jeankherrera/" target="_blank">
                        Linkedin
                    </a>
                    <a className="hover:underline" href="https://github.com/aZ3Dx" target="_blank">
                        Github
                    </a>
                    <a className="hover:underline" href="https://www.frontendmentor.io/profile/aZ3Dx" target="_blank">
                        FrontendMentor
                    </a>
                </div>
                <p>
                    Made with 🤍 by · <span className="font-semibold">Jean Herrera</span>
                </p>
            </div>
        </div>
    );
};
export default Footer;
