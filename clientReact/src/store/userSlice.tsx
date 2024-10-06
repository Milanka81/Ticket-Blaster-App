import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isLoggedIn } from "../services/authService";
import { AuthState } from "./user";
export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  return isLoggedIn().then((res) => res.data.loggedIn);
});

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin(state) {
      state.isLoggedIn = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout(state) {
      state.isLoggedIn = false;
    },
    updateStatus(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(checkAuth.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(checkAuth.fulfilled, (state, action) => {
  //       state.status = "idle";
  //       state.isLoggedIn = action.payload;
  //     })
  //     .addCase(checkAuth.rejected, (state) => {
  //       state.status = "error";
  //     });
  // },
});

export const { setLogin, setUser, setLogout, updateStatus } = userSlice.actions;
export default userSlice.reducer;
