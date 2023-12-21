"use client";

import React from "react";
import { useCallback, useContext } from "react";
import shuffle from "just-shuffle";
import { LiaRandomSolid } from "react-icons/lia";
import { PlaylistContext } from "@/app/context/PlaylistContext";

const RandomizeButton = ({ array }) => {
  const { setCurrentPlaylist, setPlaylistIndex } = useContext(PlaylistContext);
  const randomize = useCallback(
    (array) => {
      const randomizedArray = shuffle(array);
      const audioIds = randomizedArray.map((audio) => audio.id);
      setCurrentPlaylist(audioIds);
      setPlaylistIndex(0);
    },
    [setPlaylistIndex, setCurrentPlaylist]
  );

  return (
    <button onClick={() => randomize(array)}>
      <LiaRandomSolid size={20} className="text-neutral-400 hover:text-white" />
    </button>
  );
};

export default RandomizeButton;
