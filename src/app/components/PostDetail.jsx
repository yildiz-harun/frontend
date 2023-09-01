import React, { useEffect, useState } from "react";

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
      <h3 className="w-auto text-center rounded-lg overflow-hidden bg-white p-4 mb-4">Comments:</h3>
      {comments.map((comment) => (
        <div
          className="w-auto rounded-lg overflow-hidden bg-white p-4 mb-4"
          key={comment.id}
        >
          <p className="w-auto rounded-lg overflow-hidden bg-white ">Name: {comment.name}</p>
          <p className="w-auto rounded-lg overflow-hidden bg-white ">E-mail: {comment.email}</p>
          <p className="w-auto rounded-lg overflow-hidden bg-white ">{comment.body}</p>
        </div>
      ))}
    </>
  );
}
