"use client";

import { useState } from "react";

type Comment = {
  id: number;
  text: string;
  createdAt: string;
};

export default function CommentBox() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  function submitComment() {
    if (!comment.trim()) return;

    setComments((prev) => [
      {
        id: Date.now(),
        text: comment,
        createdAt: new Date().toLocaleString(),
      },
      ...prev,
    ]);

    setComment("");
  }

  return (
    <div className="comment-box">
      <h4>ความคิดเห็นสินค้า</h4>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="พิมพ์ความคิดเห็นเกี่ยวกับสินค้า..."
      />

      <button onClick={submitComment}>
        ส่งความคิดเห็น
      </button>

      {comments.length === 0 && (
        <p className="no-comment">ยังไม่มีความคิดเห็น</p>
      )}

      <ul className="comment-list">
        {comments.map((c) => (
          <li key={c.id}>
            <p>{c.text}</p>
            <span>{c.createdAt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}