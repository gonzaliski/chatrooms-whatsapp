import { store } from "@/redux/store";
import { API_BASE_URL } from "@/utils/constants";
import axios from "axios";

class RoomService {
  userId: string;
  token: string;
  name: string;
  constructor() {
    const currentState = store.getState();
    const { token, id, name } = currentState.user;
    this.userId = id;
    this.token = token;
    this.name = name;
  }
  async getRooms() {
    try {
      const res = await axios.get(`${API_BASE_URL}/rooms`, {
        params: { userId: this.userId },
      });
      console.log(res);

      return res.data;
    } catch (e) {
      throw e;
    }
  }
  async pushMessage(
    message: string,
    participants: participant[],
    roomId: string
  ) {
    let body = {
      roomData: {
        id: roomId,
        participants: participants,
      },
      name: this.name,
      message,
    };
    try {
      await axios.post(
        `${API_BASE_URL}/messages`,
        { ...body },
        {
          params: { userId: this.userId },
        }
      );
    } catch (e) {
      throw e;
    }
  }
  async createRoom(name: string) {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/rooms`,
        { name },
        {
          params: { userId: this.userId },
        }
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }
  async joinRoom(code: string) {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/rooms/${code.toUpperCase().trim()}`,
        {
          params: { userId: this.userId },
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
