import { createAction, createSlice } from "@reduxjs/toolkit";
export const imageSlice = createSlice({
  name: "image",
  initialState: {
    images: [],
  },
  reducers: {
    // open add modal
    AddImage: (state, action) => {
      state.images = action.payload;
    },
    resetImageState: (state, action) => {
      state.images = [];
    },
  },
});


export const { AddImage, resetImageState } = imageSlice.actions;

export default imageSlice.reducer;
