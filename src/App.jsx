import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
/* ====================================================== */
const HomePage = lazy(() => import("./pages/HomePage"));
const UploadPage = lazy(() => import("./pages/UploadPage"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            {/* <span className="loadingSpin"></span> */}
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
