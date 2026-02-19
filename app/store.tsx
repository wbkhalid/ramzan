"use client";
import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "./features/color/colorSlice";
import modeReducer from "./features/mode/modeSlice";

export const store = configureStore({
  reducer: {
    color: colorReducer,
    mode: modeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
