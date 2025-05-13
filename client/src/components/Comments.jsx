import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../context/commentContext.jsx";
import { AuthContext } from "../context/authContext.jsx";
import AddCommentForm from "./AddCommentForm.jsx";
import UpdateCommentForm from "./UpdateComments.jsx";

function Comments() {
  const { comments, fetchComments, error } = useContext(CommentContext);
  console.log("comments", comments);
  const { user, sessionCheckNeeded } = useContext(AuthContext);
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const handleEdit = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  return (
    <div className="w-[70%] flex flex-col justify-center items-center gap-2">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      {error && <p className="text-red-500">{error}</p>}
      {comments.map((comment) =>
        editingCommentId === comment._id ? (
          <UpdateCommentForm
            key={comment._id}
            comment={comment}
            onCancel={handleCancelEdit}
          />
        ) : (
          <div
            key={comment._id}
            className="w-full bg-white p-5 px-8 rounded-lg shadow-md mb-1"
          >
            <figure className="flex items-center gap-2 mb-2">
              <img
                src={comment.userId?.image}
                alt={comment.userId?.username || "User"}
                className="w-[3rem] h-[3rem] rounded-full object-cover"
              />
            </figure>
            <p>
              <strong>{comment.userId?.username}:</strong> {comment.text}
            </p>
            <div className="flex justify-end gap-2 mt-2">
              {/* {sessionCheckNeeded &&
                (comment.userId?._id === user._id ||
                  comment.userId === user._id) && (
                  <button
                    onClick={() => handleEdit(comment._id)}
                    className="px-6 py-1.5 bg-[#FFC649] text-white rounded-md hover:bg-[#e5b53d] cursor-pointer"
                  >
                    Edit
                  </button>
                )} */}
              {user &&
                (comment.userId?._id === user._id ||
                  comment.userId === user._id ||
                  comment.userId === user.id) && (
                  <button
                    onClick={() => handleEdit(comment._id)}
                    className="px-6 py-1.5 bg-[#FFC649] text-white rounded-md hover:bg-[#e5b53d] cursor-pointer"
                  >
                    Edit
                  </button>
                )}
            </div>
          </div>
        )
      )}
      <AddCommentForm />
    </div>
  );
}

export default Comments;
