import React from "react";
import Image from "next/image";

const HorizontalCard = ({
  GreyText,
  label,
  width = "200px",
  bgColor = "transparent",
  borderRadius = "lg",
  coverSrc,
}) => {
  return (
    <div
      className={`flex transition duration-200 ease-in-out bg-${bgColor} bg-opacity-10 hover:bg-opacity-20 w-[${width}] justify-start items-center gap-x-4 bg-${bgColor} bg-opacity-10 rounded-lg`}
    >
      <Image
        src={coverSrc}
        alt="Album cover"
        width={55}
        height={55}
        className={`rounded-${borderRadius}`}
      />
      <div>
        <p className="text-left text-sm font-semibold truncate">{label}</p>
        <p className="text-left text-neutral-400 text-xs truncate">
          {GreyText}
        </p>
      </div>
    </div>
  );
};

export default HorizontalCard;
