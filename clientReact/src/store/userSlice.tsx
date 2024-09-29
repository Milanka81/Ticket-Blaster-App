import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isLoggedIn } from "../services/authService";

export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  return isLoggedIn().then((res) => res.data.loggedIn);
});

const initialState = {
  fullName: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.fullName = action.payload;
    },
    isLogin(state) {
      state.isLoggedIn = true;
    },
    isLogout(state) {
      state.isLoggedIn = false;
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

export const { updateName, isLogin, isLogout } = userSlice.actions;
export default userSlice.reducer;
