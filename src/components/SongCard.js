import React from "react";
import Image from "next/image";

const SongCard = ({ song, index, artist, onDoubleClick, coverSrc = false }) => {
  return (
    <div
      onDoubleClick={onDoubleClick}
      className="flex p-2 items-center hover:bg-white/10 text-neutral-400 hover:text-white rounded-lg font-semibold"
    >
      <p className="px-4 w-14">{index}</p>
      <div className="flex gap-x-4 px-4">
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt="Album cover"
            width={40}
            height={40}
            className={`rounded-lg`}
          />
        ) : (
          <></>
        )}
        <div>
          <p className="text-white">{song.title}</p>
          <p>{artist}</p>
        </div>
      </div>
      <p className="px-4 ml-auto">{song.listenCount}</p>
    </div>
  );
};

export default SongCard;
