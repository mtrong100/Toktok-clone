import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import { useSelector } from "react-redux";
import ProfileLayout from "./components/layouts/ProfileLayout";
/* ====================================================== */
const HomePage = lazy(() => import("./pages/HomePage"));
const UploadPage = lazy(() => import("./pages/UploadPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function App() {
  const { currentUser } = useSelector((state) => state.user);

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
          </Route>

          <Route element={<ProfileLayout />}>
            <Route path=":slug" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
