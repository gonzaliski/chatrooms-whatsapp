"use client";
import { ConversationInput } from "@/components/RoomPanel/Conversation/ConversationInput";
import { storage } from "@/firebase";
import { imageSelector } from "@/redux/selectors";
import { sendImage, setImage } from "@/redux/slices/imageSlice";
import { roomService } from "@/services/roomService";
import { maxImageSize } from "@/utils/errors";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FormEvent, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineAttachFile, MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { ErrorCard } from "../../ErrorCard";

export const ConversationFooter = ({
  shortId,
  participants,
}: {
  shortId: string;
  participants: participant[];
}) => {
  const { file } = useSelector(imageSelector);
  const [value, setValue] = useState("");
  const [img, setImg] = useState<Blob>();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setValue(val);
  };
  const handleError = (e: string) => {
    setError(e);
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  const pushMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (error) => {
          return setError(error.state);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await roomService.pushMessage(
              { text: value, img: downloadURL },
              participants,
              shortId
            );
            setValue("");
            setImg(undefined);
            dispatch(sendImage(false));
          });
        }
      );
    }
    if (value) {
      await roomService.pushMessage(
        { text: value, img: "" },
        participants,
        shortId
      );
      setValue("");
    }
  };

  return (
    <>
      {!file ? (
        <div className="inline-table min-h-[62px] bg-wpp-green.300 px-4 py-1">
          {error && <ErrorCard msg={error} />}
          <div className="flex items-center w-full">
            <div className="flex min-h-[52px] gap-3 py-1 px-2">
              <div className="flex  items-center">
                <BsEmojiSmile className="text-gray-400 text-2xl" />
              </div>
              <div className="flex items-center">
                <AttatchFile onError={handleError} onImg={setImg} />
              </div>
            </div>
            <form className="flex flex-center w-full" onSubmit={pushMessage}>
              <ConversationInput
                value={value}
                onFill={handleChange}
                onEnter={pushMessage}
              />
            </form>

            <div className="flex min-h-[52px] items-center py-1">
              <MdSend
                className={`text-gray-400 text-2xl ${
                  value ? "cursor-pointer" : "pointer-events-none"
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
                value={value}
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

const AttatchFile = ({
  onError,
  onImg,
}: {
  onError: (e: string) => void;
  onImg: (e: Blob) => void;
}) => {
  const dispatch = useDispatch();
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      maxImageSize(e);
      let file = e.target.files?.[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        onImg(file);
        console.log(objectUrl);
        dispatch(setImage({ file: objectUrl }));
      }
    } catch (e: any) {
      onError(e.message);
    }
  };
  return (
    <label htmlFor="file-upload">
      <input
        id="file-upload"
        type="file"
        accept="image/jpeg, image/png"
        className="hidden"
        onChange={handleFileUpload}
      ></input>
      <MdOutlineAttachFile className="text-gray-400 text-2xl rotate-45 cursor-pointer hover:brightness-200" />
    </label>
  );
};
