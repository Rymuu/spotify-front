"use client";

import React from "react";
import { LuRepeat } from "react-icons/lu";
import { LuRepeat1 } from "react-icons/lu";

const RepeatButton = ({
  repeatPlaylist,
  repeatAudio,
  setRepeatPlaylist,
  setRepeatAudio,
}) => {
  return (
    <>
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
          <LuRepeat size={20} className="text-neutral-400 hover:text-white" />
        </button>
      )}
    </>
  );
};

export default RepeatButton;
