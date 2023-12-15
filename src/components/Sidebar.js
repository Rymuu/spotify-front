"use client";

import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { GoHomeFill } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { BiSolidPlaylist } from "react-icons/bi";

import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: GoHomeFill,
        label: "Home",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: IoSearchOutline,
        label: "Search",
        href: "/search",
        active: pathname === "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="hidden md:flex flex-col gap-y-2 bg-black h-[86vh] w-[470px]">
      <div className="flex flex-col gap-y-3 px-5 py-4 bg-neutral-900 rounded-lg h-fit w-full">
        {routes.map((item) => (
          <SidebarItem
            key={item.label}
            Icon={item.icon}
            label={item.label}
            href={item.href}
            active={item.active}
            {...item}
          />
        ))}
      </div>
      <div className="flex flex-col gap-y-3 px-5 py-4 bg-neutral-900 rounded-lg w-full overflow-y-auto h-full">
        <div
          className="
            flex 
            flex-row 
            h-auto 
            items-center 
            w-full 
            gap-x-4 
            text-md 
            font-medium
            cursor-pointer
            hover:text-white
            transition
            text-neutral-400
            py-1
            "
        >
          <BiSolidPlaylist size={26} />
          <p className="truncate w-100">Library</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
