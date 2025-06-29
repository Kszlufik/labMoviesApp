import React from "react";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const AddToPlaylistIcon: React.FC<{ movie: any }> = ({ movie }) => {
  return (
    <PlaylistAddIcon color="primary" fontSize="small" />
  );
};

export default AddToPlaylistIcon;
