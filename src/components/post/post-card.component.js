import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectBookmarkItems } from "../../store/bookmark/bookmark.selector";
import { removeItemFromBookmark } from "../../store/bookmark/bookmark.action";
import { getShortDate } from "../../utils/datetime.utils";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import classes from "./post-card.styles.module.css";

const PostCard = ({ posts, isBookmark }) => {
  const dispatch = useDispatch();
  const { id, data } = posts;
  const { title, image, excerpt, date } = data;
  const imagePath = `/images/posts/${id}/${image}`;
  const linkPath = `/posts/${id}`;

  const bookmarkItems = useSelector(selectBookmarkItems);
  const onClickRemoveItemHandler = () => {
    dispatch(removeItemFromBookmark(bookmarkItems, posts));
  };

  return (
    <li className={classes.post}>
      {isBookmark && (
        <TrashIcon
          className={classes["remove-bookmark"]}
          onClick={onClickRemoveItemHandler}
        />
      )}
      <Link to={linkPath}>
        <div className={classes.image}>
          <img src={imagePath} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{getShortDate(date)}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostCard;
