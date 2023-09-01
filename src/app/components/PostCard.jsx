import Link from "next/link";
import React from "react";

function truncateContent(content, limit) {
  const words = content.split(" ");
  const truncated =
    words.length > limit ? words.slice(0, limit).join(" ") + "..." : content;
  return truncated;
}

export default function PostCard({ id, title, content }) {
  return (
    <Link href={`/post/${id}`}>
      <div className="w-auto rounded-lg overflow-hidden bg-white mx-4 my-4 p-4 max-w-sm">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2 truncate">{title}</h2>

        {/* Content */}
        <p>{truncateContent(content, 12)}</p>
      </div>
    </Link>
  );
}
