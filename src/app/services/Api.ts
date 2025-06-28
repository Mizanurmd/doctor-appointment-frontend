import axios from "axios";
import type { AuthResponse, LoginUserDTO, OurUser, RegisterUserDTO } from "../../pages/interface/OurUser";

const BASE_URL = "http://localhost:8081/api/v1/auth";

// Utility to get token from localStorage
const getToken = (): string | null => {
  const storedUser = localStorage.getItem("ourUser");
  if (!storedUser) return null;
  try {
    const parsed = JSON.parse(storedUser);
    return parsed.token ?? null;
  } catch {
    return null;
  }
};

const Api = {
  // ======================== Register User ============================
  registerUser: async (data: RegisterUserDTO): Promise<OurUser> => {
    const res = await axios.post<AuthResponse>(`${BASE_URL}/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Save entire auth response (including token, user, etc.)
    localStorage.setItem("ourUser", JSON.stringify(res.data));
    return res.data.user!;
  },

  // ========================= Login User ==============================
  loginUser: async (data: LoginUserDTO): Promise<AuthResponse> => {
    const res = await axios.post<AuthResponse>(`${BASE_URL}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.setItem("ourUser", JSON.stringify(res.data));
    return res.data;
  },

  // ========================= Logout User =============================
  logoutUser: async (): Promise<void> => {
    const token = getToken();

    if (!token) {
      throw new Error("No token found. User may not be logged in.");
    }

    try {
      await axios.post(`${BASE_URL}/logout`, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear user info from localStorage after logout
      localStorage.removeItem("ourUser");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  },
};

export default Api;
