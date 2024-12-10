import { matchPath, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    const validRoutes = ["/", "/categorias/:slug", "/juegos/:slug"];
    const isActiveLogo = validRoutes.some((route) => matchPath({ path: route, end: true }, location.pathname));
    return (
        <nav className="bg-zinc-900">
            <ul className="container mx-auto grid grid-cols-3 place-items-center gap-4 py-6 text-base font-bold sm:text-2xl">
                <li>
                    <NavLink to="/acerca-de" className={({ isActive }) => (isActive ? "underline decoration-red-500 decoration-8 underline-offset-8" : "")}>
                        Acerca de
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        <div className={`w-fit rounded-xl ${isActiveLogo ? "animate-neon outline outline-4" : ""}`}>
                            <img width={200} src="/src/assets/localhost_logo_pp.webp" alt="Logo" className="rounded-full p-2" />
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/sugerencias" className={({ isActive }) => (isActive ? "underline decoration-red-500 decoration-8 underline-offset-8" : "")}>
                        Sugiera un juego
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;
