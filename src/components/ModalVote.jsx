import { useContext, useEffect, useState } from "react";
import { getCategories } from "../utils/Queries";
import { VotesContext } from "../contexts/Vote/VotesContext";
import { NavLink } from "react-router-dom";

const ModalVote = ({ closeModal, onVoteSuccess }) => {
    const [unvotedCategories, setUnvotedCategories] = useState(null);
    const { votes, clearVotes } = useContext(VotesContext);
    const [formData, setFormData] = useState({
        name: "",
    });
    const [errors, setErrors] = useState({
        name: false,
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        getCategories()
            .then((data) => {
                setUnvotedCategories(
                    data.filter((category) => {
                        return !votes.some((vote) => vote.categoryId === category.id);
                    }),
                );
            })
            .catch((error) => console.error("Error al obtener las categorías:", error));
    }, [votes]);

    const handleBackdropClick = (e) => {
        if (e.target.id === "modal-backdrop") {
            closeModal();
        }
    };

    if (!unvotedCategories) {
        return (
            <div id="modal-backdrop" className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50" onClick={handleBackdropClick}>
                <p>Cargando...</p>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const regexName = /^[a-zA-Z]{3,}$/;
        const name = e.target[0].value;

        if (!regexName.test(name)) {
            setErrors({ name: true });
            return;
        }

        clearVotes();
        onVoteSuccess();
    };

    return (
        <div id="modal-backdrop" className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50" onClick={handleBackdropClick}>
            <div className="z-50 flex w-96 flex-col gap-4 rounded-xl bg-[#272727] p-8">
                <h2 className="text-2xl font-bold">¿Ya estás listo para votar?</h2>
                {unvotedCategories.length > 0 ? (
                    <div>
                        <p className="mb-2">Por si lo habías olvidado, te falta seleccionar un juego en las siguientes categorias:</p>
                        <ul className="mb-2 list-disc pl-4 font-light italic">
                            {unvotedCategories.map((category) => (
                                <li key={category.id} className="hover:underline">
                                    <NavLink to={`/categorias/${category.slug}`}>{category.title}</NavLink>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm font-light text-zinc-300">¡No te preocupes, no hace falta seleccionar un juego de cada categoría!</p>
                    </div>
                ) : (
                    <p className="">Solo indícanos tu nombre ¡Mucha suerte!</p>
                )}
                <form action="#" className="mt-2 flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="relative w-full">
                        <input
                            type="text"
                            className={`w-full rounded-xl border-2 bg-[#272727] p-2 text-white ${errors.name ? "border-red-500" : "border-zinc-500"}`}
                            placeholder="Tu nombre..."
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <p className="absolute left-1 top-12 text-sm font-light text-red-500">El nombre debe tener al menos 3 letras</p>}
                    </div>
                    <button type="submit" className="w-full rounded-xl bg-red-500 py-4 text-center text-white hover:bg-red-600">
                        Votar
                    </button>
                </form>
            </div>
        </div>
    );
};
export default ModalVote;
