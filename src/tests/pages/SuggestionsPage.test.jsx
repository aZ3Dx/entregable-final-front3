import { cleanup, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import SuggestionsPage from "../../pages/SuggestionsPage";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { apiUrlAwards, apiUrlIGDB } from "../../utils/Constants";
import userEvent from "@testing-library/user-event";

// ************** ACLARACIÓN **************
// Obtenía errores al hacer los tests respectos a que
// mi componente realizaba un fetch para mostrar un listado de categorías
// Había pasado por alto que esto iba a "complicar" el test, y no quería rehacer el componente (formulario)
// Por ello, me basé en la documentación presente en: https://vitest.dev/guide/mocking#requests
// para poder simular el fetch en mi componente
// ************** ACLARACIÓN **************

const categories = [
    { id: 1, title: "Game of the Year", description: "The best game of the year", slug: "game-of-the-year" },
    { id: 2, title: "Best Narrative", description: "The best narrative game", slug: "best-narrative" },
];

const games = [
    {
        id: 6963584,
        game: {
            id: 114795,
            cover: {
                id: 89412,
                url: "//images.igdb.com/igdb/image/upload/t_thumb/co1wzo.jpg",
            },
            first_release_date: 1549238400,
            name: "Apex Legends",
            slug: "apex-legends",
        },
        name: "Apex Legends",
    },
    {
        id: 66902,
        game: {
            id: 5728,
            cover: {
                id: 349235,
                url: "//images.igdb.com/igdb/image/upload/t_thumb/co7hgz.jpg",
            },
            first_release_date: 1045526400,
            name: "Apex",
            slug: "apex",
        },
        name: "Apex",
    },
    {
        id: 62800,
        game: {
            id: 76385,
            cover: {
                id: 105619,
                url: "//images.igdb.com/igdb/image/upload/t_thumb/co29hv.jpg",
            },
            first_release_date: 1518134400,
            name: "Apex Tournament",
            slug: "apex-tournament",
        },
        name: "Apex Tournament",
    },
];

export const restHandlers = [
    http.get(apiUrlAwards + "/v1/categories", () => {
        return HttpResponse.json(categories);
    }),

    http.post(apiUrlIGDB + "/v4/search", () => {
        return HttpResponse.json(games);
    }),
];

const server = setupServer(...restHandlers);

beforeAll(() => {
    server.listen();
});

afterAll(() => {
    server.close();
});

afterEach(() => {
    cleanup();
    server.resetHandlers();
});

describe("Test <SuggestionsPage />", () => {
    test("Debe renderizar el formulario", () => {
        // Arrange
        render(<SuggestionsPage />);
        const inputGameName = screen.getByRole("gameName");
        const inputGameId = screen.getByRole("game-id");
        const inputCategory = screen.getByRole("category");
        const inputSuggestion = screen.getByRole("suggestion");
        const inputEmail = screen.getByRole("email");

        const submitButton = screen.getByRole("submit");

        // Assert
        expect(inputGameName).toBeDefined();
        expect(inputGameId).toBeDefined();
        expect(inputCategory).toBeDefined();
        expect(inputSuggestion).toBeDefined();
        expect(inputEmail).toBeDefined();
        expect(submitButton).toBeDefined();

        // Assert
        expect(inputGameName.getAttribute("type")).toBe("text");
        expect(inputGameId.getAttribute("type")).toBe("hidden");
        expect(inputCategory.getAttribute("type")).toBe("text");
        expect(inputEmail.getAttribute("type")).toBe("text");
        expect(submitButton.getAttribute("type")).toBe("submit");
    });

    test("Debe renderizar las opciones de categoría", async () => {
        // Arrange
        render(<SuggestionsPage />);

        // Act
        const options = await screen.findAllByRole("option-category");

        // Assert
        expect(options).toHaveLength(categories.length);
        expect(options[0].textContent).toBe("Game of the Year");
        expect(options[1].textContent).toBe("Best Narrative");
    });

    test("Debe renderizar las opciones de juegos", async () => {
        // Arrange
        render(<SuggestionsPage />);
        const user = userEvent.setup();

        const inputGameName = screen.getByRole("gameName");

        // Act
        await user.type(inputGameName, "apex");
        const options = await screen.findAllByRole("game-listed", {}, { timeout: 5000 });

        // Assert
        expect(options).toHaveLength(games.length);
        expect(options[0].querySelector("span").textContent).toBe("Apex Legends");
        expect(options[1].querySelector("span").textContent).toBe("Apex");
        expect(options[2].querySelector("span").textContent).toBe("Apex Tournament");
    });

    test("Debe permitir rellenar el formulario", async () => {
        // Arrange
        render(<SuggestionsPage />);
        const user = userEvent.setup();

        const inputGameName = screen.getByRole("gameName");
        const inputGameId = screen.getByRole("game-id");
        const inputCategory = screen.getByRole("category");
        const inputSuggestion = screen.getByRole("suggestion");
        const inputEmail = screen.getByRole("email");

        // Act
        await user.type(inputGameName, "apex");
        const gameOptions = await screen.findAllByRole("game-listed", {}, { timeout: 5000 });
        await user.click(gameOptions[0]);
        await user.selectOptions(inputCategory, "1");
        await user.type(inputSuggestion, "Mejor juego de la historia");
        await user.type(inputEmail, "usuario@correo.com");

        // Assert
        expect(inputGameName.value).toBe("Apex Legends");
        expect(inputGameId.value).toBe("114795");
        expect(inputCategory.value).toBe("1");
        expect(inputSuggestion.value).toBe("Mejor juego de la historia");
        expect(inputEmail.value).toBe("usuario@correo.com");
    });
});
