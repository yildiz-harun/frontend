"use client"
import { useEffect, useState } from "react";
import PostDetail from "@/app/components/PostDetail";

export default function Post({params}) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    if (params.id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }
  }, [params.id]);

  if (!post) return <div>Loading...</div>;

  return <PostDetail id={params.id} title={post.title} content={post.body} />;
}
