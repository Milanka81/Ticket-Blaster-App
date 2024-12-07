import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../services/userService";
export const fetchUsers = createAsyncThunk("fetchUsers", () =>
  getAllUsers().then((res) => res.data)
);
interface UsersState {
  users: [];
  results: number;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  results: 0,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedUsers = action.payload.users;
        state.results = action.payload.results;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.loggedUsers = [];
        state.error = action.error.message ?? null;
      });
  },
});

export default usersSlice.reducer;
