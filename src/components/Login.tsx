import { useState } from "react";
import axios from "axios";

enum LoginStep {
  StudentIDInput = 1,
  VerificationCodeInput = 2,
  VerficationCompleted = 3,
  InvalidStudentID = 4,
  ResendVerificationCode = 5,
  InvalidVerificationCode = 6,
  VerificationSuccess = 7,
}

const Login = () => {
  const [loginStep, setLoginStep] = useState<LoginStep>(
    LoginStep.StudentIDInput
  );
  const [studentId, setStudentId] = useState<string>("");
  const [verificationCode, setVerificationCode] =
    useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [buttonText, setButtonText] =
    useState<string>("전송 하기");

  // 학번이 9자리인지 확인하는 함수
  const isStudentIdValid = (id: string): boolean => {
    return id.length === 9 && /^\d+$/.test(id);
  };

  // 인증 코드가 6자리 숫자인지 확인하는 함수
  const isVerificationCodeValid = (code: string): boolean => {
    return code.length === 6 && /^\d+$/.test(code);
  };

  // 학번 입력 핸들러
  const handleStudentIdChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // 숫자만 입력 가능
      setStudentId(value);
    }
  };

  // 인증 코드 입력 핸들러
  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // 숫자만 입력 가능
      setVerificationCode(value);
    }
  };

  // 학번 이메일을 통한 인증 코드 전송
  const postData: () => Promise<void> = async () => {
    try {
      const res = await axios.post(
        "http://15.164.227.179:3000/user/mailCode",
        {
          mail: `${studentId}@sangmyung.kr`,
        }
      );
      console.log("인증 코드 전송 성공:", res.data);
    } catch (error) {
      console.error("인증 코드 전송 실패: ", error);
    }
  };

  // 학번 제출 핸들러
  const handleSubmitStudentId = () => {
    if (isStudentIdValid(studentId)) {
      setLoginStep(LoginStep.VerificationCodeInput);
      setButtonText("전송 완료");
      setIsSubmitted(true);
      postData();
    } else {
      setLoginStep(LoginStep.InvalidStudentID);
    }
  };

  // 인증 코드 확인 핸들러
  const handleVerifyCode = () => {
    if (isVerificationCodeValid(verificationCode)) {
      setLoginStep(LoginStep.VerificationSuccess);
    } else {
      setLoginStep(LoginStep.InvalidVerificationCode);
    }
  };

  // 조건에 따라 로그인 단계 렌더링
  const renderLoginStep = () => {
    switch (loginStep) {
      // 초기 화면
      case LoginStep.StudentIDInput:
        return (
          <>
            <div className="text-center mb-8 w-full">
              <h1 className="text-xl font-bold mb-4">로그인</h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                학번만 기재할 경우,
                <br />
                메일주소가 자동으로 반영되어서 전송됩니다.
              </p>
            </div>
            <div className="flex justify-between items-center w-full mb-4 py-3 px-3 border border-gray-300 rounded-md">
              <input
                type="text"
                value={studentId}
                onChange={handleStudentIdChange}
                maxLength={9}
                placeholder="학번을 입력하세요"
                className="w-[129px] h-[28px] py-3 px-3 text-[20px] text-center"
              />
              <button
                className={`w-[136px] h-[36px] text-center text-[16px] rounded-md transition-colors ${
                  isStudentIdValid(studentId)
                    ? "bg-[#4364f7] text-white cursor-pointer"
                    : "bg-[#e1eaf8] text-white cursor-not-allowed"
                }`}
                onClick={handleSubmitStudentId}
                disabled={!isStudentIdValid(studentId)}
              >
                {buttonText}
                {/* 전송하기 */}
              </button>
            </div>
          </>
        );

      // 초기 화면 이후(학번 입력 후 - 메일 인증 성공)
      case LoginStep.VerificationCodeInput:
        return (
          <>
            <div className="text-center mb-8 w-full">
              <h1 className="text-xl font-bold mb-4">로그인</h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                학번만 기재할 경우,
                <br />
                메일주소가 자동으로 반영되어서 전송됩니다.
              </p>
            </div>
            <div className="flex justify-between items-center w-full mb-4 py-3 px-3 border border-gray-300 rounded-md">
              <span className="text-base text-gray-800">
                {studentId}
              </span>
              <button
                className="bg-[#e1eaf8] text-white py-2 px-4 rounded-md cursor-pointer disabled:cursor-not-allowed"
                onClick={() => setIsSubmitted(false)}
                disabled={isSubmitted}
              >
                전송 {isSubmitted ? "완료" : "하기"}
              </button>
            </div>
            <div className="w-full mb-4">
              <p className="text-sm text-[#5271ff] mb-4 leading-relaxed">
                {studentId}@sangmyung.kr로
                <br />
                인증번호를 전송했습니다.
                <br />
                스팸 메일함도 확인해주세요
              </p>
              <input
                type="text"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                maxLength={6}
                placeholder="인증코드 6자리"
                className="w-full py-3 px-3 mb-2 border border-gray-300 rounded-md text-base text-center"
              />
              <p className="text-xs text-gray-500 mb-4">
                인증코드는 6자리입니다.
              </p>
            </div>
            <button
              className={`w-full py-3 text-base rounded-md transition-colors ${
                isVerificationCodeValid(verificationCode)
                  ? "bg-[#4364f7] text-white cursor-pointer"
                  : "bg-[#e1eaf8] text-white cursor-not-allowed"
              }`}
              onClick={handleVerifyCode}
              disabled={
                !isVerificationCodeValid(verificationCode)
              }
            >
              확인
            </button>
          </>
        );

      // 초기 화면 이후(학번 입력 후 - 메일 인증 실패)
      case LoginStep.InvalidVerificationCode:
        return (
          <>
            <div className="text-center mb-8 w-full">
              <h1 className="text-xl font-bold mb-4">로그인</h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                학번만 기재할 경우,
                <br />
                메일주소가 자동으로 반영되어서 전송됩니다.
              </p>
            </div>
            <div className="flex justify-between items-center w-full mb-4 py-3 px-3 border border-gray-300 rounded-md">
              <span className="text-base text-gray-800">
                {studentId}
              </span>
              <button
                className="bg-[#e1eaf8] text-white py-2 px-4 rounded-md cursor-pointer disabled:cursor-not-allowed"
                onClick={() => setIsSubmitted(false)}
                disabled={isSubmitted}
              >
                전송 {isSubmitted ? "완료" : "하기"}
              </button>
            </div>
            <div className="w-full mb-4">
              <p className="text-sm text-[#5271ff] mb-4 leading-relaxed">
                {studentId}@sangmyung.kr로
                <br />
                인증번호를 전송했습니다.
                <br />
                스팸 메일함도 확인해주세요
              </p>
              <input
                type="text"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                maxLength={6}
                placeholder="인증코드 6자리"
                className="w-full py-3 px-3 mb-2 border border-[#ff4d4f] rounded-md text-base text-center"
              />
              <p className="text-xs text-[#ff4d4f] mb-4">
                유효한 인증코드가 아닙니다!
              </p>
            </div>
            <button
              className={`w-full py-3 text-base rounded-md transition-colors ${
                isVerificationCodeValid(verificationCode)
                  ? "bg-[#4364f7] text-white cursor-pointer"
                  : "bg-[#e1eaf8] text-white cursor-not-allowed"
              }`}
              onClick={handleVerifyCode}
              disabled={
                !isVerificationCodeValid(verificationCode)
              }
            >
              확인
            </button>
          </>
        );

      default:
        return (
          <div className="text-center mb-8 w-full">
            <h1 className="text-xl font-bold mb-4">로그인</h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              학번만 기재할 경우,
              <br />
              메일주소가 자동으로 반영되어서 전송됩니다.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-8 bg-white max-w-[600px] mx-auto">
      {renderLoginStep()}
    </div>
  );
};

export default Login;
