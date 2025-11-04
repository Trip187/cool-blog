import { useCallback, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { signInWithGooglePopup } from "../../utils/firebase.utils";

import { getLongDate } from "../../utils/datetime.utils";

import { setCurrentUser } from "../../store/user/user.action";

import { selectCurrentUser } from "../../store/user/user.selector";

import NewComment from "./new-comment.component";

import classes from "./comments.styles.module.css";

const Comments = ({ comments, postId }) => {
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    setCommentsList(comments);
  }, [comments]);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const signInWithGoogle = useCallback(async () => {
    const response = await signInWithGooglePopup();
    dispatch(setCurrentUser(response.user));
  }, []);

  const updateComments = (NewComment) => {
    setCommentsList(NewComment);
  };
  return (
    <div>
      <hr />
      {!currentUser && (
        <div className={classes["sign-in-wrapper"]}>
          <span className={classes["lnk-sign-in"]} onClick={signInWithGoogle}>
            Sign In <br />
          </span>
          <span> To Post Your Comment</span>
        </div>
      )}
      {currentUser && (
        <NewComment
          postId={postId}
          userDisplayName={currentUser.displayName}
          updateComments={updateComments}
        />
      )}
      {commentsList &&
        commentsList
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((c) => (
            <div key={c.createdAt}>
              <div className={classes["comment-wrapper"]}>
                <div className={classes["user"]}>{c.user}</div>
                <div>{c.comment}</div>
                <div className={["comment-date"]}>
                  {getLongDate(c.createdAt)}
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};
export default Comments;
