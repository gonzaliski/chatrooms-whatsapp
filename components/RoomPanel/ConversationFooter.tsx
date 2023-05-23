"use client";
import { ConversationInput } from "@/components/RoomPanel/ConversationInput";
import { roomService } from "@/services/roomService";
import { FormEvent, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineAttachFile, MdSend } from "react-icons/md";

export const ConversationFooter = ({
  shortId,
  participants,
}: {
  shortId: string;
  participants: participant[];
}) => {
  const [value, setValue] = useState("");
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setValue(val);
  };

  const pushMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (value) {
      await roomService.pushMessage(value, participants, shortId);
      setValue("");
    }
  };

  return (
    <div className="inline-table min-h-[62px] bg-wpp-green.300 px-4 py-1">
      <div className="flex items-center w-full">
        <div className="flex min-h-[52px] gap-3 py-1 px-2">
          <div className="flex  items-center">
            <BsEmojiSmile className="text-gray-400 text-2xl" />
          </div>
          <div className="flex items-center">
            <MdOutlineAttachFile className="text-gray-400 text-2xl rotate-45" />
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
            } hover:brightness-300`}
            onClick={pushMessage}
          />
        </div>
      </div>
    </div>
  );
};
