import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const IndexPage = lazy(() => import("@/pages/index"));
const GamePage = lazy(() => import("@/pages/viewWord"));
const PlayPage = lazy(() => import("@/pages/timer"));
import LoadingPage from "./components/LoadingPage";

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<GamePage />} path="/game" />
        <Route element={<PlayPage />} path="/game/play" />
        <Route element={<Navigate to="/" />} path="*" />
      </Routes>
    </Suspense>
  );
}

export default App;
