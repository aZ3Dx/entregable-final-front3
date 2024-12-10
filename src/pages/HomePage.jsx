import { useEffect } from "react";
import { getCategories } from "../utils/Queries";
import { useState } from "react";
import CategoryCard from "../components/CategoryCard";
import ModalVote from "../components/ModalVote";
import { useReward } from "react-rewards";
const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const { reward } = useReward("modal-button", "confetti");

    const handleVoteSuccess = () => {
        setModalOpen(false);
        reward();
    };

    const closeModal = () => {
        if (!modalOpen) return;
        setModalOpen(false);
    };

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error al obtener las categorías:", error));
    }, []);

    return (
        <main className="container mx-auto min-h-[50vh] font-chivo">
            <h1 className="my-10 text-center text-4xl font-bold">BIENVENIDO A LOS LOCALHOST GAMES AWARDS</h1>
            <p className="mb-10 text-center text-2xl">¡LLegó el momento de votar por tus juegos favoritos!</p>
            <p className="mb-10 text-center text-2xl font-light">
                Realiza tu voto por cada categoría
                <br />
                Recuerda que solo puedes seleccionar un juego por categoría
                <br />
                Para votar pulsa el botón de{" "}
                <a className="font-bold text-red-500" href="#modal-button">
                    votar
                </a>{" "}
                que se encuentra más abajo
                <br />
                No hace falta seleccionar un juego de cada categoría
            </p>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </section>
            <section className="relative my-16 flex justify-center">
                <button
                    id="modal-button"
                    className="rounded-xl bg-red-500 px-12 py-4 text-center text-2xl text-white hover:bg-red-600"
                    onClick={() => setModalOpen(true)}
                >
                    VOTAR
                </button>
            </section>
            {modalOpen && <ModalVote closeModal={closeModal} onVoteSuccess={handleVoteSuccess} />}
        </main>
    );
};
export default HomePage;
