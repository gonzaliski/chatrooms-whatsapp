"use client";
import { MdClear, MdAdd, MdOutlineKeyboardBackspace } from "react-icons/md";
import { Modal } from "../Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { roomService } from "@/services/roomService";
import { ErrorCard } from "../ErrorCard";

export const NewChat = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [joinEnabled, setJoinEnabled] = useState(false);
  const [createEnabled, setCreateEnabled] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await roomService.createRoom(value);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };
  const handleJoinRoom = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await roomService.joinRoom(value);
      onClose();
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError("");
  };
  const handleJoinChat = () => {
    setJoinEnabled(true);
    setCreateEnabled(false);
  };
  const handleCreateChat = () => {
    setJoinEnabled(false);
    setCreateEnabled(true);
  };
  const disableAll = () => {
    setJoinEnabled(false);
    setCreateEnabled(false);
    setValue("");
    setError("");
  };
  const onClose = () => {
    setIsOpen(false);
    disableAll();
  };
  return (
    <>
      <Modal modalIsOpen={modalIsOpen}>
        <section className="flex flex-col items-center justify-center gap-10 min-w-1/4 w-1/4 h-1/2 py-4 px-6 bg-wpp-green.100 rounded-2xl">
          <h2 className="text-white text-center font-thin text-sm sm:text-lg md:text-2xl">
            {!joinEnabled && !createEnabled
              ? "Creá un nuevo chat o unite a uno!"
              : createEnabled
              ? "Crear nuevo chat"
              : "Unirse a un chat"}
          </h2>
          <div className="flex flex-col gap-5">
            {!joinEnabled && !createEnabled && (
              <button
                className="rounded-2xl bg-wpp-primary text-white p-2"
                type="button"
                onClick={handleCreateChat}
              >
                Crear chatroom nuevo
              </button>
            )}
            {createEnabled && (
              <form onSubmit={handleCreateRoom} className="container w-full">
                <label htmlFor="value" className="text-gray-400 text-sm">
                  Nombre de grupo
                </label>
                <div className="flex w-full">
                  <input
                    type="text"
                    name="value"
                    onChange={handleChange}
                    value={value}
                    placeholder="Nuevo grupo"
                    className="p-1 focus:outline-none rounded-md rounded-tr-none rounded-br-none text-white bg-wpp-darkblue"
                  ></input>
                  <button
                    className="rounded-md rounded-tl-none rounded-bl-none bg-wpp-primary text-white p-1"
                    type="button"
                    onClick={handleCreateRoom}
                  >
                    Crear
                  </button>
                </div>
                {error && <ErrorCard msg={error} />}
              </form>
            )}
            {!joinEnabled && !createEnabled && (
              <button
                className="rounded-2xl bg-wpp-darkblue text-white p-2"
                onClick={handleJoinChat}
              >
                Unirse a un chatroom
              </button>
            )}
            {joinEnabled && (
              <MainForm onSubmit={handleJoinRoom}>
                <label htmlFor="roomCode" className="text-gray-400 text-sm">
                  Código del room
                </label>
                <div className="flex w-full">
                  <input
                    type="text"
                    name="roomCode"
                    onChange={handleChange}
                    value={value.toUpperCase()}
                    placeholder="e.g AS456"
                    className="p-1 focus:outline-none rounded-md rounded-tr-none rounded-br-none text-white bg-wpp-darkblue"
                  ></input>
                  <button className="rounded-md rounded-tl-none rounded-bl-none bg-wpp-primary text-white p-1">
                    Unirse
                  </button>
                </div>
                {error && <ErrorCard msg={error} />}
              </MainForm>
            )}
          </div>
          <div className="flex gap-5">
            <button
              onClick={onClose}
              type="button"
              className="group rounded-full group-hover:rounded-2xl bg-wpp-green.300 text-white px-2 py-1"
            >
              <MdClear className="text-2xl group-hover:hidden" />
              <span className="hidden animate-pulse transition ease-in-out delay-150 group-hover:inline text-white text-center self-center text-sm">
                Cancelar
              </span>
            </button>
            {(joinEnabled || createEnabled) && (
              <button
                onClick={disableAll}
                type="button"
                className="group rounded-full group-hover:rounded-2xl bg-wpp-green.300 text-white px-2 py-1"
              >
                <MdOutlineKeyboardBackspace className="text-2xl group-hover:hidden" />
                <span className="hidden animate-pulse transition ease-in-out delay-150 group-hover:inline text-white text-center self-center text-sm">
                  Atrás
                </span>
              </button>
            )}
          </div>
        </section>
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
    </>
  );
};

const MainForm = ({
  onSubmit,
  children,
}: {
  onSubmit?: (b: any) => any;
  children?: React.ReactNode;
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full gap-4">
      {children}
    </form>
  );
};
