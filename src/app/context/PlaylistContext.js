"use client";

import { createContext, useState, useEffect } from "react";
import { getAlbum, getArtist } from "@/app/api/index";

export const PlaylistContext = createContext({});

export const PlaylistContextProvider = ({ children }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [playlistIndex, setPlaylistIndex] = useState(0);

  const context = {
    currentPlaylist,
    playlistIndex,
    setPlaylistIndex,
    setCurrentPlaylist,
  };

  return (
    <PlaylistContext.Provider value={context}>
      {children}
    </PlaylistContext.Provider>
  );
};
