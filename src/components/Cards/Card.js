import React from "react";
import Image from "next/image";

const Card = ({
  label,
  greyText,
  coverSrc,
  onClick,
  rounded = "md",
  index = null,
}) => {
  return (
    <div
      className={`transition w-[200px] h-[260px]${
        index > 3 ? "hidden" : ""
      }  duration-200 ease-in-out bg-[#1e1e1e] hover:bg-neutral-800 p-4 rounded-xl cursor-pointer overflow-hidden truncate`}
      onClick={onClick}
    >
      <div className="w-[170px] h-[170px] relative">
        <Image
          src={coverSrc}
          alt="Click here"
          layout="fill"
          objectFit="cover"
          className={`rounded-${rounded}`}
        />
      </div>

      <p className="font-semibold mb-1 truncate mt-2.5">{label}</p>
      <p className="text-neutral-400 font-medium text-sm truncate">
        {greyText}
      </p>
    </div>
  );
};

export default Card;
