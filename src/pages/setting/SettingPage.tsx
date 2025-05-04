import React from "react";
import { useNavigate } from "react-router-dom";
import backBtn from "../../assets/backbtn.svg";
import arrow from "../../assets/arrow.svg";

const SettingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 처리 (쿠키 삭제 등)
    document.cookie = "authToken=; path=/; max-age=0;";
    alert("로그아웃 되었습니다.");
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <div className="w-full flex flex-col gap-[20px] max-w-md mx-auto p-4 mt-4">
      {/* 뒤로가기 버튼 */}
      <div className="flex items-center w-[327px] h-[26px]">
        <img
          src={backBtn}
          alt="뒤로가기"
          className="w-5 h-5 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      {/* 설정 메뉴 */}
      <div className="w-[327px] h-[145px] flex flex-col justify-between border border-[#F3F5F6] rounded-[32px] p-4">
        <div
          className="flex justify-between items-center py-3 cursor-pointer"
          onClick={() =>
            window.open(
              "https://makeus-challenge.notion.site/UMCignal-1bcb57f4596b803785d1c1870fd58088?pvs=4",
              "_blank"
            )
          }
        >
          <span className="text-base font-bold">이용약관</span>
          <img src={arrow} alt="이동하기" className="w-4 h-4" />
        </div>
        <div
          className="flex justify-between items-center py-3 cursor-pointer"
          onClick={() =>
            window.open(
              "https://makeus-challenge.notion.site/UMCignal-1bcb57f4596b8006b1a3c4cdf165d5e1"
            )
          }
        >
          <span className="text-base font-bold">
            개인정보처리방침
          </span>
          <img src={arrow} alt="이동하기" className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
