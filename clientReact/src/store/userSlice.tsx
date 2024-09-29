import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isLoggedIn } from "../services/authService";

const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  return isLoggedIn().then((res) => res.data.loggedIn);
});

const initialState = {
  fullName: "",
  isLoggedIn: false,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoggedIn = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
