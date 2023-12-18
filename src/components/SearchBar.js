import React from "react";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const SearchBar = () => {
  return (
    <div className="flex gap-x-2 bg-neutral-800 w-[300px] p-4 rounded-full text-xs font-semibold outline-2 outline-pink-500 focus:outline">
      <IoSearch size={22} />
      <input
        type="search"
        placeholder="What would you like to listen to?"
        className="bg-transparent w-[250px] outline-none placeholder-neutral-500"
      />
      <RxCross2 size={22} />
    </div>
  );
};

export default SearchBar;
