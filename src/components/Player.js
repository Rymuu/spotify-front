"use client";

import React from "react";
import shuffle from "just-shuffle";
import { useEffect, useRef, useState, useCallback } from "react";
import CustomSlider from "./CustomSlider";

import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { IoPlaySkipBackSharp } from "react-icons/io5";
import { IoPlaySkipForwardSharp } from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { LuRepeat } from "react-icons/lu";
import { LuRepeat1 } from "react-icons/lu";
import { HiOutlineVolumeUp } from "react-icons/hi";
import { HiOutlineVolumeOff } from "react-icons/hi";
import { AiOutlineExpandAlt } from "react-icons/ai";

import sound_one from "@/../static/audio/Paranoia.mp3";
import sound_two from "@/../static/audio/Frieren.mp3";
import sound_three from "@/../static/audio/Everything-Goes-On.mp3";
import sound_four from "@/../static/audio/Annihilate.mp3";

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
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setInterval(() => {
      if (!audioRef.current) {
        return;
      }
      setDuration(Math.round(audioRef.current.duration));
      setCurrentTime(Math.round(audioRef.current.currentTime));
    }, 1000);
  }, []);

  const handleVolumeChange = (e) => {
    const volumeValue = e.target.value;
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
      setVolume(volumeValue);
    }
  };

  const randomize = useCallback((array) => {
    const randomizedArray = shuffle(array);
    setPlayList(randomizedArray);
    setIndexPlayList(0);
  }, []);

  const goBack = useCallback((array, indexArray) => {
    setIsPlaying(true);
    if (indexArray > 0) {
      setIndexPlayList(indexArray - 1);
    } else {
      setIndexPlayList(array.length - 1);
    }
  }, []);

  const goNext = useCallback((array, indexArray) => {
    setIsPlaying(true);
    if (indexArray < array.length - 1) {
      setIndexPlayList(indexArray + 1);
    } else {
      setIndexPlayList(0);
    }
  }, []);

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
    []
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
      <div className="hidden md:block w-[30%]">
        <p>Hey</p>
      </div>
      <div className="w-[40%]">
        <div className="flex gap-x-4 justify-center">
          <button onClick={() => randomize(playList)}>
            <LiaRandomSolid
              size={20}
              className="text-neutral-400 hover:text-white"
            />
          </button>

          {/* < Button */}
          <button onClick={() => goBack(playList, indexPlayList)}>
            <IoPlaySkipBackSharp
              size={20}
              className="text-neutral-400 hover:text-white"
            />
          </button>

          {/* Play Button */}
          {isPlaying ? (
            <button
              className="p-[7.5px] bg-white rounded-full"
              onClick={() => {
                audioRef.current.pause();
                setIsPlaying(false);
              }}
            >
              <IoMdPause size={20} className="text-black " />
            </button>
          ) : (
            <button
              className="p-[10px] bg-white rounded-full"
              onClick={() => {
                audioRef.current.play();
                setIsPlaying(true);
              }}
            >
              <FaPlay size={15} className="text-black " />
            </button>
          )}

          {/* > Button */}
          <button onClick={() => goNext(playList, indexPlayList)}>
            <IoPlaySkipForwardSharp
              size={20}
              className="text-neutral-400 hover:text-white"
            />
          </button>

          {/* RepeatButton */}
          {repeatPlaylist || repeatAudio ? (
            repeatPlaylist ? (
              <button
                onClick={() => {
                  setRepeatPlaylist(false);
                  setRepeatAudio(true);
                }}
              >
                <LuRepeat size={20} className="text-green-500" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setRepeatAudio(false);
                }}
              >
                <LuRepeat1 size={20} className="text-green-500" />
              </button>
            )
          ) : (
            <button
              onClick={() => {
                setRepeatPlaylist(true);
              }}
            >
              <LuRepeat
                size={20}
                className="text-neutral-400 hover:text-white"
              />
            </button>
          )}
        </div>

        <div className="flex justify-center  items-center pt-2 gap-x-3 text-neutral-400 text-xs">
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
      <div className="flex w-[30%] justify-end items-center gap-x-3">
        {volume === 0 || muted ? (
          <HiOutlineVolumeOff
            onClick={() => setMuted(false)}
            size={20}
            className="text-neutral-400"
          />
        ) : (
          <HiOutlineVolumeUp
            onClick={() => setMuted(true)}
            size={20}
            className="text-neutral-400"
          />
        )}
        <CustomSlider
          size="small"
          min={0}
          max={1}
          value={volume}
          width={100}
          onChange={handleVolumeChange}
        />
        <AiOutlineExpandAlt
          size={20}
          className="text-neutral-400 hover:text-white"
        />
      </div>
    </div>
  );
};

export default React.memo(Player);
