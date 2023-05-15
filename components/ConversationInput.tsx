"use client";
import useAutosizeTextArea from "@/hooks/autoSizeTextarea";
import { useState, useRef } from "react";

export const ConversationInput = ({
  value,
  onFill,
}: {
  value: string;
  onFill: (a: any) => any;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <textarea
      placeholder="Escribe tu mensaje aqui"
      onChange={onFill}
      className="bg-wpp-darkblue resize-none min-h-[36px] overflow-auto py-2 px-3 rounded-lg text-white text-sm w-full flex-grow mx-2 my-1 focus:outline-none"
      ref={textAreaRef}
      rows={1}
      value={value}
    ></textarea>
  );
};
