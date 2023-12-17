"use client";

import React from "react";
import { useEffect, useRef, useState, useCallback } from "react";

import CustomSlider from "../CustomSlider";
import PlayButton from "./PlayerButtons/PlayButton";
import SkipBackButton from "./PlayerButtons/SkipBackButton";
import SkipForwardButton from "./PlayerButtons/SkipForwardButton";
import RandomizeButton from "./PlayerButtons/RandomizeButton";
import RepeatButton from "./PlayerButtons/RepeatButton";

import { AiOutlineExpandAlt } from "react-icons/ai";

import sound_one from "@/../static/audio/Paranoia.mp3";
import sound_two from "@/../static/audio/Frieren.mp3";
import sound_three from "@/../static/audio/Everything-Goes-On.mp3";
import sound_four from "@/../static/audio/Annihilate.mp3";
import VolumeSlider from "./VolumeSlider";
import HorizontalCard from "../HorizontalCard";

const playListData = [sound_one, sound_two, sound_three, sound_four];

const Player = () => {
  const audioRef = useRef(null);
  const [indexPlayList, setIndexPlayList] = useState(0);
  const [playList, setPlayList] = useState(playListData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatPlaylist, setRepeatPlaylist] = useState(false);
  const [repeatAudio, setRepeatAudio] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setInterval(() => {
      if (!audioRef.current) {
        return;
      }
      setDuration(Math.round(audioRef.current.duration));
      setCurrentTime(Math.round(audioRef.current.currentTime));
    }, 1000);
  }, []);

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
      <audio
        onChange={(e) => {
          console.log("e", e);
        }}
        onCanPlay={() => {
          if (isPlaying && !isDragging) {
            audioRef.current.play();
          }
        }}
        onEnded={() =>
          handleEnded(playList, indexPlayList, repeatAudio, repeatPlaylist)
        }
        ref={audioRef}
        src={playList[indexPlayList]}
      />
      <HorizontalCard
        BoldText={"Song Title"}
        GreyText={"Artist1, Artist2, Artist3..."}
      />
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
            disabled={audioRef.current ? false : true}
            step={0.1}
            value={currentTime}
            max={duration}
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
            {duration &&
              `${Math.floor(duration / 60)}:${(
                duration -
                Math.floor(duration / 60) * 60
              )
                .toString()
                .padStart(2, "0")}`}
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
