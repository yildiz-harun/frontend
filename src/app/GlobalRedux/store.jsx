"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postsReducer from "./Features/Posts/postsSlice";
import isFetchedReducer from "./Features/Posts/isFetchedSlice"; 


const rootReducer = combineReducers({
  posts: postsReducer,
  isFetched: isFetchedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
