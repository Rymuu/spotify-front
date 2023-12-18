"use client";

import Image from "next/image";
import { PlaylistContext } from "@/app/context/PlaylistContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { FaHashtag } from "react-icons/fa";
import { getAlbum, getArtist } from "@/app/api";
import SongCard from "@/components/SongCard";

export default function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState();
  const [artist, setArtist] = useState();
  const { setAlbumId, setPlaylistIndex } = useContext(PlaylistContext);

  const handleAlbumSelect = (id, index) => {
    // Appeler setAlbumId avec le nouvel ID d'album
    setAlbumId(id);
    setPlaylistIndex(index);
  };

  useEffect(() => {
    const fetchAlbum = (id) => {
      getAlbum(id)
        .then((data) => {
          setAlbum(data);
          getArtist(data.artistId)
            .then((data) => {
              setArtist(data.name);
            })
            .catch((error) => {
              console.error("Error fetching artist:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching album:", error);
        });
    };

    fetchAlbum(id);
  }, [id]);

  return (
    <div className="overflow-y-auto w-full h-full rounded-lg bg-gradient-to-b from-pink-600 to-60% to-neutral-900">
      {album && (
        <div className="flex items-end gap-x-5 m-5">
          <Image
            src={album.cover}
            alt="Album cover"
            width={"150"}
            height={"150"}
            className="shadow-lg shadow-black/50 rounded-md"
          />

          <div>
            <p className="text-sm font-medium mb-1">Album</p>
            <h1 className="font-bold text-3xl mb-3">{album.title}</h1>
            <p className="text-sm font-semibold">
              {artist} · {album.type} · {album.audios.length} tracks
            </p>
          </div>
        </div>
      )}
      <div className="bg-gradient-to-b from-neutral-900/30 to-neutral-900 w-full h-full p-5 text-neutral-400 text-sm font-medium">
        <p className="h-[70px]">Play</p>

        <div className="w-full">
          <div className="border-b-[1px] border-white/10 mt-2">
            <div className="flex items-center">
              <p className="p-4">
                <FaHashtag size={15} />
              </p>
              <p className="p-4">Title</p>
              <p className="p-4 ml-auto">Lectures</p>
            </div>
          </div>

          <div className="mt-4 mb-8">
            {album &&
              album.audios.map((item, index) => (
                <SongCard
                  key={item.id}
                  song={item}
                  artist={artist}
                  index={index + 1}
                  onDoubleClick={() => handleAlbumSelect(item.albumId, index)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
