import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";

const PlayButton = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  isThereAPlaylist,
}) => {
  return (
    <div>
      {isPlaying && isThereAPlaylist ? (
        <button
          className="p-[7.5px] bg-white rounded-full"
          onClick={() => {
            audioRef.current.pause();
            setIsPlaying(false);
          }}
        >
          <IoMdPause size={20} className="text-black" />
        </button>
      ) : (
        <button
          className="p-[10px] bg-white rounded-full"
          onClick={() => {
            if (isThereAPlaylist) {
              audioRef.current.play();
              setIsPlaying(true);
            }
          }}
        >
          <FaPlay size={15} className="text-black " />
        </button>
      )}
    </div>
  );
};

export default PlayButton;
