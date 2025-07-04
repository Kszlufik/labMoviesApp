import React, { useContext } from "react";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps } from "../../types/interfaces";

interface Props {
    movie: BaseMovieProps;
}

const AddToPlaylistIcon: React.FC<Props> = ({ movie }) => {
    const { mustWatch, addToPlaylist } = useContext(MoviesContext);

    const handleAddToPlaylist = (e: React.MouseEvent) => {
        e.preventDefault();
        addToPlaylist(movie);
    };

    const isInPlaylist = mustWatch.includes(movie.id);

    return (
        <PlaylistAddIcon
            color={isInPlaylist ? "secondary" : "primary"}
            fontSize="small"
            onClick={handleAddToPlaylist}
            style={{ cursor: "pointer" }}
        />
    );
};

export default AddToPlaylistIcon;
