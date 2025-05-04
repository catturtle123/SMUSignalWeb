import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/main/Mainpage";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import SettingPage from "../pages/setting/SettingPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/settings" element={<SettingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
