import { Fragment, useState, useEffect } from "react";
import { getFeaturedPosts } from "../utils/firebase.utils";
import { PostsGrid } from "../components/post/post-grid.component";

const HomePage = () => {
  const [posts, setPosts] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFeaturedPosts()
      .then((data) => {
        if (!data || data === 0) {
          setError("Error fetching Data");
        } else {
          setPosts(data);
        }
      })
      .catch((error) => setError(error.message))
      .finally(setIsPending(false));
  }, []);
  return (
    <Fragment>
      <h1>Featured Posts</h1>
      {isPending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {posts && <PostsGrid posts={posts} />}
    </Fragment>
  );
};
export default HomePage;
