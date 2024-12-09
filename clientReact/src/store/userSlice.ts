import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../services/userService";

export const fetchUser = createAsyncThunk("fetchUser", (id: string) =>
  getUser(id).then((res) => res.data.data.user)
);
interface UserState {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  avatarImage: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  _id: "",
  fullName: "",
  email: "",
  role: "user",
  avatarImage: "",
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state._id = action.payload._id;
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default userSlice.reducer;
