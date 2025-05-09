// src/pages/landing/landing.tsx
import React from "react";
import kwajam from "../../assets/kwajam.png";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <img
        src={kwajam}
        alt="종료 이미지"
        className="w-[220px] h-auto mb-10 object-contain"
      />
      <h1 className="text-2xl font-bold text-black mb-3">
        스뮤 시그널이 종료되었습니다.
      </h1>
      <p className="text-base text-gray-600 leading-relaxed">
        5월 10일 오전 2시부로 스뮤 시그널이 종료되었습니다.
        <br />
        이용해주셔서 진심으로 감사드립니다!
      </p>
    </div>
  );
};

export default LandingPage;