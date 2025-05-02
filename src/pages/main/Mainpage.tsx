import React from "react";

function MainPage() {
  return (
    <div className="w-screen min-h-screen bg-[#4D6FFF] text-white flex justify-center">
      <div className="w-full max-w-[768px] flex flex-col">
        {/* 파란색 상단 영역 */}
        <div className="px-4 sm:px-6 py-6 space-y-6">
          {/* 유저 정보 */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm sm:text-base font-light">@daemon 님</p>
              <p className="text-lg sm:text-xl font-semibold leading-tight mt-1">
                스뮤시그널에 오신 것을 <br className="sm:hidden" />
                환영합니다!
              </p>
            </div>
            <button>
              <img src="/icons/settings.svg" alt="설정" className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* 리롤 횟수 */}
          <div className="bg-white text-black rounded-full px-4 py-2 text-sm sm:text-base font-semibold w-fit">
            <span className="text-[#4D6FFF] font-bold mr-2">12</span>
            당신의 남은 리롤 횟수
          </div>
        </div>

        {/* 흰색 하단 영역 - 아래까지 쭉 확장 */}
        <div className="flex-1 bg-white text-black rounded-t-3xl px-4 sm:px-6 pt-6 pb-10 space-y-6 min-h-full">
          {/* 매칭 시작 카드 */}
          <div className="bg-[#3C57E8] text-white rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-center sm:text-left space-y-1">
              <p className="text-lg sm:text-xl font-semibold">매칭 시작</p>
              <p className="text-sm sm:text-base opacity-80">당신의 짝을 보고 싶을 때</p>
            </div>
            <img src="/images/hearts.png" alt="하트" className="w-16 h-16 mt-4 sm:mt-0 sm:w-20 sm:h-20" />
          </div>

          {/* 추천 코드 */}
          <div className="bg-[#6741FF] rounded-xl p-4 flex items-center justify-between space-x-2 text-white">
            <div className="text-sm sm:text-lg font-semibold whitespace-nowrap">내 추천인 코드</div>
            <div className="text-lg sm:text-xl font-bold">KJ232A</div>
            <img src="/icons/copy.svg" alt="복사" className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          {/* 추천 코드 입력 */}
          <div>
            <div className="flex flex-col sm:flex-row items-center bg-white rounded-full overflow-hidden border border-red-500">
              <input
                type="text"
                placeholder="추천 코드 입력"
                className="px-4 py-2 w-full text-black outline-none text-sm sm:text-base"
                defaultValue="cdasda"
              />
              <button className="bg-[#4D6FFF] text-white w-full sm:w-auto px-4 py-2 font-semibold text-sm sm:text-base">
                확인
              </button>
            </div>
            <p className="text-sm text-red-500 mt-2">이미 사용된 추천인 코드입니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
