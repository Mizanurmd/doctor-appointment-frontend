import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import Api from "./Api";

import type {
  AuthResponse,
  LoginUserDTO,
  OurUser,
  RegisterUserDTO,
} from "../../pages/interface/OurUser";

interface AuthState {
  ourUsers: OurUser[]; // list of users
  selectedUser: OurUser | null; // currently logged-in user
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  ourUsers: [],
  selectedUser: null,
  loading: false,
  error: null,
};

//============== For register ===============//
export const addUser = createAsyncThunk<
  OurUser,
  RegisterUserDTO,
  { rejectValue: string }
>("authServiceSlice/add", async (data, thunkAPI) => {
  try {
    const user = await Api.registerUser(data);
    return user;
  } catch (err: unknown) {
    let message = "Registration failed";

    if (err && typeof err === "object" && "message" in err) {
      message = (err as { message: string }).message;
    }

    return thunkAPI.rejectWithValue(message);
  }
});

//============== For login ===============//
export const loginForUser = createAsyncThunk<
  AuthResponse,
  LoginUserDTO,
  { rejectValue: string }
>("authServiceSlice/login", async (data, thunkAPI) => {
  try {
    const response = await Api.loginUser(data); // returns AuthResponse
    return response;
  } catch (err: unknown) {
    let message = "Login failed";
    if (err && typeof err === "object" && "message" in err) {
      message = (err as { message: string }).message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});

//============== For logout ===============//
export const logoutForUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("authServiceSlice/logout", async (_, thunkAPI) => {
  try {
    await Api.logoutUser();
    return;
  } catch (err: unknown) {
    let message = "Logout failed";
    if (err && typeof err === "object" && "message" in err) {
      message = (err as { message: string }).message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});

//============================= Create Slice =======================//
const authServiceSlice = createSlice({
  name: "authServiceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register fulfilled: add user to list
      .addCase(addUser.fulfilled, (state, action: PayloadAction<OurUser>) => {
        state.ourUsers.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      // Login fulfilled: set logged in user & reset error/loading
      .addCase(
        loginForUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          if (action.payload.user) {
            state.selectedUser = action.payload.user;
            state.ourUsers = [action.payload.user];
          }
          state.loading = false;
          state.error = null;
        }
      )
      // Logout fulfilled: reset auth state
      .addCase(logoutForUser.fulfilled, (state) => {
        state.selectedUser = null;
        state.ourUsers = [];
        state.loading = false;
        state.error = null;
      })

      // Pending matcher: set loading true and clear errors
      .addMatcher(
        (action) =>
          action.type.startsWith("authServiceSlice/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // Rejected matcher: set error message from payload and loading false
      .addMatcher(
        (action) =>
          action.type.startsWith("authServiceSlice/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          // Cast action to PayloadAction<string | undefined> for payload and error access
          const typedAction = action as {
            payload?: string;
            error?: { message?: string };
          };

          if (typedAction.payload) {
            state.error = typedAction.payload;
          } else if (typedAction.error?.message) {
            state.error = typedAction.error.message;
          } else {
            state.error = "Unknown error";
          }
        }
      );
  },
});

export default authServiceSlice.reducer;
