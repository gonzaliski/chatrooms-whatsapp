import { ChatCardList } from "@/components/ChatCardList";
import { RoomPanel } from "@/components/RoomPanel";
import Image from "next/image";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  MdChat,
  MdFilterList,
  MdGroups,
  MdOutlineCircle,
  MdOutlineSearch,
} from "react-icons/md";

export default function Rooms() {
  return (
    <>
      <section className="flex container mx-auto h-screen lg:h-[95%] self-center w-full items-center justify-center shadow-lg">
        <div className="flex flex-col flex-1 items-center w-full h-full border-r border-gray-400/20 min-w-[25%]">
          <UserTab />
          <SearchBar />
          <ChatCardList />
        </div>
        <RoomPanel />
      </section>
    </>
  );
}

function UserTab() {
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
        <MdOutlineCircle className="text-gray-400 text-2xl" />
        <MdChat className="text-gray-400 text-2xl" />
        <HiOutlineDotsVertical className="text-gray-400 text-2xl" />
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex w-full py-2 items-center pl-3">
      <div className="flex flex-grow relative w-full">
        <input
          className="w-full bg-wpp-green.300 text-sm pl-16 pr-8 h-[35px] rounded-md text-white"
          placeholder="Busca un chat o inicia uno nuevo."
        ></input>
        <MdOutlineSearch className="text-gray-400 text-xl absolute top-1/4 left-4" />
      </div>
      <MdFilterList className="text-gray-400 text-xl top-1/4 left-4 mx-2" />
    </div>
  );
}
