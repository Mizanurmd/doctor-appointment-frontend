import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import Api from "./Api";

import type { LoginUserDTO, OurUser, RegisterUserDTO } from "../../pages/interface/OurUser";

interface AuthState {
  ourUsers: OurUser[]; // list of users
  selectedUser: OurUser | null; // selected user details
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  ourUsers: [],
  selectedUser: null,
  loading: false,
  error: null,
};
//============== For regiter ===============//
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
  OurUser,
  LoginUserDTO,
  { rejectValue: string }
>("authServiceSlice/login", async (data, thunkAPI) => {
  try {
    const user = await Api.loginUser(data);
    return user;
  } catch (err: unknown) {
    let message = "Login failed";

    if (err && typeof err === "object" && "message" in err) {
      message = (err as { message: string }).message;
    }

    return thunkAPI.rejectWithValue(message);
  }
});

//============== For login ===============//

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


//=============================Create Slice =======================//
const authServiceSlice = createSlice({
  name: "authServiceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(
      addUser.fulfilled,
      (state, action: PayloadAction<OurUser>) => {
        state.ourUsers.push(action.payload);
      }
    )
    .addCase(
      loginForUser.fulfilled,
      (state, action: PayloadAction<OurUser>) => {
        state.ourUsers.push(action.payload);
      }
    )
 // Logout
      .addCase(logoutForUser.fulfilled, (state) => {
        state.selectedUser = null;
        state.loading = false;
        state.error = null;
        state.ourUsers = []; // Optional: clear list on logout
      })
      // Pending state for async thunks
      .addMatcher(
        (action) => action.type.startsWith("authServiceSlice/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      // Rejected state for async thunks
      .addMatcher(
        (action) => action.type.startsWith("authServiceSlice/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.type as string;
        }
      );

  },
});

export default authServiceSlice.reducer;
