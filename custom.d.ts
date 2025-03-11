type Message = {
  id: string;
  incoming?: boolean;
  messageText: string;
  messageImg: string;
  from: string;
  timeStamp: any;
  prevIsFromOther: boolean;
  isLast?: boolean;
  profilePicture?: string;
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
  roomId: string;
  contact: userDTO;
  lastMessage: message;
  lastMessageFrom: string;
  timeStamp: any;
  selected: boolean;
  isSeen: boolean;
  onSelect: (a: RoomSelection) => any;
};
interface UserState {
  email: string;
  name: string;
  photoURL: string;
  id: string;
  loading: boolean;
  isAuth: boolean | null;
  isNew: boolean | null;
}
interface userState {
  user: UserState;
}
type participant = {
  userId: string;
  name: string;
};
type RoomSelection = {
  chatId: string;
  contactData: userDTO;
};
interface chatState {
  chat: RoomSelection;
}
interface imageState {
  image: { file: string; pendingToSend: boolean };
}
interface chatListState {
  chatListFilter: { filter: string };
}
type ChatMessage = {
  idFrom: string;
  message: message;
  timestamp: string;
  messageId: string;
};

type Room = {
  id: string;
  contactName: string;
  contactId: string;
  photoURL: string;
  lastMessage: message;
  timestamp: any;
};
type userChat = {
  chatId: string;
  lastMessage: message;
  contactData: userDTO;
  lastMessageFrom?: string;
  timestamp: any;
  isSeen: boolean;
};
interface userDTO {
  id: string;
  photoURL: string;
  name: string;
}

type message = { text?: string; img?: string };

type AuthProps = {
  handleEmailChange: (e: string) => void;
  handlePassChange: (e: string) => void;
  email: string;
  password: string;
  isDisabled: boolean;
  handler: (e: React.FormEvent<HTMLFormElement>) => void;
};

type UpdatableData = {
  photoURL?: string;
  displayName?: string;
};

type UserTabProps = {
  photoURL?: string;
};

type participantsData = {
  profilePictures: string;
};
type UserData = {
  createdAt: date;
  id: string;
  name: string;
  photoURL: string;
  username: string;
};
