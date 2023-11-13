import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "../slice/index";

const store = configureStore({
  reducer: {
    todos: loggedReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
