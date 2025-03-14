"use client";
import { AttatchFile } from "@/components/AttatchFile";
import { ConversationInput } from "@/components/RoomPanel/Conversation/ConversationInput";
import { imageSelector, userSelector } from "@/redux/selectors";
import { unselectImage } from "@/redux/slices/imageSlice";
import { chatService } from "@/services/chatService";
import { uploadImage } from "@/utils/uploadImage";
import { FormEvent, useEffect, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ErrorCard } from "../../ErrorCard";
import EmojiPicker, { Emoji, EmojiClickData, Theme } from "emoji-picker-react";
import { MessageTextRenderer } from "./MessageTextRenderer";
import { uid } from "uid";

export const ConversationFooter = ({
  chatId,
  contactId,
}: {
  chatId: string;
  contactId: string;
}) => {
  const { file } = useSelector(imageSelector);
  const { id } = useSelector(userSelector);
  const [text, setText] = useState("");
  const [img, setImg] = useState<Blob>();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setText(val);
  };
  const handleError = (e: string) => {
    setError(e);
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  const pushMessage = async (e: FormEvent) => {
    e.preventDefault();
    const isOnlySpaces = (text: string): boolean => text.trim().length === 0;
    if (isOnlySpaces(text) && !img) return;
    const textValue = text;
    setText("");
    try {
      let imgURL = "";
      if (img) {
        imgURL = (await uploadImage(img)) || "";
        setImg(undefined);
        dispatch(unselectImage());
      }
      await chatService.sendMessage(chatId, id, contactId, {
        text: textValue,
        img: imgURL,
      });
    } catch (error: any) {
      console.error(error);
      setTimeout(() => {
        setError("Ocurrió un problema con el envío de mensaje");
      }, 4000);
    }
  };
  const handleEmoji = (e: EmojiClickData) => {
    console.log(e);

    setText((prev) => prev + e.emoji);
    setOpen(false);
  };
  useEffect(() => {
    if (!file) {
      setImg(undefined);
    }
  }, [file]);
  return (
    <>
      {!file ? (
        <div className="relative inline-table min-h-[62px] bg-wpp-green.300 px-4 py-1">
          {error && <ErrorCard msg={error} />}
          <div className="flex items-center w-full">
            <div className="flex min-h-[52px] gap-3 py-1 px-2">
              <div className="flex  items-center">
                <BsEmojiSmile
                  className="text-gray-400 text-2xl cursor-pointer hover:brightness-200"
                  onClick={() => setOpen((prev) => !prev)}
                />
                <div className="absolute bottom-full z-10 animate-(--animate-pop)">
                  <EmojiPicker
                    lazyLoadEmojis={true}
                    open={open}
                    theme={Theme.DARK}
                    onEmojiClick={handleEmoji}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <AttatchFile onError={handleError} onImg={setImg} />
              </div>
            </div>
            <form className="flex flex-center w-full" onSubmit={pushMessage}>
              <ConversationInput
                value={text}
                onFill={handleChange}
                onEnter={pushMessage}
              />
            </form>

            <div className="flex min-h-[52px] items-center py-1">
              <MdSend
                className={`text-gray-400 text-2xl ${
                  text ? "cursor-pointer" : "pointer-events-none"
                } hover:brightness-200`}
                onClick={pushMessage}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="inline-table min-h-[62px] px-4 py-1">
          {error && <ErrorCard msg={error} />}
          <div className="flex items-center w-full">
            {/*
            TODO:
            <div className="flex  items-center">
              <BsEmojiSmile className="text-gray-400 text-2xl" />
            </div> */}

            <form className="flex flex-center w-full" onSubmit={pushMessage}>
              <ConversationInput
                value={text}
                onFill={handleChange}
                onEnter={pushMessage}
              />
            </form>

            <button
              className="bg-wpp-primary rounded-full p-3 hover:brightness-110"
              onClick={pushMessage}
            >
              <MdSend className="text-3xl text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
