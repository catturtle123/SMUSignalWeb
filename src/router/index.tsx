import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/main/Mainpage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        {/* 다른 페이지도 나중에 여기 추가 */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
