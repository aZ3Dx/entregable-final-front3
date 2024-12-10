import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VotesContext } from "../contexts/Vote/VotesContext";
import { imageCustom } from "../utils/ResizeImages";

const CategoryCard = ({ category }) => {
    const navigate = useNavigate();

    const { votes } = useContext(VotesContext);

    const handleClick = () => {
        navigate(`/categorias/${category.slug}`);
    };

    const gameVoted = votes.find((vote) => vote.categoryId === category.id) ?? null;

    return (
        <div
            className="flex h-64 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-gray-200 p-4 text-white outline outline-1 outline-red-500 transition duration-300 ease-in-out hover:bg-gray-500 hover:text-white"
            onClick={handleClick}
            style={{
                background: `url("/src/assets/category_placeholder.webp") no-repeat center center/cover`,
            }}
        >
            <p className="text-center text-2xl font-bold">{category.title}</p>
            {gameVoted && (
                <>
                    <img width={90} src={imageCustom(gameVoted.cover, "t_cover_small")} alt={gameVoted.name + " cover"} />
                    <p className="line-clamp-1 text-balance text-center text-lg">{gameVoted.name}</p>
                </>
            )}
        </div>
    );
};
export default CategoryCard;
