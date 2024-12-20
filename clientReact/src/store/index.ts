import { configureStore } from "@reduxjs/toolkit";
import loggedUserReducer from "./loggedUserSlice";
import userReducer from "./userSlice";
import usersReducer from "./usersSlice";
import eventsReducer from "./eventsSlice";
import dropdownReducer from "./dropdownSlice";
import ecommerceReducer from "./ecommerceSlice";
import modalReducer from "./modalSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    loggedUser: loggedUserReducer,
    user: userReducer,
    users: usersReducer,
    dropdown: dropdownReducer,
    modal: modalReducer,
    events: eventsReducer,
    shoppingCart: ecommerceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
