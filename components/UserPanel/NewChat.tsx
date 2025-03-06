"use client";
import { userSelector } from "@/redux/selectors";
import { chatService } from "@/services/chatService";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  MdAdd,
  MdCheck,
  MdClear,
  MdOutlineKeyboardBackspace,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { ErrorCard } from "../ErrorCard";
import { Modal } from "../Modal";
import { Spinner } from "../loaders/Spinner";
import { useUserSearch } from "@/hooks/useUserSearch";
import defaultUser from "../../public/deafultUserPhoto.jpg";
import Image from "next/image";
export const NewChat = () => {
  const { id } = useSelector(userSelector);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [joinEnabled, setJoinEnabled] = useState(false);
  const [createEnabled, setCreateEnabled] = useState(false);
  const [userIdToChat, setUserIdToChat] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const { users, loading, searchError } = useUserSearch(searchQuery);
  const handleCreateRoom = async (e: FormEvent) => {
    setDisabled(true);
    setIsLoading(true);
    e.preventDefault();
    try {
      await chatService.getOrCreateChatRoom(id, userIdToChat);
      setIsLoading(false);
      onClose();
    } catch (e: any) {
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };
  // const handleJoinRoom = async (e: FormEvent) => {
  //   setDisabled(true);
  //   setIsLoading(true);

  //   e.preventDefault();
  //   try {
  //     await roomService.joinRoom(value, id);
  //     setIsLoading(false);
  //     onClose();
  //   } catch (e: any) {
  //     setError(e.response.data.message);
  //     setIsLoading(false);
  //   }
  // };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setError("");
  };
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value);
  //   setError("");
  // };
  // const handleJoinChat = () => {
  //   setJoinEnabled(true);
  //   setCreateEnabled(false);
  // };
  const selectUser = (user: UserData) => setSelectedUser(user);

  const handleCreateChat = () => {
    setJoinEnabled(false);
    setCreateEnabled(true);
  };
  const disableAll = () => {
    setJoinEnabled(false);
    setCreateEnabled(false);
    setIsLoading(false);
    setDisabled(false);
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
        <section className="flex flex-col items-center justify-center gap-10 min-w-1/2 lg:w-1/4 sm:w-1/2 md:w-1/2 h-1/2 py-4 px-4 bg-wpp-green.100 rounded-2xl">
          <h2 className="text-white text-center font-thin text-sm sm:text-lg md:text-2xl">
            {!joinEnabled && !createEnabled
              ? "Creá un nuevo chat!"
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
            {selectedUser && (
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-white text-center font-thin text-sm">
                  Crear chat con {selectedUser.name}?
                </h3>
                <Image
                  src={selectedUser.photoURL || defaultUser}
                  className="object-cover w-[70px] h-[70px] rounded-full max-w-none cursor-pointer"
                  width="200"
                  height="200"
                  alt="Profile image"
                />
                <div className="flex items-center gap-5">
                  <button
                    className="group rounded-full group-hover:rounded-2xl bg-wpp-green.300 text-white px-2 py-1"
                    type="button"
                    onClick={handleCreateChat}
                  >
                    <MdCheck className="text-2xl group-hover:hidden" />
                    <span className="hidden animate-pulse transition ease-in-out delay-150 group-hover:inline text-white text-center self-center text-sm">
                      Aceptar
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedUser(null)}
                    type="button"
                    className="group rounded-full group-hover:rounded-2xl bg-wpp-green.300 text-white px-2 py-1"
                  >
                    <MdClear className="text-2xl group-hover:hidden" />
                    <span className="hidden animate-pulse transition ease-in-out delay-150 group-hover:inline text-white text-center self-center text-sm">
                      Cancelar
                    </span>
                  </button>
                </div>
              </div>
            )}
            {createEnabled && (
              <div className="container w-full">
                <label htmlFor="value" className="text-gray-400 text-sm">
                  Buscar usuario
                </label>
                <div className="flex w-full">
                  <input
                    type="text"
                    name="value"
                    onChange={handleChange}
                    value={searchQuery}
                    disabled={disabled}
                    placeholder="email, nombre..."
                    className="p-1 focus:outline-none rounded-md rounded-tr-none rounded-br-none text-white bg-wpp-darkblue"
                  ></input>
                  <button
                    className="rounded-md rounded-tl-none rounded-bl-none bg-wpp-primary text-white p-1"
                    type="button"
                    onClick={handleCreateRoom}
                    disabled={disabled}
                  >
                    Crear
                  </button>
                </div>
                {error && <ErrorCard msg={error} />}
                {error && <p>{error}</p>}
                <ul className="bg-wpp-green.300 text-white text-sm">
                  {users.length === 0 && searchQuery ? (
                    <p>No se encontraron usuarios</p>
                  ) : (
                    users.map((user: UserData) => (
                      <li
                        key={user.id}
                        className=" p-1 border-b-1 border-wpp-green.100 hover:bg-wpp-darkblue"
                      >
                        <button
                          className="flex w-full gap-2 border-none hover:bg-wpp-darkblue"
                          onClick={() => selectUser(user)}
                        >
                          <Image
                            src={user.photoURL || defaultUser}
                            className="object-cover w-[25px] h-[25px] rounded-full max-w-none cursor-pointer"
                            width="100"
                            height="100"
                            alt="Profile image"
                          />
                          {user.username} -{" "}
                          <p className="italic brightness-50">{user.name}</p>
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
            {/* {createEnabled && (
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
                    disabled={disabled}
                    placeholder="Nuevo grupo"
                    className="p-1 focus:outline-none rounded-md rounded-tr-none rounded-br-none text-white bg-wpp-darkblue"
                  ></input>
                  <button
                    className="rounded-md rounded-tl-none rounded-bl-none bg-wpp-primary text-white p-1"
                    type="button"
                    onClick={handleCreateRoom}
                    disabled={disabled}
                  >
                    Crear
                  </button>
                </div>
                {error && <ErrorCard msg={error} />}
              </form>
            )} */}
            {/* {!joinEnabled && !createEnabled && (
              <button
                className="rounded-2xl bg-wpp-darkblue text-white p-2"
                onClick={handleJoinChat}
              >
                Unirse a un chatroom
              </button>
            )} */}
            {/* {joinEnabled && (
              <MainForm onSubmit={handleJoinRoom}>
                <label htmlFor="roomCode" className="text-gray-400 text-sm">
                  Código del room
                </label>
                <div className="flex w-full">
                  <input
                    type="text"
                    name="roomCode"
                    onChange={handleChange}
                    disabled={disabled}
                    value={value.toUpperCase()}
                    placeholder="e.g AS456"
                    className="p-1 focus:outline-none rounded-md rounded-tr-none rounded-br-none text-white bg-wpp-darkblue"
                  ></input>
                  <button
                    className="rounded-md rounded-tl-none rounded-bl-none bg-wpp-primary text-white p-1"
                    disabled={disabled}
                  >
                    Unirse
                  </button>
                </div>
                {error && <ErrorCard msg={error} />}
              </MainForm>
            )} */}
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
          {isLoading && <Spinner />}
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
