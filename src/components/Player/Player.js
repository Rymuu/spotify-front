"use client";

import React from "react";
import { useEffect, useRef, useState, useCallback, useContext } from "react";
import { PlaylistContext } from "@/app/context/PlaylistContext";
import { getAudio } from "@/app/api";

import CustomSlider from "../CustomSlider";
import PlayButton from "./PlayerButtons/PlayButton";
import SkipBackButton from "./PlayerButtons/SkipBackButton";
import SkipForwardButton from "./PlayerButtons/SkipForwardButton";
import RandomizeButton from "./PlayerButtons/RandomizeButton";
import RepeatButton from "./PlayerButtons/RepeatButton";

import { AiOutlineExpandAlt } from "react-icons/ai";

import VolumeSlider from "./VolumeSlider";
import HorizontalCard from "../HorizontalCard";

const Player = () => {
  const audioRef = useRef(null);
  const [indexPlayList, setIndexPlayList] = useState(0);
  const [playList, setPlayList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatPlaylist, setRepeatPlaylist] = useState(false);
  const [repeatAudio, setRepeatAudio] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isThereAPlaylist, setIsThereAPlaylist] = useState(false);
  const { currentPlaylist, playlistIndex } = useContext(PlaylistContext);

  const audioIds = ["12", "68", "124", "1", "90", "103"];
  const [audioData, setAudioData] = useState([]);

  useEffect(() => {
    const fetchDataForAllAudioIds = async () => {
      try {
        // Use Promise.all to wait for all requests to complete
        const audioDataArray = await Promise.all(
          currentPlaylist.map(async (audioId) => {
            try {
              const data = await getAudio(audioId);
              return data;
            } catch (error) {
              console.error(`Error fetching audio with ID ${audioId}:`, error);
              return null;
            }
          })
        );

        // Filter out null values (failed requests) and set the audio data
        setAudioData(audioDataArray.filter((data) => data !== null));
      } catch (error) {
        console.error("Error fetching audio data for all IDs:", error);
      }
    };

    // Call the function to fetch data when the component mounts or when currentPlaylist changes
    fetchDataForAllAudioIds();
  }, [currentPlaylist]);

  // Utilisez currentPlaylist dans votre logique
  useEffect(() => {
    console.log("current : ", currentPlaylist);
    if (currentPlaylist.length > 0) {
      setPlayList(audioData);
      setIsThereAPlaylist(true);
      setIndexPlayList(playlistIndex);
      console.log("new playlist", playList);
      setIsPlaying(true);
    }
    // Autres logiques avec currentPlaylistindexPlayList
  }, [audioData, currentPlaylist, playlistIndex]);

  useEffect(() => {
    setInterval(() => {
      if (!audioRef.current) {
        return;
      }
      setDuration(Math.round(audioRef.current.duration));
      setCurrentTime(Math.round(audioRef.current.currentTime));
    }, 1000);
  }, [playList]);

  const goNext = useCallback(
    (array, indexArray) => {
      setIsPlaying(true);
      if (indexArray < array.length - 1) {
        setIndexPlayList(indexArray + 1);
      } else {
        setIndexPlayList(0);
      }
    },
    [setIndexPlayList, setIsPlaying]
  );

  const handleEnded = useCallback(
    (array, indexArray, repeatAudio, repeatPlaylist) => {
      if (repeatPlaylist) {
        goNext(array, indexArray);
      } else if (repeatAudio) {
        audioRef.current.play();
      } else if (indexArray < array.length - 1) {
        setIndexPlayList(indexArray + 1);
      }
    },
    [goNext]
  );

  return (
    <div className="fixed flex justify-between bottom-0 text-center items-center w-screen p-5 bg-black">
      {isThereAPlaylist && (
        <audio
          onCanPlay={() => {
            if (isPlaying && !isDragging) {
              audioRef.current.play();
            }
          }}
          onEnded={() =>
            handleEnded(playList, indexPlayList, repeatAudio, repeatPlaylist)
          }
          ref={audioRef}
          src={playList[indexPlayList] && playList[indexPlayList].file}
        />
      )}
      {playList.length === 0 && !playList[indexPlayList]?.album.cover ? (
        <p className="w-[30%]"></p>
      ) : (
        <HorizontalCard
          label={playList[indexPlayList]?.title}
          GreyText={playList[indexPlayList]?.artist.name}
          width={"30%"}
          coverSrc={playList[indexPlayList]?.album.cover}
        />
      )}

      <div className="w-[40%]">
        <div className="flex gap-x-4 justify-center">
          {/* Randomize Button */}
          <RandomizeButton
            array={playList}
            setPlayList={setPlayList}
            setIndexPlayList={setIndexPlayList}
          />
          {/* Skip Back Button */}
          <SkipBackButton
            array={playList}
            indexArray={indexPlayList}
            setIsPlaying={setIsPlaying}
            setIndexPlayList={setIndexPlayList}
          />
          {/* Play Button */}
          <PlayButton
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isThereAPlaylist={isThereAPlaylist}
          />
          {/* Skip Forward Button */}
          <SkipForwardButton
            array={playList}
            indexArray={indexPlayList}
            setIsPlaying={setIsPlaying}
            setIndexPlayList={setIndexPlayList}
            goNext={goNext}
          />
          {/* RepeatButton */}
          <RepeatButton
            repeatPlaylist={repeatPlaylist}
            setRepeatPlaylist={setRepeatPlaylist}
            repeatAudio={repeatAudio}
            setRepeatAudio={setRepeatAudio}
          />
        </div>

        <div className="flex justify-center  items-center pt-2 gap-x-4 text-neutral-400 text-xs">
          <p className="text-left w-[40px]">
            {`${Math.floor(currentTime / 60)}:${(
              currentTime -
              Math.floor(currentTime / 60) * 60
            )
              .toString()
              .padStart(2, "0")}`}
          </p>
          <CustomSlider
            disabled={playList.length > 0 ? false : true}
            step={0.1}
            value={playList.length > 0 && currentTime ? currentTime : 0}
            max={playList.length > 0 && duration ? duration : 0}
            min={0}
            onChange={(e) => {
              setIsDragging(true);
              audioRef.current.pause();
              const progressValue = e.target.value;
              if (audioRef.current) {
                audioRef.current.currentTime = progressValue;
                setCurrentTime(Math.round(audioRef.current.currentTime));
              }
            }}
            onChangeCommitted={() => {
              setIsDragging(false);
              if (isPlaying) {
                audioRef.current.play();
              }
            }}
          />
          <p className="text-right w-[40px]">
            {duration
              ? `${Math.floor(duration / 60)}:${(
                  duration -
                  Math.floor(duration / 60) * 60
                )
                  .toString()
                  .padStart(2, "0")}`
              : "0:00"}
          </p>
        </div>
      </div>
      <div className="flex w-[30%] justify-end items-center gap-x-4">
        {/* Slider Audio */}
        <VolumeSlider audioRef={audioRef} />
        <AiOutlineExpandAlt
          size={20}
          className="text-neutral-400 hover:text-white"
        />
      </div>
    </div>
  );
};

export default React.memo(Player);
