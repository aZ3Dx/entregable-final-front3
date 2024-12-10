/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                chivo: ["Chivo Variable", "sans-serif"],
            },
            keyframes: {
                neon: {
                    "0%": { outlineColor: "red" },
                    "50%": { outlineColor: "#272727" },
                    "100%": { outlineColor: "red" },
                },
            },
            animation: {
                neon: "neon 3s linear infinite",
            },
        },
    },
    plugins: [],
};
