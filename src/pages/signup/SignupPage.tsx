import React, { useState } from "react";
import femaleIcon from "../../assets/female.png";
import maleIcon from "../../assets/male.png";
import axios from "axios";

type Gender = "male" | "female" | null;
type Cg = true | false;

const SignupPage: React.FC = () => {
  const [selectedGender, setSelectedGender] =
    useState<Gender>(null);
  const [clickedGender, setClickedGender] = useState<Cg>(false);
  const [instagramId, setInstagramId] = useState("");

  const handleGenderSelect = (gender: "male" | "female") => {
    if (selectedGender === gender) {
      setSelectedGender(null);
    } else {
      setSelectedGender(gender);
      setClickedGender(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInstagramId(e.target.value); // 입력된 텍스트 업데이트
  };

  const signUpUser: () => Promise<void> = async () => {
    try {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      const res = await axios.post(
        "http://15.164.227.179:3000/frontFunc/signUpFront",
        {
          gender: selectedGender,
          instagram_id: instagramId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("res", res);
      console.log("회원가입 성공", res.data.message);

      alert("회원가입이 완료되었습니다!");
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            console.error(
              `회원가입 실패: ${status}, ${
                data.message ||
                "회원 가입 실패 또는 누락된 필드가 존재하는 경우"
              }`
            );
            break;

          case 401:
            console.error(
              `회원가입 실패: ${status}, ${
                data.message || "인증 오류, 토큰이 존재하지 않음"
              }`
            );
            break;

          case 403:
            console.error(
              `회원가입 실패: ${status}, ${
                data.message || "만료된 토큰입니다."
              }`
            );
            break;

          case 500:
            console.error(
              `회원가입 실패: ${status}, ${
                data.message || "서버 에러입니다."
              }`
            );
            break;

          default:
            console.error(
              `회원가입 실패: ${status}, ${
                data.message || "알 수 없는 오류가 발생했습니다."
              }`
            );
            break;
        }
      } else {
        // 기타 에러(네트워크 등등)
        console.error("회원가입 실패:", error.message);
      }
    }
  };

  const handleVerifyInstagram = () => {
    if (!selectedGender) {
      alert("성별을 선택해주세요.");
      return;
    }

    if (!instagramId.trim()) {
      alert("인스타그램 아이디를 입력해주세요.");
      return;
    }

    // 회원가입 API 호출
    signUpUser();
  };

  return (
    <div className="w-[100%] max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-left mb-6 mt-6">
        성별을 알려주세요.
      </h2>
      <div className="flex gap-2">
        <div className="">
          <img
            src={maleIcon}
            alt="남성"
            className={`w-[166px] h-[166px] cursor-pointer ${
              selectedGender === "male"
                ? "border border-blue-500 rounded-xl"
                : "border-gray-200"
            }`}
            onClick={() => handleGenderSelect("male")}
          />
        </div>

        <div className="">
          <img
            src={femaleIcon}
            alt="여성"
            className={`w-[166px] h-[166px] cursor-pointer ${
              selectedGender === "female"
                ? " border border-blue-500 rounded-xl"
                : "border-gray-200"
            }`}
            onClick={() => handleGenderSelect("female")}
          />
        </div>
      </div>

      {clickedGender && (
        <div className="mt-5 flex flex-col gap-5">
          <h3 className="text-2xl font-bold">
            인스타그램 아이디를 입력해주세요.
          </h3>
          <p className="text-base">
            다른 인스타 아이디를 도용하거나, 없는 인스타 아이디를
            기재할 시 손해 배상 청구 및 개인정보 도용, 서비스
            이용제한의 사유가 될 수있습니다.
          </p>
          <input
            type="text"
            className="w-[347px] h-[46px] py-3 px-3 mb-2 mt-5 border border-gray-300 rounded-lg text-xl font-semibold"
            value={instagramId}
            onChange={handleInputChange}
          />
          <button
            className={`w-[347px] h-[57px] py-3 text-lg font-semibold rounded-xl transition-colors ${
              instagramId.trim()
                ? "bg-[#4364f7] text-white cursor-pointer"
                : "bg-[#e1eaf8] text-white cursor-not-allowed"
            }`}
            onClick={handleVerifyInstagram}
            disabled={!instagramId.trim()}
          >
            완료
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
