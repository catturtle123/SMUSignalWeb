import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/main/Mainpage";
import Login from "../components/Login";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
