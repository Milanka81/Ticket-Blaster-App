import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllEvents } from "../services/eventService";

interface EventsFilter {
  page: number;
  limit: number;
  input: string;
  category: string;
}

export const filteredEvents = createAsyncThunk(
  "filteredEvents",
  async ({ page, limit, input, category }: EventsFilter) => {
    const response = await getAllEvents(page, limit, input, category);
    return response.data;
  }
);
interface EventsState {
  events: [];
  results: number;
  loading: boolean;
  error: string | null;
  input: string;
}

const initialState: EventsState = {
  events: [],
  results: 0,
  loading: false,
  error: null,
  input: "",
};
const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setInput(state, action) {
      state.input = action.payload;
    },
    clearInput(state) {
      state.input = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filteredEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(filteredEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.data.events;
        state.results = action.payload.results;
        state.error = null;
      })
      .addCase(filteredEvents.rejected, (state, action) => {
        state.loading = false;
        state.events = [];
        state.error = action.error.message ?? null;
      });
  },
});
export const { setInput, clearInput } = eventsSlice.actions;
export default eventsSlice.reducer;
