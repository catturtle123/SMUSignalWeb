import React from "react";
import { useNavigate } from "react-router-dom";
import backBtn from "../../assets/backbtn.svg";
import arrow from "../../assets/arrow.svg";
import axios from "axios";

const SettingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      // 쿠키에서 토큰 가져오기
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
      console.log("token", token);

      if (!token) {
        alert("토큰이 존재하지 않습니다.");
        return;
      }

      // 사용자 확인
      const confirmDelete = window.confirm(
        "회원탈퇴를 진행 하시겠습니까?"
      );
      if (!confirmDelete) {
        return; // 사용자가 취소를 선택한 경우 함수 종료
      }

      // API 호출
      await axios.patch(
        "https://smuumc.kro.kr/user/signOut",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("성공적으로 탈퇴처리 되었습니다.");
      navigate("/login"); // 회원탈퇴 후 로그인 페이지로 이동
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴에 실패했습니다.");
    }
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
      
      <div className="w-[327px] h-[180px] flex flex-col justify-between border border-[#F3F5F6] rounded-[32px] p-4">
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
        <div
          className="flex justify-between items-center py-3 cursor-pointer"
          onClick={handleDeleteUser}
        >
          <span className="text-base font-bold text-[red]">
            회원 탈퇴
          </span>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
