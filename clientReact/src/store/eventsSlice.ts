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
    return response.data.data;
  }
);
interface EventsState {
  events: [];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};
const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(filteredEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(filteredEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events;
        state.error = null;
      })
      .addCase(filteredEvents.rejected, (state, action) => {
        state.loading = false;
        state.events = [];
        state.error = action.error.message ?? null;
      });
  },
});
export default eventsSlice.reducer;
