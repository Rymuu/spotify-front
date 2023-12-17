"use client";

import React from "react";
import { useCallback } from "react";
import shuffle from "just-shuffle";
import { LiaRandomSolid } from "react-icons/lia";

const RandomizeButton = ({ array, setPlayList, setIndexPlayList }) => {
  const randomize = useCallback(
    (array) => {
      const randomizedArray = shuffle(array);
      setPlayList(randomizedArray);
      setIndexPlayList(0);
    },
    [setIndexPlayList, setPlayList]
  );

  return (
    <button onClick={() => randomize(array)}>
      <LiaRandomSolid size={20} className="text-neutral-400 hover:text-white" />
    </button>
  );
};

export default RandomizeButton;
