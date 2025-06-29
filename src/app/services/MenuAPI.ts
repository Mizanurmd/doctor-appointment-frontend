
// src/app/services/menuAPI.ts
import axios from "axios";
import type { Menu } from "../../pages/interface/Menu";

const BASE_URL = "http://localhost:8081/api/v1/menus";

const getToken = (): string | null => {
  const stored = localStorage.getItem("ourUser");
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored);
    return parsed.token ?? null;
  } catch {
    return null;
  }
};

export const MenuAPI = {
  // Fetch menus for logged-in user (with token)
  fetchUserMenus: async (): Promise<Menu[]> => {
    const token = getToken();
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};

    const response = await axios.get<Menu[]>(`${BASE_URL}/user`, { headers });
    return response.data;
  },

  // (Optional) Fetch all menus (e.g., for admin UI)
  fetchAllMenus: async (): Promise<Menu[]> => {
    const response = await axios.get<Menu[]>(BASE_URL);
    return response.data;
  },

};

export default MenuAPI;
