import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-10 font-chivo">
            <h1 className="text-9xl font-bold">404</h1>
            <p className="text-4xl">Haz llegado al límite 😎</p>
            <NavLink to="/" className="rounded-xl bg-zinc-700 px-10 py-6 text-center text-white outline outline-1 outline-zinc-500">
                Volver al inicio
            </NavLink>
        </main>
    );
};
export default NotFoundPage;
