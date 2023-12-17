"use client";

import React from "react";
import { useCallback } from "react";
import { IoPlaySkipBackSharp } from "react-icons/io5";

const SkipBackButton = ({
  array,
  indexArray,
  setIsPlaying,
  setIndexPlayList,
}) => {
  const goBack = useCallback(
    (array, indexArray) => {
      setIsPlaying(true);
      if (indexArray > 0) {
        setIndexPlayList(indexArray - 1);
      } else {
        setIndexPlayList(array.length - 1);
      }
    },
    [setIndexPlayList, setIsPlaying]
  );
  return (
    <button onClick={() => goBack(array, indexArray)}>
      <IoPlaySkipBackSharp
        size={20}
        className="text-neutral-400 hover:text-white"
      />
    </button>
  );
};

export default SkipBackButton;
