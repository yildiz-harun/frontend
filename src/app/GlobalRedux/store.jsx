"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postsReducer from "./Features/Posts/postsSlice";

const rootReducer = combineReducers({
  posts: postsReducer,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});
