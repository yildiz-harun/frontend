import React, { useEffect, useState } from "react";
import { CgProfile, CgMail } from "react-icons/cg";

export default function PostDetail({ id, title, content }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [id]);

  return (
    <>
      <div className="w-auto rounded-lg overflow-hidden bg-white p-4 mb-4">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2 truncate">{title}</h2>

        {/* Content */}
        <p>{content}</p>
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
          <p className="flex items-center w-auto rounded-lg overflow-hidden bg-white ">
            <CgMail className="mr-2" size={24} />
            {comment.email}
          </p>
          <p className="w-auto rounded-lg overflow-hidden bg-white ">
            Comment: {comment.body}
          </p>
        </div>
      ))}
    </>
  );
}
