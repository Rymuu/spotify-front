import React from "react";
import Image from "next/image";

const HorizontalCardLarge = ({
  GreyText,
  label,
  width = "600px",
  bgColor = "transparent",
  borderRadius = "lg",
  coverSrc,
  onClick,
}) => {
  return (
    <div
      className={`flex transition duration-200 ease-in-out bg-${bgColor} bg-opacity-10 hover:bg-opacity-20 w-[${width}] justify-start items-center gap-x-4 bg-${bgColor} bg-opacity-10 rounded-lg overflow-hidden`}
      onClick={onClick}
    >
      <Image
        src={coverSrc}
        alt="Album cover"
        width={200}
        height={200}
        className={`rounded-${borderRadius}`}
      />
      <div className="truncate">
        <p className="text-left text-3xl font-semibold truncate">{label}</p>
        <p className="text-left text-neutral-400 text-3xl truncate">
          {GreyText}
        </p>
      </div>
    </div>
  );
};

export default HorizontalCardLarge;
