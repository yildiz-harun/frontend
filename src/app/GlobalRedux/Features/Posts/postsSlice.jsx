import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch posts with userId: 1
export const fetchInitialPosts = createAsyncThunk(
  "posts/fetchInitial",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const allPosts = await response.json();
    return allPosts.filter((post) => post.userId === 1);
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
      const idToRemove = Number(action.payload.id); // Convert to Number
      return state.filter((post) => Number(post.id) !== idToRemove); // Convert post.id to Number
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
