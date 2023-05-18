import { MdError } from "react-icons/md";
export const ErrorCard = ({ msg }: { msg: string }) => {
  return (
    <span className="flex items-center gap-2 text-white bg-red-500 p-1">
      <MdError className="text-xl" /> {msg}
    </span>
  );
};
