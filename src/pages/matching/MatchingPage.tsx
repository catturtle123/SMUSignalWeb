// pages/matching/MatchingPage.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import umung1 from "../../assets/umung1.gif";
import umung2 from "../../assets/umung3.gif";
import kakao from "../../assets/umung2.gif";

type MatchingStatus = "loading" | "success" | "error";

const MatchingPage: React.FC = () => {
  const location = useLocation();
  const instaId = location.state?.instaId;
  const [status, setStatus] = useState<MatchingStatus>("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!instaId) {
        setStatus("error");
      } else {
        setStatus("success");

        // 3초 후 인스타그램 페이지로 현재 탭에서 이동 (히스토리에 안 남김)
        setTimeout(() => {
          window.location.replace(`https://instagram.com/${instaId}`);
        }, 3000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [instaId]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <img
              src={umung1}
              alt="매칭 중"
              className="max-w-[300px] w-full aspect-square rounded-xl mb-6"
            />
            <p className="text-center font-semibold text-base">
              작성해주신 정보를 바탕으로 AI가 당신의 짝을 열심히 찾습니다!
            </p>
          </>
        );

      case "success":
        return (
          <>
            <img
              src={umung2}
              alt="매칭 성공"
              className="max-w-[300px] w-full aspect-square rounded-xl mb-6"
            />
            <p className="text-center font-semibold text-base">
              AI가 당신의 짝을 찾았습니다!!!
              <br />
              <span className="text-blue-600 text-sm">
                결과 화면으로 넘어가는 중이니 잠시만 기다려주세요.
              </span>
            </p>
          </>
        );

      case "error":
        return (
          <>
            <img
              src={kakao}
              alt="매칭 실패"
              className="max-w-[300px] w-full aspect-square rounded-xl mb-6"
            />
            <p className="text-center font-semibold text-base">
              검색 중 오류가 발생했습니다.
              <br />
              SMUMC 부스로 찾아와주세요!
              <br />
              <span className="text-red-500 text-sm">해당 화면을 캡쳐해주세요.</span>
            </p>
          </>
        );
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col items-center justify-center px-6">
      {renderContent()}
    </div>
  );
};

export default MatchingPage;
