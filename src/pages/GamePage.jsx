import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getGameBySlug } from "../utils/Queries";
import { imageCustom } from "../utils/ResizeImages";
import ScrollToTop from "../components/ScrollToTop";
import NotFoundPage from "./NotFoundPage";

const GamePage = () => {
    const { slug } = useParams();
    const [game, setGame] = useState(null);
    const [isSlugValid, setIsSlugValid] = useState(true);

    const lastCategorySlug = localStorage.getItem("lastCategorySlug") || "/categorias";

    useEffect(() => {
        getGameBySlug(slug)
            .then((data) => setGame(data[0]))
            .catch((error) => {
                console.error("Error al obtener el juego", error);
                setIsSlugValid(false);
            });
    }, [slug]);

    if (!isSlugValid) {
        return <NotFoundPage />;
    }

    if (!game) {
        return <main className="min-h-screen font-chivo"></main>;
    }

    return (
        <main className="relative font-chivo">
            <ScrollToTop />
            <div
                className="absolute left-0 top-0 -z-10 h-screen w-full"
                style={{
                    background: `linear-gradient(to bottom, transparent 50%, #272727 80%), url(${imageCustom(game.screenshots[0].url, "t_1080p")}) no-repeat center center/cover`,
                }}
            ></div>
            <section className="container mx-auto flex justify-center py-10">
                <h1 className="w-full rounded-xl bg-zinc-900 bg-opacity-90 p-4 text-center text-2xl font-bold lg:text-6xl">{game.name}</h1>
            </section>
            <section className="container mx-auto mb-10 flex flex-wrap justify-center gap-10 lg:flex-nowrap">
                <img className="rounded-xl object-cover" src={imageCustom(game.cover.url, "t_cover_big")} alt={game.name} />
                <iframe
                    className="hidden rounded-xl lg:block lg:w-1/2"
                    width="640"
                    src={"https://www.youtube-nocookie.com/embed/" + game.videos[game.videos.length - 1].video_id}
                    title={game.name}
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
                <div className="flex flex-grow flex-col gap-4 text-xl">
                    <p className="rounded-xl bg-zinc-900 p-4">
                        <span className="font-bold">Juego: </span>
                        <span>{game.name}</span>
                    </p>
                    <p className="rounded-xl bg-zinc-900 p-4">
                        <span className="font-bold">Calificación: </span>
                        <span>{game.total_rating.toFixed(0)}</span>
                    </p>
                    {game.platforms.length === 1 ? (
                        <p className="rounded-xl bg-zinc-900 p-4">
                            <span className="font-bold">Plataforma: </span>
                            <span key={game.platforms[0].id}>{game.platforms[0].name}</span>
                        </p>
                    ) : (
                        <div className="rounded-xl bg-zinc-900 p-4">
                            <p className="pb-2 font-bold">Plataformas:</p>
                            <ul>
                                {game.platforms.map((platform) => {
                                    return (
                                        <li className="" key={platform.id}>
                                            {platform.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </section>
            <section>
                <NavLink
                    to={lastCategorySlug}
                    className="mx-auto mb-10 block w-fit rounded-xl hover:bg-zinc-600 bg-zinc-700 px-6 py-2 text-center text-white outline outline-1 outline-zinc-300"
                >
                    Volver a ver los juegos
                </NavLink>
            </section>
            <section className="container mx-auto mb-10 flex flex-col rounded-xl bg-zinc-900 p-10">
                <h2 className="mb-12 mt-3 text-center text-4xl font-bold">Descripción</h2>
                <p className="text-left text-xl">
                    <span className="font-light italic">&#40;Sólo disponible en inglés😅&#41;</span>
                    <br />
                    {game.summary}
                </p>
            </section>
            <section className="container mx-auto mb-16 rounded-xl bg-zinc-900 p-10">
                <h2 className="mb-12 mt-3 text-center text-4xl font-bold">Capturas</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {game.screenshots.map((screenshot) => (
                        <img key={screenshot.id} src={imageCustom(screenshot.url, "t_screenshot_med")} alt={game.name + "screenshot"} />
                    ))}
                </div>
            </section>
        </main>
    );
};
export default GamePage;
