import axios from "axios";

class RoomService {
  constructor() {}
  async getRooms(userId: string) {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/rooms`,
        {
          params: { userId },
        }
      );
      console.log(res);

      return res.data;
    } catch (e) {
      throw e;
    }
  }
  async pushMessage(
    message: { text: string; img: string },
    participants: participant[],
    roomId: string,
    userId: string,
    name: string,
    photoURL: string
  ) {
    let body = {
      roomData: {
        id: roomId,
        participants: participants,
      },
      name,
      photoURL,
      message,
    };
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/messages`,
        { ...body },
        {
          params: { userId },
        }
      );
    } catch (e) {
      throw e;
    }
  }
  async createRoom(name: string, userId: string) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/rooms`,
        { name },
        {
          params: { userId },
        }
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }
  async joinRoom(code: string, userId: string) {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/rooms/${code
          .toUpperCase()
          .trim()}`,
        {
          params: { userId },
        }
      );
      console.log(res.data);

      return res.data;
    } catch (e) {
      throw e;
    }
  }
}

export const roomService = new RoomService();
