import React from "react";

function MainPage() {
  return (
    <div className="w-screen min-h-screen bg-[#4B66FF] text-white flex justify-center">
      <div className="w-full max-w-[768px] flex flex-col min-h-screen">
        {/* 파란색 상단 영역 */}
        <div className="px-4 sm:px-6 py-6 pt-10 space-y-6 relative">
          {/* 설정 아이콘 - 오른쪽 상단 */}
          <img
            src="src/assets/settings.svg"
            alt="설정"
            className="w-6 h-6 sm:w-7 sm:h-7 absolute top-4 right-4"
          />

          {/* 유저 정보 + 캐릭터 */}
          <div className="flex items-center justify-between">
            <div className="leading-[20px]">
              <p className="font-pretendard font-bold text-[24px] leading-[20px] tracking-[-0.5px]">
                @daemon{" "}
                <span className="ml-1 font-pretendard font-bold text-[24px] leading-[20px] tracking-[-0.5px] text-[#B4CFF5]">
                  님
                </span>
              </p>
              <p className="font-pretendard font-bold text-[16px] leading-[20px] tracking-[-0.5px] mt-2 text-[#B4CFF5]">
                스뮤시그널에 <br /> 오신 것을 환영합니다!
              </p>
            </div>
            <img
              src="src/assets/ghost.svg"
              alt="귀신"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36"
            />
          </div>

          {/* 리롤 횟수 */}
          <div className="bg-white text-black rounded-[32px] px-4 py-3 text-sm sm:text-base font-bold w-full flex items-center">
            <div className="bg-[#4D6FFF] text-white rounded-[32px] px-3 py-1 mr-3 text-sm">
              12
            </div>
            당신의 남은 리롤 횟수
          </div>
        </div>

        {/* 흰색 하단 영역 */}
        <div className="flex-1 w-full bg-white text-black rounded-t-3xl px-4 sm:px-6 pt-6 pb-10 space-y-6 relative">
          {/* 매칭 시작 카드 */}
          <div className="bg-[#3C57E8] text-white rounded-[32px] p-4 sm:p-6 relative overflow-hidden flex items-center justify-between">
            <div className="z-10">
              <p className="text-lg sm:text-xl font-semibold">매칭 시작</p>
              <p className="text-sm sm:text-base opacity-80">당신의 짝을 보고 싶을 때</p>
            </div>

            {/* 하트 이미지 래퍼 */}
            <div className="relative w-[140px] h-[100px] sm:w-[100px] sm:h-[100px] flex-shrink-0">
              {/* 레드 하트 (앞쪽, 위로 약간 이동) */}
              <img
                src="src/assets/redheart.svg"
                alt="레드 하트"
                className="absolute top-11 left-6 w-[100%] h-[80%] object-contain z-0"
              />
              {/* 골드 하트 (뒤에, 더 아래쪽) */}
              <img
                src="src/assets/goldheart.svg"
                alt="골드 하트"
                className="absolute top-12 right-3 w-[100%] h-[86%] object-contain z-0"
              />
            </div>
          </div>


          {/* 추천 코드 */}
          <div className="bg-[#6741FF] rounded-[32px] p-4 text-white space-y-2 relative">
            <div className="text-sm sm:text-lg">내 추천인 코드</div>
            <div className="flex justify-between items-center">
              <div className="text-lg sm:text-xl font-bold">KJ232A</div>
              {/* 복사 아이콘 */}
              <img
                src="src/assets/document.svg"
                alt="복사"
                className="w-8 h-8 sm:w-10 sm:h-10 absolute right-4 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>

          {/* 추천 코드 입력 */}
          <form className="flex flex-col sm:flex-row items-center bg-white border-2 border-[#B4A5FE] rounded-[32px] overflow-hidden w-full h-[72px] mx-auto relative">
            <input
              type="text"
              className="px-4 py-2 w-full text-black outline-none text-sm sm:text-base font-semibold"
            />
            <button
              type="submit"
              className="absolute top-[18px] right-[16px] w-[79px] h-[36px] rounded-full bg-[#B4A5FE] flex items-center justify-center"
            >
              <span className="text-white text-sm font-semibold">확인</span>
            </button>
          </form>
          <p className="text-sm text-red-500 mt-2 text-center">
            이미 사용된 추천인 코드입니다.
          </p>
        </div>

        {/* 하단 배경을 위해 추가된 여백 */}
        <div className="flex-1 bg-[#4D6FFF]"></div>
      </div>
    </div>
  );
}

export default MainPage;