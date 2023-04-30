import { messages } from "@/utils/mocks";
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
        <div className="flex flex-col flex-1 items-center gap-4 w-full h-full border-r border-gray-400/20">
          <UserTab />
          <SearchBar />
          <div className="flex flex-col h-full w-full overflow-auto">
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
          </div>
        </div>
        <div className="flex flex-col flex-grow h-full w-full h-full">
          <ChatHeader />
          <div className="h-full w-full relative overflow-auto">
            <div className="h-full w-full bg-wpp_chat bg-repeat opacity-5 absolute object-cover -z-9"></div>{" "}
            <div className="flex flex-col relative z-10 h-full w-full overflow-auto">
              <DateInfo />
              {messages.map((m, idx) => {
                let prevMessage = messages[idx - 1];
                let shouldHaveNoCorner = prevMessage
                  ? prevMessage.from !== m.from
                  : true;
                return (
                  <Message
                    key={m.id}
                    incoming={m.incoming}
                    message={m.message}
                    from={m.from}
                    timeStamp={m.timeStamp}
                    prevIsFromOther={shouldHaveNoCorner}
                    isLast={idx == messages.length}
                  />
                );
              })}
            </div>
          </div>
          <div className="min-h-[62px] bg-wpp-green.300">
            <input
              type="text"
              placeholder="Escribe un mensaje aquí"
              className="bg-wpp-darkblue py-2 px-3 rounded-lg text-gray-600 text-sm w-full flex-grow"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function DateInfo() {
  return (
    <div className="flex w-full text-white justify-center pt-3 mb-6">
      <div className="flex w-30% h-30px text-sm rounded-md bg-gray-800 p-2">
        Hoy
      </div>
    </div>
  );
}

function Message({
  incoming,
  message,
  from,
  timeStamp,
  prevIsFromOther,
  isLast,
}: Message) {
  let color = incoming ? "bg-incoming-bg" : "bg-outgoing-bg";
  let messageCornerProps = incoming
    ? "-rotate-45 transform origin-top-left"
    : "rotate-45 transform origin-top-right";
  let messageCornerPosition = incoming ? "top-0 -left-3" : "top-0 -right-3";
  let borderPos = incoming ? "tl" : "tr";
  let roundedBorderCorner = prevIsFromOther
    ? `rounded-${borderPos}-none`
    : null;

  return (
    <div
      className={`flex flex-col ${
        incoming ? "items-start" : "items-end"
      } w-full px-16 ${!prevIsFromOther || isLast ? "mb-4" : "mb-0.5"}`}
    >
      <div
        className={`max-w-[65%] ${color} text-white px-[9px] pt-[6px] pb-[8px] rounded-lg ${roundedBorderCorner} relative shadow-black shadow-sm text-sm font-light`}
      >
        {incoming && prevIsFromOther && (
          <h5 className="pl-1 pb-1 text-sm font-thin text-white">{from}</h5>
        )}
        <span>{message}</span>
        {prevIsFromOther && (
          <div
            className={`w-3 overflow-hidden inline-block absolute ${messageCornerPosition} -z-10`}
          >
            <div className={` h-5 ${color} ${messageCornerProps}`}></div>
          </div>
        )}
        <div className="text-xs font-thin absolute bottom-0.5 right-3 rounded-tl">
          <span>{timeStamp}</span>
        </div>
      </div>
    </div>
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
    <div className="flex w-full items-center pl-3">
      <div className="flex flex-grow relative w-full">
        <input
          className="w-full bg-wpp-green.300 text-sm pl-16 pr-8 h-[35px] rounded-md "
          placeholder="Busca un chat o inicia uno nuevo."
        ></input>
        <MdOutlineSearch className="text-gray-400 text-xl absolute top-1/4 left-4" />
      </div>
      <MdFilterList className="text-gray-400 text-xl top-1/4 left-4 mx-2" />
    </div>
  );
}

function ChatCard() {
  return (
    <div className="flex text-white items-center justify-start max-w-md min-h-[72px] relative border-t border-gray-400/20">
      <div className="px-[15px]">
        <Image
          src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          className="inline object-cover w-[49px] h-[49px] rounded-full max-w-none mt-2"
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
      <span className="text-xs text-gray-400 absolute top-4 right-5">
        14:32
      </span>
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
        <div className="flex flex-shrink gap-4">
          <MdOutlineSearch className="text-gray-400 text-2xl  top-1/4 left-4" />
          <HiOutlineDotsVertical className="text-gray-400 text-2xl" />
        </div>
      </div>
    </div>
  );
}
