"use client";
import { useState, useRef, useEffect, useContext } from "react";
import Loader from "@/components/Loader";
import { search } from "@/app/api/index";
import SearchBar from "@/components/SearchBar";
import Card from "@/components/Cards/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Section from "@/components/Section";
import HorizontalCard from "@/components/Cards/HorizontalCard";
import { useRouter } from "next/navigation";
import { PlaylistContext } from "@/app/context/PlaylistContext";

export default function Search() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setCurrentPlaylist, setPlaylistIndex } = useContext(PlaylistContext);
  const callRef = useRef(null);
  const router = useRouter();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  useEffect(() => {
    if (input.length > 0) {
      setLoading(true);
      clearTimeout(callRef.current);

      const fetchData = async () => {
        try {
          const resultData = await search(input);
          const [artists, albums, audios] = await Promise.all([
            Promise.resolve(resultData.artists.slice(0, 5)),
            Promise.resolve(resultData.albums.slice(0, 5)),
            Promise.resolve(resultData.audios.slice(0, 5)),
          ]);

          setData(resultData);
          setArtists(artists);
          setAlbums(albums);
          setAudios(audios);
        } catch (error) {
          console.error("Error fetching playlist:", error);
        } finally {
          setLoading(false);
        }
      };

      callRef.current = setTimeout(fetchData, 300);
    }
  }, [input]);

  const handleBodyClick = (e) => {
    if (!e.target.closest(".search-bar")) {
      setInput("");
      setData([]);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);
  // if (loading) return <Loader />;

  return (
    <div className="w-full mb-6">
      <div className="fixed z-10 px-5 pt-5 pb-2 w-full bg-neutral-900">
        <SearchBar value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {loading ? <Loader /> : null}
      <div className="mt-24 px-5 w-full">
        {audios.length === 0 && input.length > 0 ? (
          <div className="text-third text-center">No audios found</div>
        ) : (
          <Section label={"Songs"}>
            {audios.length > 0 &&
              audios.map((item, index) => (
                <HorizontalCard
                  key={item.id}
                  label={item.title}
                  GreyText="Song"
                  coverSrc="https://d3ozihag9834pq.cloudfront.net/image/music.png"
                  hover={true}
                  width="full"
                  onClick={() => {
                    setPlaylistIndex(index);
                    setCurrentPlaylist([item.id]);
                  }}
                />
              ))}
          </Section>
        )}
        {albums.length === 0 && input.length > 0 ? (
          <div className="text-third text-center">No albums found</div>
        ) : (
          <Section label={"Albums"}>
            <Carousel responsive={responsive}>
              {albums.length > 0 &&
                albums.map((item) => (
                  <Card
                    key={item.id}
                    label={item.title}
                    greyText={"Album"}
                    coverSrc={item.cover}
                    onClick={() => router.push(`/album/${item.id}`)}
                  />
                ))}
            </Carousel>
          </Section>
        )}
        {artists.length === 0 && input.length > 0 ? (
          <div className="text-third text-center">No artists found</div>
        ) : (
          <Section label={"Artists"}>
            <Carousel responsive={responsive}>
              {artists.length > 0 &&
                artists.map((item) => (
                  <Card
                    key={item.id}
                    label={item.name}
                    greyText={"Artist"}
                    rounded="full"
                    coverSrc="https://d3ozihag9834pq.cloudfront.net/image/music.png"
                    onClick={() => router.push(`/artist/${item.id}`)}
                  />
                ))}
            </Carousel>
          </Section>
        )}
      </div>
    </div>
  );
}
