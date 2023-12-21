"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { getArtist } from "@/app/api";
import Card from "@/components/Cards/Card";

export default function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState();
  const router = useRouter();
  const [bgColor, setBgColor] = useState();

  useEffect(() => {
    const fetchArtist = (id) => {
      getArtist(id)
        .then((data) => {
          setArtist(data);
        })
        .catch((error) => {
          console.error("Error fetching artist:", error);
        });
    };

    fetchArtist(id);
  }, [id]);

  return (
    <div className="bg-gradient-to-b from-cyan-600 from-0% to-neutral-900 to-40% h-screen">
      {artist && (
        <div className="flex items-end gap-x-5 m-5">
          <Image
            src={artist.albums[0].cover}
            alt="Album cover"
            width={"150"}
            height={"150"}
            className="shadow-lg shadow-black/50 rounded-md"
          />

          <div>
            <p className="text-sm font-medium mb-1">Artist</p>
            <h1 className="font-bold text-3xl mb-3">{artist.name}</h1>
          </div>
        </div>
      )}
      <div className="bg-gradient-to-b from-neutral-900/40 to-neutral-900 w-full h-full p-5">
        <p className="text-lg font-bold text-white mb-1">Albums</p>
        <div className="w-full mt-4 mb-8 grid grid-flow-col auto-cols-max gap-4">
          {artist &&
            artist.albums.map((item) => (
              <Card
                key={item.id}
                label={item.title}
                greyText={"Album"}
                coverSrc={item.cover}
                rounded={"md"}
                onClick={() => router.push(`/album/${item.id}`)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
