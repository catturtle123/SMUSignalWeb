import React from "react";

function MainPage() {
  return (
    <div className="min-h-screen bg-[#4D6FFF] text-white px-6 py-8 space-y-6">
      {/* 유저 정보 영역 */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-light">@daemon 님</p>
          <p className="text-lg font-semibold">
            스뮤시그널에 오신 것을 환영합니다!
          </p>
        </div>
        <div>
          {/* 설정 아이콘 자리 */}
          <button>
            <img
              src="/icons/settings.svg"
              alt="설정"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* 리롤 횟수 */}
      <div className="bg-white text-black rounded-full px-4 py-2 text-sm font-semibold w-fit">
        <span className="text-[#4D6FFF] font-bold mr-2">12</span>
        당신의 남은 리롤 횟수
      </div>

      {/* 매칭 시작 카드 */}
      <div className="bg-[#3C57E8] rounded-2xl p-5 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">매칭 시작</p>
          <p className="text-sm opacity-80">
            당신의 짝을 보고 싶을 때
          </p>
        </div>
        {/* 하트 이미지 자리 */}
        <img
          src="/images/hearts.png"
          alt="하트"
          className="w-14 h-14"
        />
      </div>

      {/* 추천 코드 표시 */}
      <div className="bg-[#6741FF] rounded-xl p-4 flex items-center justify-between">
        <div className="text-lg font-semibold">
          내 추천인 코드
        </div>
        <div className="text-white text-xl font-bold">
          KJ232A
        </div>
        <img
          src="/icons/copy.svg"
          alt="복사"
          className="w-6 h-6"
        />
      </div>

      {/* 추천 코드 입력 영역 */}
      <div>
        <div className="flex items-center bg-white rounded-full overflow-hidden border border-red-500">
          <input
            type="text"
            placeholder="추천 코드 입력"
            className="px-4 py-2 w-full text-black outline-none"
            defaultValue="cdasda"
          />
          <button className="bg-[#4D6FFF] text-white px-4 py-2 font-semibold">
            확인
          </button>
        </div>
        <p className="text-sm text-red-500 mt-2">
          이미 사용된 추천인 코드입니다.
        </p>
      </div>
    </div>
  );
}

export default MainPage;
