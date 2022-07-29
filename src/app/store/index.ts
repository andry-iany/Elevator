import { configureStore } from "@reduxjs/toolkit";
import elevator from "../../features/elevator/slice";

const store = configureStore({
  reducer: {
    elevator,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
