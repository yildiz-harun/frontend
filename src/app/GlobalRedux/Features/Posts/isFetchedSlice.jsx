// isFetchedSlice.js
import { createSlice } from "@reduxjs/toolkit";

const isFetchedSlice = createSlice({
  name: "isFetched",
  initialState: false,
  reducers: {
    setFetched: (state) => {
      return true;
    },
  },
});

export const { setFetched } = isFetchedSlice.actions;
export default isFetchedSlice.reducer;
