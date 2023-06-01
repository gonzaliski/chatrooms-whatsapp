"use client";
import { clearFilters, setFilters } from "@/redux/slices/chatListFilterSlice";
import { useState } from "react";
import {
  MdFilterList,
  MdOutlineKeyboardBackspace,
  MdOutlineSearch,
} from "react-icons/md";
import { useDispatch } from "react-redux";
export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const handleSearch = (value: string) => {
    setQuery(value);
    dispatch(setFilters(value));
    if (value == "") {
      dispatch(clearFilters());
    }
  };
  return (
    <div className="flex w-full py-2 items-center pl-3">
      <div className="flex flex-grow relative w-full">
        <input
          className="w-full bg-wpp-green.300 text-sm pl-16 pr-8 h-[35px] rounded-md text-white focus:outline-none"
          placeholder="Busca un chat o inicia uno nuevo."
          onChange={(e) => handleSearch(e.target.value)}
        ></input>
        {query ? (
          <button
            onClick={() => clearFilters()}
            type="button"
            className="text-white absolute top-[20%] left-4"
          >
            <MdOutlineKeyboardBackspace className="text-2xl  text-wpp-primary" />
          </button>
        ) : (
          <MdOutlineSearch className="text-gray-400 text-xl absolute top-1/4 left-4" />
        )}
      </div>
      <MdFilterList className="text-gray-400 text-xl top-1/4 left-4 mx-2" />
    </div>
  );
};
