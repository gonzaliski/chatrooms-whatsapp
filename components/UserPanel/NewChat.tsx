"use client";
import { userSelector } from "@/redux/selectors";
import { chatService } from "@/services/chatService";
import { FormEvent, useState } from "react";
import { MdAdd, MdClear, MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import { Modal } from "../Modal";
import { Spinner } from "../loaders/Spinner";
import { CreateChat } from "./CreateChat";
export const NewChat = () => {
  const { id, photoURL, name } = useSelector(userSelector);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [joinEnabled, setJoinEnabled] = useState(false);
  const [createEnabled, setCreateEnabled] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const handleCreateRoom = async () => {
    setDisabled(true);
    setIsLoading(true);
    try {
      await chatService.getOrCreateChatRoom(
        {
          id,
          photoURL,
          name,
          createdAt: undefined,
          username: "",
        },
        selectedUser!!
      );
      setIsLoading(false);
      onClose();
    } catch (e: any) {
      setError(e);
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

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value);
  //   setError("");
  // };
  // const handleJoinChat = () => {
  //   setJoinEnabled(true);
  //   setCreateEnabled(false);
  // };
  const selectUser = (user: UserData) => setSelectedUser(user);

  const handleCreateChat = async () => {
    setJoinEnabled(false);
    setCreateEnabled(true);
  };
  const disableAll = () => {
    setJoinEnabled(false);
    setCreateEnabled(false);
    setIsLoading(false);
    setDisabled(false);
    setSelectedUser(null);
    setValue("");
    setError("");
  };
  const onClose = () => {
    setIsOpen(false);
    disableAll();
  };
  const handleCancelSelectedUser = () => {
    setSelectedUser(null);
  };
  return (
    <>
      <Modal modalIsOpen={modalIsOpen}>
        <section className="relative flex flex-col items-center justify-start gap-10 min-w-1/2 xl:w-1/4 lg:w-1/2 sm:w-1/2 md:w-1/2 h-1/2 py-4 pt-10 px-4 bg-wpp-green.100 rounded-2xl">
          <h2 className="text-white text-center font-thin text-sm sm:text-lg md:text-2xl">
            Creá un nuevo chat!
          </h2>
          <CreateChat
            createEnabled={createEnabled}
            handleCreateChat={handleCreateChat}
            handleCreateRoom={handleCreateRoom}
            selectedUser={selectedUser}
            handleCancelSelectedUser={handleCancelSelectedUser}
            disabled={disabled}
            selectUser={selectUser}
            error={error}
          />
          <div className="flex gap-5 absolute bottom-2">
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
