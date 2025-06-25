import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api"; // NEW endpoint

const UpcomingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);

  const addToFavourites = (movieId: number) => {
    const updatedMovies = movies.map((m: BaseMovieProps) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setMovies(updatedMovies);
    localStorage.setItem('upcomingMovies', JSON.stringify(updatedMovies));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const stored = localStorage.getItem("upcomingMovies");
      if (stored) {
        setMovies(JSON.parse(stored));
      } else {
        const data = await getUpcomingMovies();
        setMovies(data);
        localStorage.setItem("upcomingMovies", JSON.stringify(data));
      }
    };

    fetchMovies();
  }, []);

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      selectFavourite={addToFavourites}
    />
  );
};

export default UpcomingMoviesPage;
