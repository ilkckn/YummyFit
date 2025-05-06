import React, {useContext} from 'react';
import { CommentContext } from '../context/commentContext.jsx';

function Comments() {
    const {id, comments, setComments, error, setError, addComment, fetchComments} = useContext(CommentContext);
    
  return (
    <div>
      
    </div>
  )
}

export default Comments