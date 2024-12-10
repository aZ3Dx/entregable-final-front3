import { apiUrlAwards, apiUrlIGDB } from "./Constants";

export const getCategories = async () => {
    const response = await fetch(apiUrlAwards + "/v1/categories", {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    const categories = await response.json();
    return categories;
};

export const getCategoryBySlug = async (slug) => {
    const response = await fetch(apiUrlAwards + `/v1/categories?slug=${slug}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    const category = await response.json();
    if (category.length === 0) {
        throw new Error(`Category not found: ${slug}`);
    }

    return category;
};

export const getGamesByCategoryId = async (id) => {
    const response = await fetch(apiUrlAwards + `/v1/games?categories_like=${id}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Error fetching games: ${response.statusText}`);
    }

    const games = await response.json();
    return games;
};

export const getGameBySlug = async (slug) => {
    const response = await fetch(apiUrlAwards + `/v1/games?slug=${slug}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Error fetching games: ${response.statusText}`);
    }

    const game = await response.json();

    if (game.length === 0) {
        throw new Error(`Game not found: ${slug}`);
    }
    return game;
};

export const searchGames = async (query) => {
    const response = await fetch(apiUrlIGDB + `/v4/search?q=${query}`, {
        method: "POST",
        body: `fields name,game.cover.url,game.name,game.slug,game.first_release_date; search "${query}"; limit 20; where game !=n & game.parent_game =n & game.first_release_date !=n;`,
    });

    if (!response.ok) {
        throw new Error(`Error fetching games: ${response.statusText}`);
    }

    const games = await response.json();
    return games;
};
