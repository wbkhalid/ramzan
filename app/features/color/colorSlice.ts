"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for allowed colors
export type ColorType =
  | "green"
  | "blue"
  | "purple"
  | "gray"
  | "bronze"
  | "orange"
  | "iris"
  | "red"
  | "yellow"
  | "violet"
  | "gold"
  | "teal"
  | "brown"
  | "amber"
  | "tomato"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "indigo"
  | "cyan"
  | "jade"
  | "grass"
  | "lime"
  | "mint"
  | "sky";

const initialState: { currentColor: ColorType } = {
  currentColor: "cyan", // Default color
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<ColorType>) => {
      state.currentColor = action.payload;
    },
  },
});

export const { setColor } = colorSlice.actions;
export default colorSlice.reducer;
