import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    isUpdate: false,
    commentData: {},
  },
  reducers: {
    setIsUpdate: (state, action) => {
      state.isUpdate = action.payload;
    },
    storeCommentData: (state, action) => {
      state.commentData = action.payload;
    },
  },
});

export const { setIsUpdate, storeCommentData } = postSlice.actions;
export default postSlice.reducer;
