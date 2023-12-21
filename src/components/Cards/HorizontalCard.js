import React from "react";
import Image from "next/image";

const HorizontalCard = ({
  GreyText,
  label,
  width = "300px",
  bgColor = "transparent",
  borderRadius = "lg",
  coverSrc,
  onClick,
  hover = false,
}) => {
  return (
    <div
      className={`flex p-2 transition duration-200 ease-in-out bg-${bgColor} bg-opacity-10 hover:bg-opacity-20 w-[${width}] justify-start items-center gap-x-4 bg-${bgColor} bg-opacity-10 rounded-lg overflow-hidden ${
        hover ? "hover:bg-white/20" : ""
      }`}
      onClick={onClick}
    >
      <div className="relative w-[50px] h-[50px]">
        <Image
          src={coverSrc}
          alt="Album cover"
          layout="fill"
          objectFit="cover"
          className={`rounded-${borderRadius}`}
        />
      </div>
      <div className="truncate">
        <p className="text-left text-sm font-semibold truncate">{label}</p>
        <p className="text-left text-neutral-400 text-xs truncate">
          {GreyText}
        </p>
      </div>
    </div>
  );
};

export default HorizontalCard;
