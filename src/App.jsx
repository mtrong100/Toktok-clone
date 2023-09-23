import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import ProfileLayout from "./components/layouts/ProfileLayout";
/* ====================================================== */
const HomePage = lazy(() => import("./pages/HomePage"));
const UploadPage = lazy(() => import("./pages/UploadPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SavePostPage = lazy(() => import("./pages/SavePostPage"));
const LikePostPage = lazy(() => import("./pages/LikePostPage"));
const PostDetailPage = lazy(() => import("./pages/PostDetailPage"));
const FollowingPage = lazy(() => import("./pages/FollowingPage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
/* ====================================================== */

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <span className="loadingSpin"></span>
          </div>
        }
      >
        <Routes>
          <Route path="/upload" element={<UploadPage />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/following" element={<FollowingPage />} />
          </Route>

          <Route element={<ProfileLayout />}>
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/:slug" element={<ProfilePage />}>
              <Route path="saves" element={<SavePostPage />} />
              <Route path="favorites" element={<LikePostPage />} />
            </Route>
          </Route>

          <Route path="/video/:id" element={<PostDetailPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
