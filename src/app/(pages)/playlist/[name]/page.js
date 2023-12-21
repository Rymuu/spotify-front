"use client";

import Image from "next/image";
import { PlaylistContext } from "@/app/context/PlaylistContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaHashtag } from "react-icons/fa";
import {
  getLastListenedAudios,
  getTopListenedAudios,
  getLast10Audios,
} from "@/app/api";
import SongCard from "@/components/Cards/SongCard";

export default function Playlist() {
  const { name } = useParams();
  const [playlist, setPlaylist] = useState();
  const { setCurrentPlaylist, setPlaylistIndex } = useContext(PlaylistContext);
  const [audioIds, setAudioIds] = useState();
  const [title, setTitle] = useState();

  const handleAlbumSelect = (index) => {
    setCurrentPlaylist(audioIds);
    setPlaylistIndex(index);
  };

  useEffect(() => {
    if (name === "newSongs") {
      getLast10Audios()
        .then((data) => {
          setPlaylist(data);
          const audioIds = data.map((audio) => audio.id);
          setAudioIds(audioIds);
        })
        .catch((error) => {
          console.error("Error fetching playlist:", error);
        });
      setTitle("New Songs");
    } else if (name === "lastListenedAudios") {
      getLastListenedAudios()
        .then((data) => {
          setPlaylist(data);
          const audioIds = data.map((audio) => audio.id);
          setAudioIds(audioIds);
        })
        .catch((error) => {
          console.error("Error fetching playlist:", error);
        });
      setTitle("Last listened to");
    } else if (name === "topListenedAudios") {
      getTopListenedAudios()
        .then((data) => {
          setPlaylist(data);
          const audioIds = data.map((audio) => audio.id);
          setAudioIds(audioIds);
        })
        .catch((error) => {
          console.error("Error fetching playlist:", error);
        });
      setTitle("Most listened to");
    } else {
      console.error("Invalid name value:", name);
    }
  }, [name, playlist]);

  return (
    <div className="bg-gradient-to-b from-indigo-500 via-20% to-neutral-900 h-screen">
      {playlist && (
        <div className="flex items-end gap-x-5 m-5">
          <Image
            src="https://d3ozihag9834pq.cloudfront.net/image/music.png"
            alt="Album cover"
            width={"150"}
            height={"150"}
            className="shadow-lg shadow-black/50 rounded-md"
          />

          <div>
            <h1 className="font-bold text-3xl mb-3">{title}</h1>
          </div>
        </div>
      )}
      <div className="bg-gradient-to-b from-neutral-900/40 to-neutral-900 h-full w-full p-5 text-neutral-400 text-sm font-medium">
        <div className="w-full">
          <div className="border-b-[1px] border-white/10 mt-2">
            <div className="flex items-center">
              <p className="p-4 w-16">
                <FaHashtag size={15} />
              </p>
              <p className="p-4">Title</p>
              <p className="p-4 ml-auto">Lectures</p>
            </div>
          </div>

          <div className="mt-4 mb-8">
            {playlist &&
              playlist.map((item, index) => (
                <SongCard
                  coverSrc={item.album?.cover}
                  key={item.id}
                  song={item}
                  artist={item.artist?.name}
                  index={index + 1}
                  onDoubleClick={() => handleAlbumSelect(index)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
