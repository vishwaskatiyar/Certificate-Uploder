import { configureStore } from "@reduxjs/toolkit";
import certificationReducer from "./certificationSlice";

export const store = configureStore({
  reducer: {
    certification: certificationReducer,
  },
});

// Types for Redux state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
