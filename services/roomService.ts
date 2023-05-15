import { API_BASE_URL } from "@/utils/constants";
import axios from "axios";

class RoomService {
  userId: string;
  token: string;
  constructor() {
    const { token, userId } = JSON.parse(
      localStorage.getItem("userCredentials") || ""
    );
    this.userId = userId;
    this.token = token;
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
  async pushMessage() {
    try {
      await axios.post(`${API_BASE_URL}/messages`, {
        params: { userId: this.userId },
      });
    } catch (e) {
      throw e;
    }
  }
}

export const roomService = new RoomService();
