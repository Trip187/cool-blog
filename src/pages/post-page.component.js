/*
import classes from "./post-page.style.module.css";
const PostPages = (props) => {
  return (
    <div>
      {props.posts.map((post) => (
        <h1 key={post.slug} className={classes["heading-ele"]}>
          {post.title}
        </h1>
      ))}
    </div>
  );
};
export default PostPages;
//using fragment to return elements without adding extra nodes

mport { Fragment } from "react";

 

const PostsPage = (props) => {

  return (

    <Fragment>

      {props.posts.map(post => <h1 key={post.slug}>{post.title}</h1>)}

    </Fragment>
    );

}

 

export default PostsPage;

Example 2:

import { Fragment } from "react";

 

const Heading = () => {

  return (

    <Fragment>

      <h1>Welcome to my React app!</h1>

      <p>Learning React is easy. Just follow me!</p>

    </Fragment>

  );

}

 

export default Heading;
*/

// Route and Link
import { useState, useEffect, Fragment } from "react";
import classes from "./post-page.style.module.css";
//import { useFetch } from "../hooks/useFetch";
import { getAllPosts } from "../utils/firebase.utils";
import { PostsGrid } from "../components/post/post-grid.component";
//import { data } from "react-router-dom";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [err, setErr] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchString, setSearchString] = useState("");

  /*  const url = "/posts.json";
  const { data: postsData, isPending, error } = useFetch(url); */

  const onSearchChangeHandler = (event) => {
    const newSearchString = event.target.value.toLocaleLowerCase();
    setSearchString(newSearchString);
  };

  useEffect(() => {
    /* if (!postsData) {
      return;
    }
    fetch("/posts.json") //later chapters
      .then((response) => response.json())
      .then((data) => setPosts(data));
    const newFilteredPosts = postsData.filter((post) => {
      return post.title.toLocaleLowerCase().includes(searchString);
    });
    /* useEffect(() => {
    const newFilteredPosts = posts.filter((post) => {
      return post.title.toLocaleLowerCase().includes(searchString);
    });
    setFilteredPosts(newFilteredPosts);*/
    getAllPosts()
      .then((data) => {
        if (!data || data.length === 0) {
          setErr("Loading data Failed");
        } else {
          setPosts(data);
        }
      })
      .catch((err) => setErr(err.message))
      .finally(() => setIsPending(false));
  }, []);
  useEffect(() => {
    const newFilteredPosts = posts.filter((posts) => {
      return posts.data.title.toLocaleLowerCase().includes(searchString);
    });
    setFilteredPosts(newFilteredPosts);
  }, [searchString, posts]);
  console.log("All posts fetched:", posts);
  console.log("Filtered posts:", filteredPosts);

  return (
    <Fragment>
      <h1>
        <span>All Posts</span>
        <input
          className={classes["filter-box"]}
          type="search"
          onChange={onSearchChangeHandler}
          placeholder="filter by title"
        />
      </h1>
      {isPending && <p>Loading...</p>}
      {err && <p>{err}</p>}
      {posts && <PostsGrid posts={filteredPosts} />}
    </Fragment>
  );
};
export default PostPage;
