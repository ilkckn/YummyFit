import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ORIGIN_URL } from "../config";

export const CommentContext = createContext();

function CommentContextProvider({ children }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${ORIGIN_URL}/comments/recipe/${id}`, {
        withCredentials: true,
      });
      setComments(res.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch comments. Please try again.");
    }
  };

  const addComment = async (newComment) => {
    try {
      const res = await axios.post(
        `${ORIGIN_URL}/comments/recipe/${id}`,
        newComment,
        {
          withCredentials: true,
        }
      );
      setComments((prevComments) => [...prevComments, res.data]);
      setError(null);
    } catch (error) {
      setError("Failed to add comment. Please try again.");
    }
  };

  return (
    <div>
      <CommentContext.Provider
        value={{
          fetchComments,
          addComment,
          id,
          comments,
          setComments,
          error,
          setError,
          navigate,
        }}
      >
        {children}
      </CommentContext.Provider>
    </div>
  );
}

export default CommentContextProvider;
