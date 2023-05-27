"use client";
import { MdFilterList, MdOutlineSearch } from "react-icons/md";
import { ChatCardList } from "./ChatCardList";
import { UserTab } from "./UserTab";

export const UserPanel = () => {
  return (
    <div className="flex flex-col flex-1 items-center w-full h-full border-r border-gray-400/20 min-w-[30%]">
      <UserTab />
      <SearchBar />
      <ChatCardList />
    </div>
  );
};

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
