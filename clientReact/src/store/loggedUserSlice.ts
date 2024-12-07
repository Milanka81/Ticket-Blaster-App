import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isLoggedIn } from "../services/authService";
import { getMyAccount } from "../services/userService";

export const checkAuth = createAsyncThunk("checkAuth", () =>
  isLoggedIn().then((res) => res.data.loggedIn)
);
export const fetchMyAccount = createAsyncThunk("fetchMyAccount", () =>
  getMyAccount().then((res) => res.data.user)
);
interface UserState {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  avatarImage: string;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  _id: "",
  fullName: "",
  email: "",
  role: "user",
  avatarImage: "",
  isLoggedIn: false,
  loading: false,
  error: null,
};

const loggedUserSlice = createSlice({
  name: "loggedUser",
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
      })
      .addCase(fetchMyAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyAccount.fulfilled, (state, action) => {
        state.loading = false;
        state._id = action.payload._id;
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(fetchMyAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { updateName, setLogin, setLogout, updateStatus, saveUserRole } =
  loggedUserSlice.actions;
export default loggedUserSlice.reducer;
