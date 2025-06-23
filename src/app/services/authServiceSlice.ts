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
    );
  },
});

export default authServiceSlice.reducer;
