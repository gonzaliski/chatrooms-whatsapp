"use client";
import { useUserSearch } from "@/hooks/useUserSearch";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { MdCheck, MdClear } from "react-icons/md";
import defaultUser from "../../public/deafultUserPhoto.jpg";
import { ErrorCard } from "../ErrorCard";

export const CreateChat = ({
  createEnabled,
  handleCreateChat,
  handleCreateRoom,
  selectedUser,
  handleCancelSelectedUser,
  disabled,
  selectUser,
  error,
}: {
  createEnabled: boolean;
  handleCreateChat: () => void;
  handleCreateRoom: () => void;
  selectedUser: UserData | null;
  handleCancelSelectedUser: () => void;
  disabled: boolean;
  selectUser: (u: UserData) => void;
  error: any;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { users, loading, searchError } = useUserSearch(searchQuery);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="flex flex-col gap-5">
      {!createEnabled && (
        <div className="flex flex-col gap-5">
          <button
            className="rounded-2xl bg-wpp-primary text-white p-2"
            type="button"
            onClick={handleCreateChat}
          >
            Crear chatroom
          </button>
          <button
            disabled
            className="rounded-2xl bg-wpp-primary text-white p-2 brightness-50"
            type="button"
            onClick={handleCreateChat}
          >
            Crear chatroom grupal
          </button>
        </div>
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
              onClick={handleCreateRoom}
            >
              <MdCheck className="text-2xl group-hover:hidden" />
              <span className="hidden animate-pulse transition ease-in-out delay-150 group-hover:inline text-white text-center self-center text-sm">
                Aceptar
              </span>
            </button>
            <button
              onClick={handleCancelSelectedUser}
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
        <div className="container w-80">
          <label htmlFor="value" className="text-gray-400 text-sm">
            Buscar usuario
          </label>
          <div className="flex w-full">
            <div className="w-full relative">
              <input
                type="text"
                name="value"
                onChange={handleChange}
                value={searchQuery}
                disabled={disabled}
                placeholder="username..."
                className="p-1 focus:outline-none rounded-md  text-white bg-wpp-darkblue w-80 z-10"
              ></input>

              <button
                className="flex items-center justify-center rounded-full bg-wpp-green.300 text-white w-5 h-5 absolute right-2 top-1.5"
                type="button"
                onClick={() => setSearchQuery("")}
                disabled={disabled}
              >
                <MdClear className="text-sm text-white " />
              </button>
            </div>
          </div>
          {!selectedUser && (
            <ul className="bg-wpp-green.300 text-white text-sm w-full text-clip max-h-44 overflow-auto">
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
          )}
          {error && <ErrorCard msg={error} />}
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
  );
};
