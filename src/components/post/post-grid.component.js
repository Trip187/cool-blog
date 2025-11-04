import PostCard from "./post-card.component";
import classes from "./post-grid.styles.module.css";

export const PostsGrid = ({ posts, isBookmark }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((p) => (
        <PostCard key={p.id} posts={p} isBookmark={isBookmark} />
      ))}
    </ul>
  );
};

export default PostsGrid;
