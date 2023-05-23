type Message = {
  incoming: boolean;
  message: string;
  from: string;
  timeStamp: any;
  prevIsFromOther: boolean;
  isLast: boolean;
};

type LSUserCredentials = {
  token: string;
  id: string;
  name: string;
};

type ChatCardListProps = ChatCard[];

type ChatCard = {
  lastMessage: string;
  id: string;
  timeStamp: string;
  participant: participant[];
  name: string;
};

type ChatCardProps = {
  shortId: string;
  id: string;
  participants: participant[];
  name: string;
  lastMessage: string;
  timeStamp: any;
  selected: boolean;
  onSelect: (a: RoomSelection) => any;
};
interface UserState {
  email: string;
  name: string;
  token: string;
  id: string;
}
interface userState {
  user: UserState;
}
type participant = {
  userId: string;
  name: string;
};
type RoomSelection = {
  shortId: string;
  roomId: string;
  name: string;
  participants: participant[];
};
interface chatState {
  chat: RoomSelection;
}

type Room = [
  string,
  {
    participants: participant[];
    roomShortId: string;
    roomName: string;
    lastMessage: string;
    timeStamp: any;
  }
];
