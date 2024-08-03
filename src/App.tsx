import { Route, Routes, Navigate } from "react-router-dom";

import IndexPage from "@/pages/index";
import GamePage from "@/pages/viewWord";
import PlayPage from "@/pages/timer";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<GamePage />} path="/game" />
      <Route element={<PlayPage />} path="/game/play" />
      <Route element={<Navigate to="/" />} path="*" />
    </Routes>
  );
}

export default App;
