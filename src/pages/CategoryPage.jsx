import { useEffect } from "react";
import { getCategoryBySlug, getGamesByCategoryId } from "../utils/Queries";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import GameCard from "../components/GameCard";
import NotFoundPage from "./NotFoundPage";

const CategoryPage = () => {
    const { slug } = useParams();
    const [games, setGames] = useState([]);
    const [category, setCategory] = useState([]);
    const [isSlugValid, setIsSlugValid] = useState(true);

    useEffect(() => {
        getCategoryBySlug(slug)
            .then((data) => {
                setCategory(data[0]);
                return getGamesByCategoryId(data[0].id);
            })
            .then((games) => {
                setGames(games);
            })
            .catch((error) => {
                console.error("Error en las consultas", error);
                setIsSlugValid(false);
            });
    }, [slug]);

    if (!isSlugValid) {
        return <NotFoundPage />;
    }

    return (
        <main className="min-h-[50vh] font-chivo">
            <section className="container mx-auto mb-10">
                <h1 className="my-10 text-center text-4xl font-bold">{category.title}</h1>
                <p className="mb-10 text-balance text-center text-2xl">{category.description}</p>
                <NavLink
                    to="/"
                    className="mx-auto block w-fit rounded-xl bg-zinc-700 px-6 py-2 text-center text-white outline outline-1 outline-zinc-300 hover:bg-zinc-600"
                >
                    Volver a las categorías
                </NavLink>
            </section>
            <section className="container mx-auto mb-16 flex flex-wrap justify-center gap-10 px-6 lg:px-16 xl:px-40">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} category={category} />
                ))}
            </section>
        </main>
    );
};
export default CategoryPage;
