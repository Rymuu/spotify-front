import React from "react";

const SongCard = ({ song, index, artist, onDoubleClick }) => {
  return (
    <div
      onDoubleClick={onDoubleClick}
      className="flex p-2 items-center hover:bg-white/10 text-neutral-400 hover:text-white rounded-lg font-semibold"
    >
      <p className="px-4">{index}</p>
      <div className="px-4">
        <p className="text-white">{song.title}</p>
        <p>{artist}</p>
      </div>
      <p className="px-4 ml-auto">{song.listenCount}</p>
    </div>
  );
};

export default SongCard;
