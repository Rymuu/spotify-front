"use client";

import React from "react";
import { useCallback } from "react";
import { IoPlaySkipForwardSharp } from "react-icons/io5";

const SkipForwardButton = ({ array, indexArray, goNext }) => {
  return (
    <button onClick={() => goNext(array, indexArray)}>
      <IoPlaySkipForwardSharp
        size={20}
        className="text-neutral-400 hover:text-white"
      />
    </button>
  );
};

export default SkipForwardButton;
