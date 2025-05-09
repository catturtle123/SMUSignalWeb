// src/pages/landing/landing.tsx
import React from "react";
import kwajam from "../../assets/kwajam.png";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <img
        src={kwajam}
        alt="종료 이미지"
        className="max-w-xs w-full h-auto mb-8 object-contain"
      />
      <h1 className="text-xl font-bold text-center text-black mb-2">
        스뮤 시그널이 종료되었습니다.
      </h1>
      <p className="text-center text-base text-gray-600 leading-relaxed">
        5월 10일 오전 2시부로 스뮤 시그널이 종료되었습니다.
        <br />
        그동안 이용해주신 모든 분들께 진심으로 감사드립니다!
      </p>
    </div>
  );
};

export default LandingPage;