import React from "react";

const HorizontalCard = ({ GreyText, BoldText }) => {
  return (
    <div className="hidden md:flex w-[30%] justify-start items-center gap-x-4">
      <div className="h-[55px] w-[55px] bg-white rounded-lg"></div>
      <div>
        <p className="text-left text-sm font-semibold">{BoldText}</p>
        <p className="text-left text-neutral-400 text-xs">{GreyText}</p>
      </div>
    </div>
  );
};

export default HorizontalCard;
