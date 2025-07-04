import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    addToFavourites: (movie: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
    addReview: (movie: BaseMovieProps, review: Review) => void;
    mustWatch: number[]; 
    addToPlaylist: (movie: BaseMovieProps) => void; 
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: () => {},
    mustWatch: [], 
    addToPlaylist: () => {}, 
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]); // NEW
    const [myReviews, setMyReviews] = useState<{ [movieId: number]: Review }>({});

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prev) => prev.includes(movie.id) ? prev : [...prev, movie.id]);
    }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prev) => prev.filter((id) => id !== movie.id));
    }, []);

    const addReview = useCallback((movie: BaseMovieProps, review: Review) => {
        setMyReviews((prev) => ({ ...prev, [movie.id]: review }));
    }, []);

    const addToPlaylist = useCallback((movie: BaseMovieProps) => {
        setMustWatch((prev) => prev.includes(movie.id) ? prev : [...prev, movie.id]);
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                mustWatch, 
                addToPlaylist, 
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
