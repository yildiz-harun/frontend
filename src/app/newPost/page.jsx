"use client";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addPost } from "../GlobalRedux/Features/Posts/postsSlice.jsx";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link.js";
import {CgArrowLeftO} from "react-icons/cg";

export default function NewPost() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const confirmSubmit = () => {
    handleSubmit();
    setModalOpen(false);
  };

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
      dispatch(addPost({ ...data }));
      setTitle("");
      setContent("");
    }
  };

  return (
    <>
      <Link
        className="bg-gray-500 block w-fit  text-white rounded-full p-2"
        href={"/posts"}
      >
        <CgArrowLeftO size={24}/>
      </Link>
      {isModalOpen && (
        <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className=" bg-white p-4 rounded flex flex-col items-center">
            <p className="mb-4">Proceed with Creating the Post?</p>
            <div>
              <Link
                href={"/posts"}
                onClick={confirmSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded text-sm"
              >
                Yes
              </Link>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded ml-4 text-sm"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto mt-4">
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
            onClick={() => setModalOpen(true)}
            className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
