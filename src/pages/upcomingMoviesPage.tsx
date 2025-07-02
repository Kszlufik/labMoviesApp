<<<<<<< HEAD
import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { useQuery } from "react-query";

const UpcomingMoviesPage: React.FC = () => {
  const { data: movies = [], isLoading, isError, error } = useQuery<BaseMovieProps[]>(
    ["upcomingMovies"],
    getUpcomingMovies
  );

  if (isLoading) {
    return <div>Loading upcoming movies...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }
=======
import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api"; // NEW endpoint
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist"; // NEW

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
>>>>>>> 9e36b673ad0fb206c5224fdc02e55c25b53fa20f

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToPlaylistIcon movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;
