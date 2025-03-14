"use client";
import useAutosizeTextArea from "@/hooks/autoSizeTextarea";
import { FormEvent, useRef } from "react";
import { MessageTextRenderer } from "./MessageTextRenderer";

export const ConversationInput = ({
  value,
  onFill,
  onEnter,
}: {
  value: string;
  onFill: (a: any) => any;
  onEnter: (e: FormEvent) => Promise<void>;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onEnter(e);
    }
  };

  return (
    <textarea
      placeholder="Escribe tu mensaje aqui"
      onChange={onFill}
      className="bg-wpp-darkblue resize-none min-h-[36px] overflow-auto py-2 px-3 rounded-lg text-white text-sm w-full flex-grow mx-2 my-1 focus:outline-none"
      ref={textAreaRef}
      rows={1}
      onKeyDown={handleKeyDown}
      value={value}
    ></textarea>
  );
};
