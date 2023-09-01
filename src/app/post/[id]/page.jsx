"use client"
import { useEffect, useState } from "react";
import PostDetail from "@/app/components/PostDetail";
import { useSelector } from 'react-redux';

export default function Post({params}) {
  const post = useSelector(state => 
    state.posts.find(post => post.id == params.id)
  );

  if (!post) return <div>Loading...</div>;

  return <PostDetail id={params.id} title={post.title} content={post.body} />;
}
