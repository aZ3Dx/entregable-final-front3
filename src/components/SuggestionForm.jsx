import { useEffect, useState } from "react";
import { getCategories, searchGames } from "../utils/Queries";
import { imageCustom } from "../utils/ResizeImages";
import SearchIcon from "../icons/SearchIcon";
import LoadingIcon from "../icons/LoadingIcon";
import CloseIcon from "../icons/CloseIcon";

const SuggestionForm = () => {
    const [categories, setCategories] = useState([]);
    const [games, setGames] = useState([]);
    const [isFetchingGames, setIsFetchingGames] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        gameName: "",
        gameId: "",
        category: "",
        suggestion: "",
        email: "",
    });
    const [errors, setErrors] = useState({
        gameName: false,
        gameId: false,
        category: false,
        suggestion: false,
        email: false,
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getGames = (searchQuery) => {
        searchGames(searchQuery)
            .then((data) => {
                setGames(data);
                setIsFetchingGames(false);
            })
            .catch((error) => console.error("Error al obtener las categorías:", error));
    };

    const handleGameSelect = (game) => {
        setSelectedGame(game);
        setFormData({ ...formData, gameId: game.game.id, gameName: game.name });
        setGames([]);
    };

    const handleOnFocus = () => {
        if (!games.length) {
            setSelectedGame(null);
            setFormData({ ...formData, gameId: "", gameName: "" });
        }
    };

    const handleOnClose = () => {
        if (formData.gameId !== "") {
            return;
        }
        setGames([]);
        setSelectedGame(null);
        setFormData({ ...formData, gameId: "", gameName: "" });
    };

    useEffect(() => {
        if (formData.gameId !== "") {
            return;
        }
        if (formData.gameName.length < 3) {
            setGames([]);
            setIsFetchingGames(false);
            return;
        }
        setIsFetchingGames(true);
        const delayDebounceFn = setTimeout(() => {
            getGames(formData.gameName);
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [formData.gameName, formData.gameId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const regexEmail = /^\S+@\S+\.\S+$/;

        const errorsFound = {
            gameName: formData.gameName === "" || formData.gameName.length < 3,
            gameId: formData.gameId === "" || isNaN(formData.gameId),
            category: formData.category === "" || isNaN(formData.category),
            suggestion: formData.suggestion === "" || formData.suggestion.length < 10,
            email: formData.email === "" || !regexEmail.test(formData.email),
        };
        setErrors(errorsFound);
        if (Object.values(errorsFound).some((error) => error)) {
            return;
        }

        setIsSubmitting(true);
        console.log("Formulario enviado:", formData);
    };

    useEffect(() => {
        getCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => console.error("Error al obtener las categorías:", error));
    }, []);

    return (
        <form className="mx-auto mb-16 max-w-[500px] rounded-xl bg-zinc-900 p-10" action="#" onSubmit={handleSubmit}>
            <div className="mb-6">
                <label htmlFor="gameName" className="mb-2 block text-2xl font-bold">
                    Juego
                </label>
                <div className="relative">
                    <input
                        type="text"
                        id="gameName"
                        name="gameName"
                        role="gameName"
                        disabled={isSubmitting}
                        placeholder="Busca el juego que deseas sugerir (Ej: apex)"
                        className="mb-2 w-full rounded-lg bg-zinc-800 p-2"
                        value={formData.gameName}
                        onChange={handleInputChange}
                        onFocus={handleOnFocus}
                        autoComplete="off"
                    />
                    {isFetchingGames ? <LoadingIcon /> : games.length > 0 ? <CloseIcon onClick={handleOnClose} /> : <SearchIcon />}
                    {games.length > 0 && !isFetchingGames && (
                        <div className="absolute left-0 top-12 z-10 max-h-[200px] w-full overflow-y-scroll overscroll-contain rounded-xl bg-zinc-800 p-2 outline outline-1 outline-zinc-700">
                            {games
                                .filter((game) => game?.game?.cover)
                                .map((game) => (
                                    <button
                                        key={game.id}
                                        role="game-listed"
                                        type="button"
                                        onClick={() => handleGameSelect(game)}
                                        className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-white hover:bg-zinc-700"
                                    >
                                        <img src={imageCustom(game.game.cover.url, "t_micro")} alt={`${game.game.name} cover`} />
                                        <span>{game.game.name}</span>
                                        <span className="ml-auto text-zinc-400">
                                            &#40;
                                            {new Date(game.game.first_release_date * 1000).toLocaleDateString("es-ES", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })}
                                            &#41;
                                        </span>
                                    </button>
                                ))}
                        </div>
                    )}
                    <div className="flex h-60 w-full flex-col rounded-xl bg-zinc-800 p-4">
                        <p className="mb-2 text-center text-zinc-400">Juego Seleccionado</p>
                        <div className="grid flex-1 grid-cols-2 items-center gap-2 overflow-hidden">
                            {selectedGame ? (
                                <>
                                    <img
                                        className="max-h-full max-w-full justify-self-center rounded-xl"
                                        src={imageCustom(selectedGame.game.cover.url, "t_cover_big")}
                                        alt={selectedGame.game.name}
                                    />
                                    <p>{selectedGame.game.name}</p>
                                </>
                            ) : (
                                <>
                                    <img
                                        className="max-h-full max-w-full justify-self-center rounded-xl"
                                        src="/src/assets/game_cover_placeholder.webp"
                                        alt="game cover placeholder"
                                    />
                                    <p>No hay juego seleccionado</p>
                                </>
                            )}
                        </div>
                    </div>
                    {errors.gameId && <p className="text-red-500">Debes seleccionar un juego, para que aparezca en el recuadro de arriba</p>}
                </div>
            </div>
            <input type="hidden" name="game-id" role="game-id" value={formData.gameId} onChange={handleInputChange} />
            <div className="mb-6">
                <label htmlFor="category" className="mb-2 block text-2xl font-bold">
                    Categoría
                </label>
                <select
                    type="text"
                    id="category"
                    name="category"
                    role="category"
                    disabled={isSubmitting}
                    onChange={handleInputChange}
                    value={formData.category}
                    className={`w-full rounded-lg bg-zinc-800 px-2 py-3 ${formData.category === "" ? "text-zinc-400" : "text-white"}`}
                >
                    <option value="" disabled>
                        Categoría a la que nominarías el juego
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} role="option-category" value={category.id} className="text-white">
                            {category.title}
                        </option>
                    ))}
                </select>
                {errors.category && <p className="text-red-500">Debes seleccionar una categoría</p>}
            </div>
            <div className="mb-6">
                <label htmlFor="suggestion" className="mb-2 block text-2xl font-bold">
                    Sugerencia
                </label>
                <textarea
                    id="suggestion"
                    name="suggestion"
                    role="suggestion"
                    disabled={isSubmitting}
                    placeholder="Cuéntanos porqué deseas ver este juego"
                    className="w-full rounded-lg bg-zinc-800 p-2"
                    rows="4"
                    value={formData.suggestion}
                    onChange={handleInputChange}
                ></textarea>
                {errors.suggestion && <p className="text-red-500">La sugerencia debe tener al menos 10 caracteres</p>}
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="mb-2 block text-2xl font-bold">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    role="email"
                    disabled={isSubmitting}
                    placeholder="tucorreo@dominio.com"
                    className="w-full rounded-lg bg-zinc-800 p-2"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {errors.email && <p className="text-red-500">Debes ingresar un email válido</p>}
            </div>
            <button
                type="submit"
                role="submit"
                disabled={isSubmitting}
                className={`w-full rounded-xl bg-zinc-700 py-4 text-center ${isSubmitting ? "outline outline-2 outline-zinc-300" : "hover:bg-zinc-600"}`}
            >
                {isSubmitting ? "Enviando..." : "Enviar sugerencia"}
            </button>
            {isSubmitting && <p className="mt-2 font-light text-zinc-400">En consola se puede ver el formData</p>}
        </form>
    );
};
export default SuggestionForm;
