import { useNavigate } from "react-router-dom";
import { imageCustom } from "../utils/ResizeImages";
import { useContext } from "react";
import { VotesContext } from "../contexts/Vote/VotesContext";

const GameCard = ({ game, category }) => {
    const navigate = useNavigate();

    const { votes, addVote, removeVote } = useContext(VotesContext);
    const handleClick = () => {
        localStorage.setItem("lastCategorySlug", `/categorias/${category.slug}`);
        navigate(`/juegos/${game.slug}`);
    };

    const isVoted = () => {
        return votes.some((vote) => vote.id === game.id && vote.categoryId === category.id);
    };

    return (
        <div className="w-[280px]">
            <div className={`group relative cursor-pointer overflow-hidden rounded-xl ${isVoted() ? "outline outline-4" : ""}`} onClick={handleClick}>
                <img className="w-full" src={imageCustom(game.cover.url, "t_cover_big")} alt={game.name} />
                <div className="absolute left-1/2 top-0 z-20 hidden h-[calc(100%+10px)] w-full -translate-x-1/2 group-hover:block">
                    <video className="my-auto h-full object-cover" autoPlay loop src={"https:" + game.minitrailer.url} alt={game.name + "minitrailer"} />
                </div>
            </div>
            {!isVoted() && (
                <button
                    className="mt-4 w-full rounded-xl bg-red-500 py-2 text-center text-white hover:bg-red-600"
                    onClick={() => addVote({ id: game.id, name: game.name, cover: game.cover.url, categoryId: category.id })}
                >
                    Votar
                </button>
            )}
            {isVoted() && (
                <button className="mt-4 w-full rounded-xl bg-gray-500 py-2 text-center text-white hover:bg-gray-600" onClick={() => removeVote(category.id)}>
                    Quitar
                </button>
            )}
            <p className="mt-2 cursor-pointer text-balance text-center text-lg font-semibold" onClick={handleClick}>
                {game.name}
            </p>
        </div>
    );
};
export default GameCard;
