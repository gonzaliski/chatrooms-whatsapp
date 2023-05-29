export const ChatCardSkeleton = () => {
  return (
    <div className="flex text-white justify-start max-w-md min-h-[72px] relative pl-3 animate-pulse gap-3">
      <div className="bg-gray-400 px-[15px] w-[49px] h-[49px] rounded-full max-w-none mt-2" />
      <div className="flex flex-col flex-grow gap-3 font-light justify-center pr-5 truncate border-t border-gray-400/10">
        <span className="h-5 w-2/6 rounded-md bg-gray-400"></span>
        <span className="bg-gray-400 h-3 rounded-md w-4/6"></span>
      </div>
    </div>
  );
};
