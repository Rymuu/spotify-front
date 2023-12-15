"use client";

import React from "react";
import shuffle from "just-shuffle";
import { useEffect, useRef, useState } from "react";

import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { IoPlaySkipBackSharp } from "react-icons/io5";
import { IoPlaySkipForwardSharp } from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { LuRepeat } from "react-icons/lu";
import { LuRepeat1 } from "react-icons/lu";

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
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const progressBarWidth = `${(currentTime * 300) / duration}px`;

  useEffect(() => {
    // audioRef.current.pause();
    // console.log('isPlaying', audioRef.current.playing);
    setInterval(() => {
      if (!audioRef.current) {
        return;
      }
      setDuration(Math.round(audioRef.current.duration));
      setCurrentTime(Math.round(audioRef.current.currentTime));
    }, 1000);
  }, []);

  const randomize = (array) => {
    const randomizedArray = shuffle(array);
    setPlayList(randomizedArray);
    setIndexPlayList(0);
  };

  return (
    <div className="fixed flex-col bottom-0 text-center items-center w-screen p-5 bg-black">
      <audio
        onChange={(e) => {
          console.log("e", e);
        }}
        onCanPlay={() => {
          if (isPlaying) {
            audioRef.current.play();
          }
        }}
        ref={audioRef}
        src={playList[indexPlayList]}
      />
      <div className="flex gap-x-4 justify-center">
        <button onClick={() => randomize(playList)}>
          <LiaRandomSolid size={20} className="text-neutral-400" />
        </button>

        {/* < Button */}
        <button
          onClick={() => {
            if (indexPlayList > 0) {
              setIndexPlayList(indexPlayList - 1);
            } else {
              setIndexPlayList(playList.length - 1);
              console.log(playList.length);
            }
          }}
        >
          <IoPlaySkipBackSharp size={20} className="text-neutral-400" />
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
        <button
          onClick={() => {
            if (indexPlayList < playList.length - 1) {
              setIndexPlayList(indexPlayList + 1);
            } else {
              setIndexPlayList(0);
            }
          }}
        >
          <IoPlaySkipForwardSharp size={20} className="text-neutral-400" />
        </button>
      </div>
      <div className="flex justify-center items-center gap-x-2 text-neutral-400 text-xs">
        {`${Math.floor(currentTime / 60)}:${
          currentTime - Math.floor(currentTime / 60) * 60
        }`}
        <div
          onClick={(e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            audioRef.current.currentTime = (x * duration) / 300;
            // set audio to x position
          }}
          className="h-1 w-[300px] bg-neutral-500 rounded-xl mt-3"
        >
          <div
            style={{ width: progressBarWidth }}
            className="h-1 bg-white rounded-xl "
          ></div>
        </div>
        {`${Math.floor(duration / 60)}:${
          duration - Math.floor(duration / 60) * 60
        }`}
      </div>
    </div>
  );
};

export default Player;
