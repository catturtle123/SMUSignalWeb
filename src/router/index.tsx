import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/main/Mainpage";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import SettingPage from "../pages/setting/SettingPage";

// 쿠키에서 토큰 읽는 함수
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

function AppRouter() {
  const token = getCookie("authToken");

  return (
    <BrowserRouter>
      <Routes>
        {/* 루트 접근 시 로그인 여부에 따라 리다이렉션 */}
        <Route path="/" element={<Navigate to={token ? "/main" : "/login"} />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/settings" element={<SettingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
