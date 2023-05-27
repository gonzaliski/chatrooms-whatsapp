type Message = {
  incoming: boolean;
  message: message;
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
  lastMessage: message;
  timeStamp: any;
  selected: boolean;
  onSelect: (a: RoomSelection) => any;
};
interface UserState {
  email: string;
  name: string;
  photoURL: string;
  id: string;
  loading: boolean;
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
interface imageState {
  image: { file: string; pendingToSend: boolean };
}

type Room = [
  string,
  {
    participants: participant[];
    roomShortId: string;
    roomName: string;
    lastMessage: message;
    timeStamp: any;
  }
];

type message = {
  text: string;
  img: string;
};

type AuthProps = {
  handleEmailChange: (e: string) => void;
  handlePassChange: (e: string) => void;
  email: string;
  password: string;
  handler: (e: React.FormEvent<HTMLFormElement>) => void;
};

type UpdatableData = {
  photoURL?: string;
  displayName?: string;
};

type UserTabProps = {
  photoURL?: string;
};
