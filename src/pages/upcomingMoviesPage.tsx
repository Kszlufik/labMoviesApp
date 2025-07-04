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

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToPlaylistIcon movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;
