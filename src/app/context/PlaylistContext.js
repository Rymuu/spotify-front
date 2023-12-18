"use client";

import { createContext, useState, useEffect } from "react";
import { getAlbum, getArtist } from "@/app/api/index";

export const PlaylistContext = createContext({});

export const PlaylistContextProvider = ({ children }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [currentArtist, setCurrentArtist] = useState("");
  const [albumCover, setAlbumCover] = useState("");
  const [playlistIndex, setPlaylistIndex] = useState(0);

  useEffect(() => {
    const fetchAlbum = async (id) => {
      try {
        const dataAlbum = await getAlbum(id);
        const dataArtist = await getArtist(dataAlbum.artistId);
        setCurrentArtist(dataArtist.name);
        setCurrentPlaylist(dataAlbum.audios);
        setAlbumCover(dataAlbum.cover);
        console.log("playlist : ", dataAlbum.audios);
      } catch (error) {
        console.error("Error fetching album:", error);
      }
    };

    if (selectedAlbumId !== null) {
      fetchAlbum(selectedAlbumId);
    }

    // Autres logiques avec currentPlaylist
  }, [selectedAlbumId]);

  const setAlbumId = (id) => {
    setSelectedAlbumId(id);
  };

  const context = {
    currentPlaylist,
    currentArtist,
    albumCover,
    playlistIndex,
    setAlbumId,
    setPlaylistIndex,
  };

  return (
    <PlaylistContext.Provider value={context}>
      {children}
    </PlaylistContext.Provider>
  );
};
