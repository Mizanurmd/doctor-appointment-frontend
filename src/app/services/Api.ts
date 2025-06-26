import axios from "axios";
import type { AuthResponse, LoginUserDTO, OurUser, RegisterUserDTO } from "../../pages/interface/OurUser";

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
 loginUser: async (data: LoginUserDTO): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>(`${BASE_URL}/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = res.data;

  // Create a fake user object if needed
  const user: OurUser = {
    id: 0,
  name: "", // Optional: set if available
  email: data.email,
  role: response.role ?? "",
  createdAt: new Date().toISOString(), // ✅ required
  updatedAt: null,
  deletedAt: null,
  };

  const fullResponse: AuthResponse = {
    ...response,
    user, 
  };

  localStorage.setItem("ourUser", JSON.stringify(fullResponse));

  return fullResponse;
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
