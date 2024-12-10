import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import GamePage from "./pages/GamePage";
import SuggestionsPage from "./pages/SuggestionsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./layouts/Layout";
import { VotesProvider } from "./contexts/Vote/VotesProvider";

function App() {
    return (
        <VotesProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/categorias/:slug" element={<CategoryPage />} />
                        <Route path="/juegos/:slug" element={<GamePage />} />
                        <Route path="/sugerencias" element={<SuggestionsPage />} />
                        <Route path="/acerca-de" element={<AboutPage />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </VotesProvider>
    );
}

export default App;
