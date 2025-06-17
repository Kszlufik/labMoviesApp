import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { BaseMovieProps } from "../types/interfaces";
import { getMovies } from "../api/tmdb-api";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);

  // New function: add movie to favourites and persist
  const addToFavourites = (movieId: number) => {
    const updatedMovies = movies.map((m: BaseMovieProps) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setMovies(updatedMovies);
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const stored = localStorage.getItem("movies");
      if (stored) {
        setMovies(JSON.parse(stored));
      } else {
        const data = await getMovies();
        setMovies(data);
        localStorage.setItem("movies", JSON.stringify(data));
      }
    };

    fetchMovies();
  }, []);

  return (
    <PageTemplate
      title='Discover Movies'
      movies={movies}
      selectFavourite={addToFavourites}
    />
  );
};

export default HomePage;
