import React, { useEffect, useState } from "react";
import Link from "next/link.js";
import { CgProfile, CgMail, CgPen, CgTrash } from "react-icons/cg";
import {CgArrowLeftO} from "react-icons/cg";
import { useDispatch } from "react-redux";
import {
  updatePost,
  removePost,
} from "../GlobalRedux/Features/Posts/postsSlice.jsx";

export default function PostDetail({
  id,
  title: initialTitle,
  content: initialContent,
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(initialTitle);
  const [newContent, setNewContent] = useState(initialContent);
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then((response) => response.json())
        .then((data) => setComments(data));
    } catch (error) {}
    setNewTitle(initialTitle);
    setNewContent(initialContent);
    console.log(newTitle, id, newContent);
  }, [id, initialTitle, initialContent]);

  const handleUpdate = async () => {
    const updatedData = {
      id: id,
      title: newTitle,
      body: newContent,
      userId: 1,
    };
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    dispatch(updatePost({ id: id, title: newTitle, body: newContent }));

    setModalOpen(false);
  };

  const handleDelete = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    dispatch(removePost({ id }));
    setDeleteModalOpen(false);
  };

  return (
    <>
    <Link
        className="bg-gray-500 block w-fit mb-6 text-white rounded-full p-2"
        href={"/posts"}
      >
        <CgArrowLeftO size={24}/>
      </Link>
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg flex flex-col ">
            <h2 className="text-2xl mb-4">Are you sure you want to delete?</h2>
            <div className="flex  m-auto">
              <Link
                href={"/posts"}
                className="bg-red-500 text-white p-2 rounded mr-2"
                onClick={handleDelete}
              >
                Accept
              </Link>
              <button
                className="bg-gray-500 text-white p-2 rounded "
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl mb-4">Update Post</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Title"
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-2 h-32 mb-4 border rounded"
              placeholder="Content"
            ></textarea>
            <button
              className="bg-green-500 text-white p-2 rounded"
              onClick={handleUpdate}
            >
              Submit
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded ml-4"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="w-auto rounded-lg overflow-hidden bg-white p-4 mb-4">
        {/* Title */}
        <h2 className="text-3xl font-semibold mb-2">{newTitle}</h2>

        {/* Content */}
        <p className="text-xl">{newContent}</p>
        <div className="flex mt-1">
          <button
            className="flex items-center  font-medium text-sm  mr-2"
            // onClick={() => {
            //   console.log("Dispatching updatePost", {
            //     id,
            //     title: "New Title",
            //     content: "New Content",
            //   });
            //   dispatch(
            //     updatePost({
            //       id: Number(id),
            //       title: "New Title",
            //       body: "New Content",
            //     })
            //   );
            // }}
            onClick={() => setModalOpen(true)}
          >
            <CgPen
              className="mr-2 bg-green-500 text-white p-2 rounded-lg"
              size={36}
            />
            Update
          </button>

          <button
            className="flex items-center  text-sm font-medium"
            onClick={() => setDeleteModalOpen(true)}
          >
            <CgTrash
              className="mr-2 bg-red-500  text-white p-2 rounded-lg"
              size={36}
            />
            Delete
          </button>
        </div>
      </div>
      {/* Comments */}
      <h3 className="w-auto text-center rounded-lg overflow-hidden bg-white p-4 mb-4">
        Comments:
      </h3>
      {comments.map((comment) => (
        <div key={comment.id} className="shadow px-4 py-1 mb-4">
          <div className="flex flex-col mb-2">
            <p className=" mb-1 rounded-lg w-fit flex items-center text-xs">
              <CgProfile
                className="mr-2 p-1 rounded-lg bg-blue-500 text-white"
                size={36}
              />
              {comment.name}
            </p>
            <p className="rounded-lg w-fit flex items-center text-xs">
              <CgMail
                className="mr-2 p-1 rounded-lg bg-blue-500 text-white"
                size={36}
              />
              {comment.email}
            </p>
          </div>
          <div className="w-auto rounded-lg overflow-hidden bg-white p-4 mb-4">
            <p className="w-auto rounded-lg overflow-hidden bg-white">
              {comment.body}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
