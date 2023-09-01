"use client";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addPost } from "../GlobalRedux/Features/Posts/postsSlice.jsx";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const uid = uuidv4(); // Generate a uid
    const data = {
      title: title,
      body: content,
      userId: 1,
      id: uid,
    };
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      data
    );

    if (response.status === 201) {
      alert("Post created successfully");
      dispatch(addPost({ ...data }));
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Create a New Post</h1>
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:border-blue-500"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 h-40 mb-4 border rounded-md focus:border-blue-500"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
