import { store } from "@/redux/store";
import { API_BASE_URL } from "@/utils/constants";
import axios from "axios";

class UserService {
  getUserCredentialsFromLS() {
    if (typeof window !== "undefined") {
      const userCredentials = localStorage.getItem("userCredentials");
      const parsedCredentials = userCredentials
        ? JSON.parse(userCredentials)
        : null;
      return parsedCredentials;
    }
  }
  saveUserCredentialsOnLS(data: LSUserCredentials) {
    if (typeof window !== "undefined") {
      localStorage.setItem("userCredentials", JSON.stringify(data));
    }
  }
  removeUserCredentialsOnLS() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userCredentials");
    }
  }
  async sendCode(email: string) {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth`, { email });
      return [res.data.message, res.status];
    } catch (e) {
      throw e;
    }
  }

  async getToken(code: string, email: string) {
    console.log(code, email);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/token`, {
        code,
        email,
      });
      this.saveUserCredentialsOnLS({
        token: res.data.token,
        id: res.data.userId,
        name: res.data.name,
      });
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async updateUser(name: string, id: string) {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/user`,
        {
          name,
        },
        { params: { userId: id } }
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}

export const userService = new UserService();
