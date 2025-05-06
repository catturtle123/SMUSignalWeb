// pages/matching/MatchingPage.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import umung1 from "../../assets/umung1.mp4";
import umung2 from "../../assets/umung2.mp4";
import kakao from "../../assets/kakao.mp4";

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
        setTimeout(() => {
          window.location.href = `https://instagram.com/${instaId}`;
        }, 3000); // 성공 화면 3초 후 이동
      }
    }, 2000); // 로딩 2초 후 상태 전환

    return () => clearTimeout(timer);
  }, [instaId]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <video
              src={umung1}
              autoPlay
              loop
              muted
              className="w-[200px] h-[200px] rounded-xl mb-6"
            />
            <p className="text-white text-center font-semibold">
              작성해주신 정보를 바탕으로 AI가 당신의 짝을 열심히 찾습니다!
            </p>
          </>
        );

      case "success":
        return (
          <>
            <video
              src={umung2}
              autoPlay
              loop
              muted
              className="w-[200px] h-[200px] rounded-xl mb-6"
            />
            <p className="text-white text-center font-semibold">
              AI가 당신의 짝을 찾았습니다!!!
              <br />
              <span className="text-blue-200 text-sm">
                결과 화면으로 넘어가는 중이니 잠시만 기다려주세요.
              </span>
            </p>
          </>
        );

      case "error":
        return (
          <>
            <video
              src={kakao}
              autoPlay
              loop
              muted
              className="w-[200px] h-[200px] rounded-xl mb-6"
            />
            <p className="text-white text-center font-semibold">
              검색 중 오류가 발생했습니다.
              <br />
              SMUMC 부스로 찾아와주세요!
              <br />
              <span className="text-red-300 text-sm">해당 화면을 캡쳐해주세요.</span>
            </p>
          </>
        );
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#4B66FF] px-6 text-white">
      {renderContent()}
    </div>
  );
};

export default MatchingPage;
