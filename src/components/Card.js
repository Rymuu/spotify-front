import React from "react";

const Card = ({ label, greyText }) => {
  return (
    <div className="transition duration-200 ease-in-out bg-[#1e1e1e] hover:bg-neutral-800 p-4 rounded-xl w-fit cursor-pointer">
      <div className="w-[160px] h-[160px] bg-white rounded-xl mb-4"></div>
      <p className="font-semibold mb-1">{label}</p>
      <p className="text-neutral-400 font-medium text-sm">{greyText}</p>
    </div>
  );
};

export default Card;
