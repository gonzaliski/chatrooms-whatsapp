import { ChatCardList } from "@/components/ChatCardList";
import { ConversationInput } from "@/components/ConversationInput";
import { ConversationPanel } from "@/components/ConversationPanel";
import { messages } from "@/utils/mocks";
import Image from "next/image";
import { BsEmojiSmile } from "react-icons/bs";
import { HiMicrophone, HiOutlineDotsVertical } from "react-icons/hi";
import {
  MdChat,
  MdFilterList,
  MdGroups,
  MdOutlineAttachFile,
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
        <div className="flex flex-col flex-grow h-full w-full h-full">
          <ChatHeader />
          <ConversationPanel />
          <div className="inline-table min-h-[62px] bg-wpp-green.300 px-4 py-1">
            <div className="flex items-center w-full">
              <div className="flex min-h-[52px] gap-3 py-1 px-2">
                <div className="flex  items-center">
                  <BsEmojiSmile className="text-gray-400 text-2xl" />
                </div>
                <div className="flex items-center">
                  <MdOutlineAttachFile className="text-gray-400 text-2xl rotate-45" />
                </div>
              </div>
              <ConversationInput />
              <div className="flex min-h-[52px] items-center py-1">
                <HiMicrophone className="text-gray-400 text-2xl" />
              </div>
            </div>
          </div>
        </div>
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

function ChatHeader() {
  return (
    <div className="flex items-center justify-between w-full bg-wpp-green.300 px-4 py-[10px] ml-[2px]">
      <div className="flex gap-2 items-center w-full">
        <Image
          src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          className="inline object-cover w-[40px] h-[40px] rounded-full max-w-none"
          width="100"
          height="100"
          alt="Profile image"
        />
        <div className="flex flex-col flex-grow">
          <span className="text-md text-white font-sans">Nombre Chat</span>
          <span className="text-xs truncate flex-grow text-white font-sans">
            Pepito, fulano, mengano, fulana, mengana, roberto
          </span>
        </div>
        <div className="flex flex-shrink gap-7 pr-3">
          <MdOutlineSearch className="text-gray-400 text-2xl  top-1/4 left-4" />
          <HiOutlineDotsVertical className="text-gray-400 text-2xl" />
        </div>
      </div>
    </div>
  );
}
