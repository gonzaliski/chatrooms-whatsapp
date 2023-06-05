import { setImage } from "@/redux/slices/imageSlice";
import { maxImageSize } from "@/utils/errors";
import { MdOutlineAttachFile } from "react-icons/md";
import { useDispatch } from "react-redux";

export const AttatchFile = ({
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
