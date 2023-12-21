import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const PlayButton = ({ audioRef, isPlaying, setIsPlaying }) => {
  return (
    <button
      className="p-[10px] bg-white rounded-full"
      onClick={() => {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }}
    >
      {isPlaying ? (
        <FaPause size={20} className="text-black" />
      ) : (
        <FaPlay size={20} className="text-black" />
      )}
    </button>
  );
};

export default PlayButton;
