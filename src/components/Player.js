"use client";

import React from "react";
import shuffle from "just-shuffle";
import { useEffect, useRef, useState, useCallback } from "react";

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
  const [repeatPlaylist, setRepeatPlaylist] = useState(false);
  const [repeatAudio, setRepeatAudio] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const progressBarWidth = `${(currentTime * 100) / duration}%`;

  useEffect(() => {
    // audioRef.current.pause();
    // console.log('isPlaying', audioRef.current.playing);
    console.log(audioRef);
    setInterval(() => {
      if (!audioRef.current) {
        return;
      }
      setDuration(Math.round(audioRef.current.duration));
      setCurrentTime(Math.round(audioRef.current.currentTime));
    }, 1000);
  }, []);

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
      console.log("repeatAudio : ", repeatAudio);
      console.log("repeatPlaylist : ", repeatPlaylist);
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
    <div className="fixed bottom-0 text-center items-center w-screen p-5 bg-black">
      <audio
        onChange={(e) => {
          console.log("e", e);
        }}
        onCanPlay={() => {
          if (isPlaying) {
            audioRef.current.play();
          }
        }}
        onEnded={() =>
          handleEnded(playList, indexPlayList, repeatAudio, repeatPlaylist)
        }
        ref={audioRef}
        src={playList[indexPlayList]}
      />
      <div className="flex gap-x-4 justify-center">
        <button onClick={() => randomize(playList)}>
          <LiaRandomSolid size={20} className="text-neutral-400" />
        </button>

        {/* < Button */}
        <button onClick={() => goBack(playList, indexPlayList)}>
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
        <button onClick={() => goNext(playList, indexPlayList)}>
          <IoPlaySkipForwardSharp size={20} className="text-neutral-400" />
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
              console.log(repeatPlaylist);
            }}
          >
            <LuRepeat size={20} className="text-neutral-400" />
          </button>
        )}
      </div>

      <div className="flex justify-center items-center gap-x-2 pt-2 text-neutral-400 text-xs">
        {`${Math.floor(currentTime / 60)}:${(
          currentTime -
          Math.floor(currentTime / 60) * 60
        )
          .toString()
          .padStart(2, "0")}`}

        <div
          onClick={(e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const rectWidth = rect.width;
            console.log("x : ", rect);
            audioRef.current.currentTime = (x * duration) / rectWidth;
            // set audio to x position
          }}
          className="h-1 min-w-[300px] w-[35%] bg-neutral-500 rounded-xl"
        >
          <div
            style={{ width: progressBarWidth }}
            className="h-1 bg-white rounded-xl "
          ></div>
        </div>
        {duration &&
          `${Math.floor(duration / 60)}:${(
            duration -
            Math.floor(duration / 60) * 60
          )
            .toString()
            .padStart(2, "0")}`}
      </div>
    </div>
  );
};

export default React.memo(Player);
