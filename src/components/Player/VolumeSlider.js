"use client";

import React from "react";
import { useState, useCallback } from "react";
import { HiOutlineVolumeUp } from "react-icons/hi";
import { HiOutlineVolumeOff } from "react-icons/hi";
import CustomSlider from "./CustomSlider";

const VolumeSlider = ({ audioRef }) => {
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = useCallback(
    (e) => {
      const volumeValue = e.target.value;
      if (audioRef.current) {
        audioRef.current.volume = volumeValue;
        setVolume(volumeValue);
      }
    },
    [audioRef]
  );

  const mute = useCallback(
    (e) => {
      if (audioRef.current) {
        audioRef.current.volume = 0;
        setVolume(0);
      }
    },
    [audioRef]
  );
  return (
    <div className="flex justify-end items-center gap-x-4">
      {volume === 0 ? (
        <HiOutlineVolumeOff size={20} className="text-neutral-400" />
      ) : (
        <HiOutlineVolumeUp
          onClick={() => mute()}
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
    </div>
  );
};

export default VolumeSlider;
