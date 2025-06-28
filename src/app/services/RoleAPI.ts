import axios from "axios";
import type { Role } from "../../pages/interface/Role";

const BASE_URL_ROLES = "http://localhost:8081/api/v1/auth";

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

const RoleAPI = {
  // ======================== Get All Roles ============================
  fetchRoles: async (): Promise<Role[]> => {
    const token = getToken();
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};

    const res = await axios.get<Role[]>(BASE_URL_ROLES, { headers });
    return res.data;
  },

  // ======================== (Optional) Create Role ====================
  createRole: async (role: Role): Promise<Role> => {
    const token = getToken();
    const res = await axios.post<Role>(BASE_URL_ROLES, role, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  // ======================== (Optional) Delete Role ====================
  deleteRole: async (id: number): Promise<void> => {
    const token = getToken();
    await axios.delete(`${BASE_URL_ROLES}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default RoleAPI;
