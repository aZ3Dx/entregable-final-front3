const AboutPage = () => {
    return (
        <main className="container mx-auto min-h-screen font-chivo">
            <h1 className="my-10 text-center text-4xl font-bold">Acerca de</h1>
            <p className="mb-10 block text-balance text-center text-2xl font-bold text-red-500">
                En caso de ver la página &quot;vacía&quot; &#40;no se muestran juegos ni categorías&#41;, por favor, esperar unos instantes, una de las api se
                ha de estar inicializando.
            </p>
            <p className="mb-10 text-center text-2xl">¡Bienvenido a Localhost Games Awards!</p>
            <p className="mb-4 text-balance text-center text-2xl font-light">
                Localhost Games Awards es una plataforma de votación de juegos desarrollada por un equipo de desarrolladores (solo 1 dev 😅 por ahora...)
            </p>

            <p className="mb-10 text-balance text-center text-2xl font-light">Detalles de la plataforma:</p>
            <ul className="mb-10 list-disc text-balance px-10 text-2xl font-light lg:px-32 xl:px-40 2xl:px-60">
                <li>
                    Se utilizó información proporcionada por la API de{" "}
                    <a href="https://api-docs.igdb.com" target="_blank" className="underline">
                        IGDB
                    </a>
                    .
                </li>
                <li>
                    El diseño está basado en la plataforma de{" "}
                    <a href="https://thegameawards.com/" target="_blank" className="underline">
                        &quot;The Games Awards&quot;
                    </a>
                    .
                </li>
                <li>
                    Estilos aplicados con la ayuda de la librería{" "}
                    <a href="https://tailwindcss.com/" target="_blank" className="underline">
                        Tailwind
                    </a>
                    .
                </li>
                <li>El uso de rutas dinámicas está presente en la ruta a &quot;/categorias/:slug&quot; y &quot;/juegos/:slug&quot;.</li>
                <li>Hooks requeridos presentes en el proyecto.</li>
                <li>Test básico realizado para el formulario en &quot;/sugerencias&quot;.</li>
            </ul>
        </main>
    );
};

export default AboutPage;
