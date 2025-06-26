import axios from "axios";
import type { LoginUserDTO, OurUser, RegisterUserDTO } from "../../pages/interface/OurUser";

const BASE_URL = "http://localhost:8081/api/v1/auth";

// Utility to get token from localStorage
const getToken = (): string | null => {
  const storedUser = localStorage.getItem("ourUser");
  return storedUser ? JSON.parse(storedUser).token : null;
};

const Api = {
  // ======================== Register User ============================
  registerUser: async (data: RegisterUserDTO): Promise<OurUser> => {
    const res = await axios.post(`${BASE_URL}/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Save user data including token to localStorage
    localStorage.setItem("ourUser", JSON.stringify(res.data));
    return res.data.user;
  },

  // ========================= Login User ==============================
  loginUser: async (data: LoginUserDTO): Promise<OurUser> => {
    const res = await axios.post(`${BASE_URL}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const user = res.data?.user || res.data;

    if (user) {
      localStorage.setItem("ourUser", JSON.stringify(res.data));
    }

    return user;
  },

  // ========================= Logout User =============================
  logoutUser: async (): Promise<any> => {
    const token = getToken();

    if (!token) {
      throw new Error("No token found. User may not be logged in.");
    }

    try {
      const res = await axios.post(`${BASE_URL}/logout`, {}, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      // Clear user info from localStorage after logout
      localStorage.removeItem("ourUser");
      console.log("Logout API response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  },
};

export default Api;
