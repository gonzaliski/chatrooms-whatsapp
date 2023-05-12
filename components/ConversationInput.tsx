"use client";
import useAutosizeTextArea from "@/hooks/autoSizeTextarea";
import { useState, useRef } from "react";

export const ConversationInput = () => {
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };
  return (
    <textarea
      placeholder="Escribe tu mensaje aqui"
      onChange={handleChange}
      className="bg-wpp-darkblue resize-none min-h-[36px] overflow-auto py-2 px-3 rounded-lg text-white text-sm w-full flex-grow mx-2 my-1 focus:outline-none"
      ref={textAreaRef}
      rows={1}
      value={value}
    ></textarea>
  );
};
