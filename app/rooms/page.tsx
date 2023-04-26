import Image from "next/image";
import { MdGroups, MdChat, MdOutlineCircle } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function Rooms() {
  return (
    <>
      <section className="flex container mx-auto h-full items-center justify-center gap-5 shadow-lg">
        <div className="flex flex-col flex-1 items-center gap-4 w-full h-full">
          <div className="flex items-center justify-between w-full bg-wpp-green.300 px-3 py-2">
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
          <div className="flex flex-col h-full w-full">
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
          </div>
        </div>
        <div className="flex flex-grow h-full w-full items-center">
          <h1 className="text-2xl text-white">Aca estarían los chats</h1>
        </div>
      </section>
    </>
  );
}

function ChatCard() {
  return (
    <div className="flex text-white items-center justify-start max-w-md h-[72px] border-t border-gray-800 relative">
      <div className="px-[15px]">
        <Image
          src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          className="inline object-cover w-[49px] h-[49px] rounded-full max-w-none"
          width="100"
          height="100"
          alt="Profile image"
        />
      </div>
      <div className="flex flex-col flex-grow font-light justify-center pr-5 truncate">
        <span className="text-lg">Nombre</span>
        <span className="text-sm text-gray-400 truncate">
          Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Nostrum consequatur
          accusamus natus maxime culpa expedita sunt officiis eum sit, modi odio
          magnam consectetur et, recusandae amet repellat temporibus, voluptatem
          qui!
        </span>
      </div>
      <span className="text-xs text-gray-400 absolute top-4 right-1">
        14:32
      </span>
    </div>
  );
}
