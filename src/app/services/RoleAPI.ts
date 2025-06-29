import axios from "axios";
import type { Role } from "../../pages/interface/Role";

const BASE_URL_ROLES = "http://localhost:8081/api/v1/auth";

const RoleAPI = {
  fetchRoles: async (): Promise<Role[]> => {
    try {
      const response = await axios.get<Role[]>(BASE_URL_ROLES);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createRole: async (): Promise<Role[]> => {
    try {
      const response = await axios.get<Role[]>(`${BASE_URL_ROLES}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // ======================== (Optional) Delete Role ====================
  deleteRole: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL_ROLES}/${id}`);
  },
};

export default RoleAPI;
