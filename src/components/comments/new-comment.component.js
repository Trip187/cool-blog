import { useState, useRef } from "react";
import { addCommentToPost } from "../../utils/firebase.utils";
import classes from "./new-comment.styles.module.css";

const NewComment = ({ postId, userDisplayName, updateComments }) => {
  const [isPending, setIsPending] = useState(false);
  const commentRef = useRef();

  const postCommentHandler = async () => {
    const newComment = commentRef.current.value.trim();
    if (newComment.length === 0) {
      return;
    }
    setIsPending(true);
    const res = await addCommentToPost(newComment, userDisplayName, postId);

    if (res) {
      commentRef.current.value = "";
      updateComments();
    } else {
      alert("posting comment failed");
    }
    setIsPending(false);
  };

  return (
    <div>
      <textarea
        placeholder=" write a comment"
        rows="2"
        ref={commentRef}
        className={classes["message-box"]}
      />

      <div className={classes["btn-container"]}>
        <button onClick={postCommentHandler} disabled={isPending}>
          Post it
        </button>
      </div>
    </div>
  );
};
export default NewComment;
