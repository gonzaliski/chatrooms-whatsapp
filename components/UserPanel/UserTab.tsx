import Image from "next/image";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdChat, MdGroups } from "react-icons/md";
import { LogOutButton } from "./LogOutButton";

export const UserTab = () => {
  return (
    <div className="flex items-center justify-between w-full bg-wpp-green.300 px-4 py-[10px]">
      <Image
        src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        className="inline object-cover w-[40px] h-[40px] rounded-full max-w-none"
        width="100"
        height="100"
        alt="Profile image"
      />
      <div className="flex items-center justify-between gap-5">
        <MdGroups className="text-gray-400 text-3xl" />
        <LogOutButton />
        <MdChat className="text-gray-400 text-2xl" />
        <HiOutlineDotsVertical className="text-gray-400 text-2xl" />
      </div>
    </div>
  );
};
