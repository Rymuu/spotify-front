import React from "react";
import Image from "next/image";

const Card = ({ label, greyText, coverSrc, onClick }) => {
  return (
    <div
      className="transition w-[200px] h-[250px] duration-200 ease-in-out bg-[#1e1e1e] hover:bg-neutral-800 p-4 rounded-xl cursor-pointer mb-4 overflow-hidden truncate"
      onClick={onClick}
    >
      <div className="w-[180px] h-[180px]">
        <Image src={coverSrc} alt="Click here" width={160} height={160} />
      </div>
      <p className="font-semibold mb-1 truncate">{label}</p>
      <p className="text-neutral-400 font-medium text-sm truncate">
        {greyText}
      </p>
    </div>
  );
};

export default Card;
