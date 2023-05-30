import { setUserPanelSelected } from "@/redux/slices/mobileMenuSlice";
import { useState } from "react";
import { BsDoorOpenFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

export const MobileMenuButton = () => {
  const [selection, setSelection] = useState(false);
  const dispatch = useDispatch();
  const handleSelection = () => {
    dispatch(setUserPanelSelected(!selection));
    setSelection(!selection);
  };
  return (
    <div
      className={`${
        !selection ? "inline" : "hidden"
      } md:hidden absolute left-5 top-5`}
      onClick={handleSelection}
    >
      <BsDoorOpenFill className="text-4xl text-gray-300 focus:text-white" />
    </div>
  );
};
