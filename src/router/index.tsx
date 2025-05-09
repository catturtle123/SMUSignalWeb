import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/landing/landing"; // 종료 안내 페이지 import

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 종료 안내 페이지 */}
        <Route path="/landing" element={<LandingPage />} />

        {/* 나머지 모든 경로는 /landing으로 강제 이동 */}
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;