import SuggestionForm from "../components/SuggestionForm";

const SuggestionsPage = () => {
    return (
        <main className="container mx-auto min-h-screen font-chivo">
            <h1 className="my-10 text-center text-4xl font-bold">¿Se nos pasó algo?</h1>
            <p className="mb-10 text-balance text-center text-2xl">Envíanos la información del juego que deseearías ver en la plataforma de votación.</p>
            <div className="mx-4">
                <SuggestionForm />
            </div>
        </main>
    );
};
export default SuggestionsPage;
