import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api"; // NEW endpoint
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites"; // NEW

const UpcomingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);

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
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToFavouritesIcon movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;
