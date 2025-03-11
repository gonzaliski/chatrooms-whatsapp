import { auth } from "@/firebase";
import axios from "axios";

class RoomService {
  async getRooms(userId: string) {
    let token = (await auth.currentUser?.getIdToken()) || "";
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/rooms`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { userId },
        }
      );
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
    let token = (await auth.currentUser?.getIdToken()) || "";
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { userId },
        }
      );
    } catch (e) {
      throw e;
    }
  }
  async createRoom(name: string, userId: string) {
    let token = (await auth.currentUser?.getIdToken()) || "";

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/rooms`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { userId },
        }
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }
  async joinRoom(code: string, userId: string) {
    let token = (await auth.currentUser?.getIdToken()) || "";

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/rooms/${code
          .toUpperCase()
          .trim()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { userId },
        }
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}

export const roomService = new RoomService();
