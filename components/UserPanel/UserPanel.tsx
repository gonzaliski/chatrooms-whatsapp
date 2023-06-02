import { ChatCardList } from "./ChatCardList";
import { SearchBar } from "./SearchBar";
import { UserTab } from "./UserTab";

export const UserPanel = () => {
  return (
    <div className="flex flex-col md:flex-1 items-center w-full h-full border-r border-gray-400/20 min-w-[250px] md:min-w-[30%]">
      <UserTab />
      <SearchBar />
      <ChatCardList />
    </div>
  );
};
