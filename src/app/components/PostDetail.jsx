import React, { useEffect, useState } from "react";
import { CgProfile, CgMail, CgPen, CgTrash } from "react-icons/cg";
import { useDispatch } from 'react-redux';
import { updatePost, removePost } from '../GlobalRedux/Features/Posts/postsSlice.jsx';

export default function PostDetail({ id, title, content }) {
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();


  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [id]);

  return (
    <>
      <div className="w-auto rounded-lg overflow-hidden bg-white p-4 mb-4">
        {/* Title */}
        <h2 className="text-3xl font-semibold mb-2 truncate">{title}</h2>

        {/* Content */}
        <p className="text-xl">{content}</p>
        <div className="flex mt-1">
          <button
            className="flex items-center  font-medium text-sm  mr-2"
            onClick={() =>
              dispatch(
                updatePost({ id, title: "New Title", content: "New Content" })
              )
            }
          >
            <CgPen className="mr-2 bg-green-200 p-2 rounded-lg" size={36} />
            Update
          </button>

          <button
            className="flex items-center  text-sm font-medium"
            onClick={() => dispatch(removePost({ id }))}
          >
            <CgTrash className="mr-2 bg-red-200 p-2 rounded-lg" size={36} />
            Remove
          </button>
        </div>
      </div>
      {/* Comments */}
      <h3 className="w-auto text-center rounded-lg overflow-hidden bg-white p-4 mb-4">
        Comments:
      </h3>
      {comments.map((comment) => (
        <div
          className="w-auto rounded-lg overflow-hidden bg-white p-4 mb-4"
          key={comment.id}
        >
          <p className="flex items-center w-auto rounded-lg overflow-hidden bg-white">
            <CgProfile className="mr-2" size={24} />
            {comment.name}
          </p>
          <p className="flex items-center w-auto rounded-lg overflow-hidden bg-white">
            <CgMail className="mr-2" size={24} />
            {comment.email}
          </p>
          <p className="w-auto rounded-lg overflow-hidden bg-white">
            Comment: {comment.body}
          </p>
        </div>
      ))}
    </>
  );
}
