import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: "happy-dom",
    },
    css: {
        postcss: {
            plugins: [tailwindcss],
        },
    },
});
