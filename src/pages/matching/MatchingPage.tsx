// pages/matching/MatchingPage.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MatchingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const instaId = location.state?.instaId;

  useEffect(() => {
    if (!instaId) {
      alert("매칭 정보가 없습니다.");
      navigate("/main");
      return;
    }

    const timer = setTimeout(() => {
      window.location.href = `https://instagram.com/${instaId}`;
    }, 5000); // 5초 후 이동

    return () => clearTimeout(timer);
  }, [instaId, navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#4B66FF] text-white">
      <div className="flex gap-4 mb-6">
        <video src="/video1.mp4" autoPlay loop muted className="w-[150px] h-[200px] rounded-lg" />
        <video src="/video2.mp4" autoPlay loop muted className="w-[150px] h-[200px] rounded-lg" />
      </div>
      <p className="text-xl font-bold animate-pulse">매칭 중...</p>
    </div>
  );
};

export default MatchingPage;
