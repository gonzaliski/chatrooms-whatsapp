import { useState } from "react";

export const Modal = ({
  modalIsOpen,
  styles,
  children,
}: {
  modalIsOpen: boolean;
  styles?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={
        styles +
        `${
          modalIsOpen ? "inline z-50" : "hidden -z-40"
        } top-0 left-0 w-screen h-screen bg-black bg-opacity-60 absolute`
      }
    >
      <div
        className={`flex items-center justify-center ${
          modalIsOpen ? "inline z-60" : "hidden -z-50"
        } w-full h-full`}
      >
        {children}
      </div>
    </div>
  );
};
