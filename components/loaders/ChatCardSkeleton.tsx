export const ChatCardSkeleton = () => {
  return (
    <div className="flex text-white justify-start max-w-md min-h-[72px] relative cursor-pointer animate-pulse">
      <div className="px-[15px] w-[49px] h-[49px] rounded-full max-w-none mt-2" />
      <div className="flex flex-col flex-grow font-light justify-center pr-5 truncate border-t border-gray-400/10">
        <span className="h-12 w-2/6 bg-gray-400"></span>
        <span className="bg-gray-400 h-12 w-4/6"></span>
      </div>
    </div>
  );
};
