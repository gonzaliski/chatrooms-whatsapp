import { chatSelector, imageSelector, userSelector } from "@/redux/selectors";
import { unselectImage } from "@/redux/slices/imageSlice";
import Image from "next/image";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdClear, MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ConversationFooter } from "./ConversationFooter";
import { ConversationPanel } from "./ConversationPanel";

export const Conversation = () => {
  const { chatId, contactData } = useSelector(chatSelector);
  const { file } = useSelector(imageSelector);
  const { id } = useSelector(userSelector);

  return (
    <div className="flex flex-col md:flex-grow h-full w-full min-w-[70%]">
      <ChatHeader name={contactData.name} avatar={contactData.photoURL} />
      {!file ? (
        <ConversationPanel
          chatId={chatId}
          userId={id}
          profilePicture={contactData.photoURL}
        />
      ) : (
        <ImagePreview file={file} />
      )}
      <ConversationFooter contactId={contactData.id} chatId={chatId} />
    </div>
  );
};

const ImagePreview = ({ file }: { file: string }) => {
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(unselectImage());
  };
  return (
    <section className="flex flex-col items-center w-full h-full">
      <header className="w-full h-20 p-5">
        <MdClear
          className="text-gray-400 text-4xl self-start cursor-pointer hover:brightness-200"
          onClick={handleCancel}
        />
      </header>
      <div className="flex flex-col justify-center items-center h-full">
        <Image
          src={file}
          alt={"file"}
          className="w-3/5"
          width="100"
          height="100"
        />
      </div>
    </section>
  );
};

const ChatHeader = ({ name, avatar }: { name: string; avatar: string }) => {
  return (
    <div className="flex items-center justify-between w-full bg-wpp-green.300 px-4 py-[10px] ml-[2px]">
      <div className="flex gap-2 items-center w-full">
        <Image
          src={avatar}
          className="inline object-cover w-[40px] h-[40px] rounded-full max-w-none"
          width="100"
          height="100"
          alt="Profile image"
        />
        <div className="flex flex-col flex-grow">
          <span className="text-md text-white font-sans">{name}</span>
        </div>
        <div className="flex flex-shrink gap-7 pr-3">
          <MdOutlineSearch className="text-gray-400 text-2xl  top-1/4 left-4" />
          <HiOutlineDotsVertical className="text-gray-400 text-2xl" />
        </div>
      </div>
    </div>
  );
};
