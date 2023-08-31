import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch posts with userId: 1
export const fetchInitialPosts = createAsyncThunk(
  "posts/fetchInitial",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await response.json();
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    removePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload.id);
    },
    updatePost: (state, action) => {
      const index = state.findIndex((post) => post.id === action.payload.id);
      if (index >= 0) {
        state[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialPosts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default postsSlice.reducer;
export const { addPost, removePost, updatePost } = postsSlice.actions;
