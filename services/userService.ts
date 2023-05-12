import { API_BASE_URL } from "@/utils/constants";
import axios from "axios";

class UserService {
  getUserCredentialsFromLS() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("userCredentials") || "");
    }
  }
  saveUserCredentialsOnLS(data: LSUserCredentials) {
    if (typeof window !== "undefined") {
      localStorage.setItem("userCredentials", JSON.stringify(data));
    }
  }
  async sendCode(email: string) {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth`, { email });
      return res.data.message;
    } catch (e) {
      throw e;
    }
  }

  async getToken(code: string, email: string) {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/token`, {
        code,
        email,
      });
      console.log(res);
      this.saveUserCredentialsOnLS({
        token: res.data.token,
        id: res.data.userId,
      });
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}

export const userService = new UserService();
