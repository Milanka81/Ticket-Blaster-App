import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import eventsReducer from "./eventsSlice"
import dropdownReducer from "./dropdownSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: { user: userReducer, dropdown: dropdownReducer, events: eventsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
