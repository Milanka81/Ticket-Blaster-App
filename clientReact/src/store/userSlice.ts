import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isLoggedIn } from "../services/authService";

export const checkAuth = createAsyncThunk("checkAuth", () =>
  isLoggedIn().then((res) => res.data.loggedIn)
);

interface UserState {
  fullName: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  fullName: "",
  email: "",
  role: "user",
  isLoggedIn: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.fullName = action.payload;
    },
    setLogin(state) {
      state.isLoggedIn = true;
    },
    setLogout(state) {
      state.isLoggedIn = false;
    },
    updateStatus(state, action) {
      state.isLoggedIn = action.payload;
    },
    saveUserRole(state, action) {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = action.payload;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { updateName, setLogin, setLogout, updateStatus, saveUserRole } =
  userSlice.actions;
export default userSlice.reducer;
