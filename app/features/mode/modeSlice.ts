"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for allowed modes
export type ModeType = "light" | "dark";

// Define initial state with the correct type
const initialState: { currentMode: ModeType } = {
  currentMode: "light", // Default mode
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<ModeType>) => {
      state.currentMode = action.payload;
    },
  },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
