"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialPosts } from "../GlobalRedux/Features/Posts/postsSlice";
import PostCard from "../components/PostCard";

export default function Posts() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialPosts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full bg-white place-items-center">
      {posts
        .filter((post) => post.userId === 1)
        .map((post, index, array) => (
          <PostCard
            className={`${
              index === array.length - 1 ? "justify-self-start" : ""
            }`}
            key={post.id}
            title={post.title}
            content={post.body}
          />
        ))}
    </div>
  );
}
