import { useEffect, useState, FormEvent, useRef } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import ghost from "../../assets/ghost.svg";
import settings from "../../assets/settings.svg";
import redheart from "../../assets/redheart.svg";
import goldheard from "../../assets/goldheart.svg";
import documentImg from "../../assets/document.svg";

function MainPage() {
  const navigate = useNavigate();

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const token = getCookie("authToken");
  const bearerToken = `Bearer ${token}`;

  const [instaId, setInstaId] = useState("...");
  const [rerollCount, setRerollCount] = useState(0);
  const [referralCode, setReferralCode] = useState("...");
  const [inputCode, setInputCode] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const [codeColor, setCodeColor] = useState("#B4A5FE");
  const hasAlertedRef = useRef(false);

  const isCodeValid = inputCode.length === 6 || inputCode.length === 8;

  useEffect(() => {
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const fetchInstagram = async () => {
      try {
        const response = await axios.get("https://smuumc.kro.kr/user/getMyIns", {
          headers: { Authorization: bearerToken },
        });
        const id = response.data.result || "unknown";
        const trimmed = id.length > 7 ? id.slice(0, 7) + "..." : id;
        setInstaId(trimmed);
      } catch (error) {
        console.error("인스타 ID 불러오기 실패", error);
        setInstaId("unknown");
      }
    };

    const fetchReroll = async () => {
      try {
        const response = await axios.get("https://smuumc.kro.kr/serialCode/myReroll", {
          headers: { Authorization: bearerToken },
        });
        const count = response.data.result ?? 0;
        setRerollCount(count);
        if (count === 0 && !hasAlertedRef.current) {
          window.alert("뽑기를 모두 사용하셨습니다.\n대학본부 앞 SMUMC 부스로 와주세요!");
          hasAlertedRef.current = true;
        }
      } catch (error) {
        console.error("리롤 횟수 불러오기 실패", error);
        setRerollCount(0);
      }
    };

    const fetchReferralCode = async () => {
      try {
        const response = await axios.get("https://smuumc.kro.kr/referral/getMyReferralCode", {
          headers: { Authorization: bearerToken },
        });
        setReferralCode(response.data.result || "없음");
      } catch (error) {
        console.error("추천인 코드 불러오기 실패", error);
        setReferralCode("없음");
      }
    };

    fetchInstagram();
    fetchReroll();
    fetchReferralCode();
  }, [token, navigate]);

  const fetchReroll = async () => {
    try {
      const response = await axios.get("https://smuumc.kro.kr/serialCode/myReroll", {
        headers: { Authorization: bearerToken },
      });
      setRerollCount(response.data.result ?? 0);
    } catch (error) {
      console.error("리롤 횟수 갱신 실패", error);
    }
  };

  const handleMatchClick = async () => {
    const now = new Date();
    // 한국 표준시 기준으로 변환 (UTC+9)
    // const nowInKST = new Date(now.getTime() + (9 * 60 * 60 * 1000));
    // 기준 시간: 2025년 5월 8일 00:00:00 KST
    const targetTime = new Date('2025-05-07T15:00:00Z'); // KST 기준으로 2025-05-08T00:00:00
    if (now < targetTime) {
      alert("현재 매칭 가능 기간이 아닙니다.\n5/8 정각부터 이벤트가 시작됩니다.");
      return;
    }
    if (rerollCount === 0) {
      alert("뽑기를 모두 사용하셨습니다.\n대학본부 앞 SMUMC 부스로 와주세요!");
      return;
    }
    try {
      const response = await axios.get("https://smuumc.kro.kr/frontFunc/frontReroll", {
        headers: { Authorization: bearerToken },
      });
      const matchedInsta = response.data.instagram_id;
      if (matchedInsta) {
        // await fetchReroll();
        navigate("/matching", { state: { instaId: matchedInsta, from: "main" } });

      } else {
        alert("매칭된 인스타 ID가 없습니다.");
      }
    } catch (error) {
      console.error("매칭 실패", error);
      alert("매칭된 상대를 불러오는 데 실패했습니다.");
    }
  };

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      alert("추천인 코드가 복사되었습니다.");
    }).catch(err => {
      console.error("복사 실패", err);
    });
  };

  const handleCodeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedCode = inputCode.trim();
    if (!trimmedCode) {
      setCodeMessage("6자리 추천인 코드 혹은 8자리 시리얼 코드를 입력해주세요.");
      setCodeColor("#664BFF");
      return;
    }

    const isReferral = trimmedCode.length === 6;
    const url = isReferral
      ? "https://smuumc.kro.kr/referral/findReferralCode"
      : "https://smuumc.kro.kr/serialCode/insertCode";
    const body = isReferral ? { referralCode: trimmedCode } : { serialCode: trimmedCode };

    try {
      await axios.patch(url, body, { headers: { Authorization: bearerToken } });
      setCodeMessage(isReferral ? "추천인 코드가 적용되었습니다." : "시리얼 코드가 적용되었습니다.");
      setCodeColor("#664BFF");
      await fetchReroll();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message || "오류 발생";
      const finalMsg = msg.includes("이미")
        ? `이미 사용된 ${isReferral ? "추천인" : "시리얼"} 코드입니다.`
        : `올바르지 않은 ${isReferral ? "추천인" : "시리얼"} 코드입니다.`;
      setCodeMessage(finalMsg);
      setCodeColor("#FF6677");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-[#4B66FF] text-white flex justify-center">
      <div className="w-full max-w-[768px] flex flex-col min-h-screen">
        {/* 상단 */}
        <div className="px-4 sm:px-6 py-6 pt-10 space-y-6 relative">
          <img
            src={settings}
            alt="설정"
            className="w-6 h-6 sm:w-7 sm:h-7 absolute top-4 right-4 cursor-pointer"
            onClick={() => navigate("/settings")}
          />
          <div className="flex items-center justify-between">
            <div className="leading-[20px]">
              <p className="font-pretendard font-bold text-[24px] leading-[20px] tracking-[-0.5px]">
                @{instaId}
                <span className="ml-1 text-[#B4CFF5]">님</span>
              </p>
              <p className="font-pretendard font-bold text-[16px] leading-[20px] tracking-[-0.5px] mt-2 text-[#B4CFF5]">
                스뮤시그널에 <br /> 오신 것을 환영합니다!
              </p>
            </div>
            <img
              src={ghost}
              alt="귀신"
              className="w-30 h-30 sm:w-32 sm:h-32 md:w-36 md:h-36"
            />
          </div>
          <div className="bg-white text-black rounded-[32px] px-4 py-3 text-sm sm:text-base font-bold w-full flex items-center">
            <div className="bg-[#4D6FFF] text-white rounded-[32px] px-3 py-1 mr-3 text-sm">
              {rerollCount}
            </div>
            당신의 남은 리롤 횟수
          </div>
        </div>

        {/* 하단 */}
        <div className="flex-1 w-full bg-white text-black rounded-t-3xl px-4 sm:px-6 pt-6 pb-10 space-y-6 flex flex-col">
          <div
            className="bg-[#3C57E8] text-white rounded-[32px] p-4 sm:p-6 relative overflow-hidden flex items-center justify-between cursor-pointer"
            onClick={handleMatchClick}
          >
            <div className="z-10">
              <p className="text-lg sm:text-xl font-semibold">매칭 시작</p>
              <p className="text-sm sm:text-base opacity-80">당신의 짝을 보고 싶을 때</p>
            </div>
            <div className="relative w-[140px] h-[100px] sm:w-[100px] sm:h-[100px] flex-shrink-0">
              <img
                src={redheart}
                alt="레드 하트"
                className="absolute top-11 left-6 w-[100%] h-[80%] object-contain z-0"
              />
              <img
                src={goldheard}
                alt="골드 하트"
                className="absolute top-12 right-3 w-[100%] h-[86%] object-contain z-0"
              />
            </div>
          </div>

          <div className="bg-[#6741FF] rounded-[32px] p-4 text-white space-y-2 relative">
            <div className="text-sm sm:text-lg">내 추천인 코드</div>
            <div className="flex justify-between items-center">
              <div className="text-lg sm:text-xl font-bold">{referralCode}</div>
              <img
                src={documentImg}
                alt="복사"
                onClick={handleCopyReferralCode}
                className="cursor-pointer w-10 h-10 sm:w-10 sm:h-10 absolute right-4 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>

          <form
            className="flex flex-col sm:flex-row items-center bg-white border-2 rounded-[32px] overflow-hidden w-full h-[72px] mx-auto relative"
            style={{ borderColor: codeColor }}
            onSubmit={handleCodeSubmit}
          >
            <input
              type="text"
              value={inputCode}
              onChange={(e) => {
                const val = e.target.value;
                setInputCode(val);
                if (val.length > 0 && val.length !== 6 && val.length !== 8) {
                  setCodeMessage("6자리 추천인 코드 혹은 8자리 시리얼 코드를 입력해주세요.");
                  setCodeColor("#664BFF");
                } else {
                  setCodeMessage("");
                }
              }}
              className="px-4 py-2 w-full text-black outline-none text-sm sm:text-base font-semibold h-full flex items-center bg-white text-black"
              style={{ lineHeight: "normal" }}
            />
            <button
              type="submit"
              disabled={!isCodeValid}
              className="absolute top-[18px] right-[16px] w-[79px] h-[36px] rounded-full flex items-center justify-center disabled:opacity-50"
              style={{ backgroundColor: isCodeValid ? "#664BFF" : "#B4A5FE", cursor: isCodeValid ? "pointer" : "default" }}
            >
              <span className="text-white text-sm font-semibold">확인</span>
            </button>
          </form>

          <p className="text-sm mt-2 text-center" style={{ color: codeColor }}>
            {codeMessage}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
