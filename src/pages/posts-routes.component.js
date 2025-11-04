import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const PostPage = lazy(() => import("./post-page.component"));
const PostDetailPage = lazy(() => import("./post-detail-page.component"));

const PostsRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index element={<PostPage />} />
        <Route path=":slug" element={<PostDetailPage />}></Route>
      </Routes>
    </Suspense>
  );
};
export default PostsRoutes;
