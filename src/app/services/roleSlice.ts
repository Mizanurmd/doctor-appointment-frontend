import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import RoleAPI from "./RoleAPI";
import type { Role } from "../../pages/interface/Role";

interface RoleState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  loading: false,
  error: null,
};

// ======================= Async Thunks =======================

// Fetch all roles
export const fetchRoles = createAsyncThunk<
  Role[],
  void,
  { rejectValue: string }
>("role/fetchRoles", async (_, thunkAPI) => {
  try {
    return await RoleAPI.fetchRoles();
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch roles.");
  }
});

// Create a new role (optional)
export const createRole = createAsyncThunk<Role, Role, { rejectValue: string }>(
  "role/createRole",
  async (role, thunkAPI) => {
    try {
      return await RoleAPI.createRole(role);
    } catch {
      return thunkAPI.rejectWithValue("Failed to create role.");
    }
  }
);

// ======================= Slice =======================

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<Role[]>) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      .addCase(createRole.fulfilled, (state, action: PayloadAction<Role>) => {
        state.roles.push(action.payload);
      });
  },
});

export default roleSlice.reducer;
