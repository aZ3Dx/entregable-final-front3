import { useState } from "react";
import { VotesContext } from "./VotesContext";

export const VotesProvider = ({ children }) => {
    const [votes, setVotes] = useState([]);

    const addVote = (newVote) => {
        setVotes((prevVotes) => {
            const filteredVotes = prevVotes.filter((vote) => vote.categoryId !== newVote.categoryId);
            return [...filteredVotes, newVote];
        });
    };

    const removeVote = (categoryId) => {
        setVotes((prevVotes) => prevVotes.filter((vote) => vote.categoryId !== categoryId));
    };

    const clearVotes = () => {
        setVotes([]);
    };

    return <VotesContext.Provider value={{ votes, addVote, removeVote, clearVotes }}>{children}</VotesContext.Provider>;
};
