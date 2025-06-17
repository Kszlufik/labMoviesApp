import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MovieDetailsProps } from "../../types/interfaces";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
};

const MovieHeader: React.FC<MovieDetailsProps> = ({
  title,
  homepage,
  tagline,
  id,
}) => {
  const isFavourite = (() => {
    try {
      const storedMovies = JSON.parse(localStorage.getItem("movies") || "[]");
      return storedMovies.some(
        (m: any) => m.id === id && m.favourite === true
      );
    } catch {
      return false;
    }
  })();

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {isFavourite && (
          <FavoriteIcon
            sx={{ color: "red", fontSize: "large", verticalAlign: "middle" }}
          />
        )}
        <Typography variant="h4" component="h3" sx={{ margin: 0 }}>
          {title}{" "}
          <a href={homepage} target="_blank" rel="noopener noreferrer">
            <HomeIcon color="primary" fontSize="large" />
          </a>
          <br />
          <span>{tagline}</span>
        </Typography>
      </div>

      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
