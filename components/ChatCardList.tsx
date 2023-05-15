"use client";
import { db } from "@/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatCard } from "./ChatCard";
import { MdAdd, MdClear } from "react-icons/md";
import { selectChat } from "@/redux/slices/chatSlice";
import { Modal } from "./Modal";

export const ChatCardList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { id } = useSelector((state: userState) => state.user);
  const [rooms, setRooms] = useState([] as any);
  const dispatch = useDispatch();
  const handleSelect = (room: RoomSelection) => {
    dispatch(selectChat(room));
  };

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(collection(db, "usersChat"), id), (doc) => {
        console.log("xd", doc.data());
        setRooms(doc.data());
      });
      return () => {
        unsub();
      };
    };

    id && getChats();
  }, [id]);
  return (
    <div className="flex flex-col h-full w-full overflow-auto pr-1">
      <Modal modalIsOpen={modalIsOpen}>
        <form className="flex flex-col items-center justify-center gap-10 w-1/4 h-1/2 py-4 px-6 bg-wpp-green.100 rounded-2xl">
          <h2 className="text-white text-center font-thin text-md sm:text-lg md:text-xl">
            Crea un nuevo chat o únete a uno!
          </h2>
          <div className="flex flex-col gap-5">
            <button className="rounded-2xl bg-wpp-primary text-white p-2">
              Crear chatroom nuevo
            </button>
            <button className="rounded-2xl bg-wpp-darkblue text-white p-2">
              Unirse a un chatroom
            </button>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="group rounded-full group-hover:rounded-2xl bg-wpp-green.300 text-white px-2 py-1"
          >
            <MdClear className="text-2xl group-hover:hidden" />
            <span className="hidden animate-pulse transition ease-in-out delay-150 group-hover:inline text-white text-center self-center text-sm">
              Cancelar
            </span>
          </button>
        </form>
      </Modal>
      <span className="group flex justify-center w-full border-none bg-transparent hover:bg-wpp-green.300 text-white text-2xl p-1">
        <MdAdd />
        <button
          onClick={() => setIsOpen(true)}
          className="hidden animate-pulse group-hover:inline text-white text-center self-center text-sm"
        >
          Iniciar conversación
        </button>
      </span>
      {Object.entries(rooms)?.map((room: any) => (
        <ChatCard
          key={room[0]}
          id={room[0]}
          name={room[1].roomName}
          lastMessage={room[1].lastMessage}
          timeStamp={room[1].timeStamp}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};
