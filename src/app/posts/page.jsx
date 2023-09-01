"use client";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialPosts } from "../GlobalRedux/Features/Posts/postsSlice";
import { setFetched } from "../GlobalRedux/Features/Posts/isFetchedSlice";
import Link from "next/link";
import PostCard from "../components/PostCard";

export default function Posts() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const isFetched = useSelector((state) => state.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchInitialPosts());
      dispatch(setFetched());
    }
    console.log(posts);
  }, [dispatch]);

  return (
    <>
      <Link className="bg-green-500 block w-fit mb-6  text-white rounded-lg p-2" href={"/newPost"}>Create new post</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full bg-white ">
        {posts
          .filter((post) => post.userId === 1)
          .map((post, index, array) => (
            <PostCard
              className={`${
                index === array.length - 1 ? "justify-self-start" : ""
              }`}
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.body}
            />
          ))}
      </div>
    </>
  );
}
