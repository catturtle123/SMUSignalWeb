import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
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
        "https://smuumc.kro.kr/user/mailCode",
        {
          mail: `${studentId}@sangmyung.kr`,
        }
      );
      console.log("인증 코드 전송 성공:", res.data);
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        // 에러 상태 분류
        switch (status) {
          case 400:
            console.error(
              `인증 코드 전송 실패: ${status}, ${
                data.message ||
                "이메일 형식이 올바르지 않습니다."
              }`
            );
            break;

          case 500:
            console.error(
              `인증 코드 전송 실패: ${status}, ${
                data.message || "서버 내부 오류 발생"
              }
                }`
            );
            break;
        }
      } else {
        // 기타 에러(네트워크 등등)
        console.error("인증 코드 전송 실패:", error.message);
      }
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

  const checkUserStatus: () => Promise<void> = async () => {
    try {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!authToken) {
        alert("인증 토큰이 없습니다. 다시 로그인해주세요.");
        navigate("/login");
        return;
      }

      const res = await axios.get(
        "https://smuumc.kro.kr/frontFunc/operationFront",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(res);

      if (res.status === 200) {
        console.log("회원가입 완료된 유저입니다.");
        navigate("/main"); // 회원가입 완료된 유저는 MainPage로 이동
      } else if (res.status === 400) {
        console.log("회원가입이 완료되지 않은 유저입니다.");
        navigate("/signup"); // 회원가입이 완료되지 않은 유저는 SignupPage로 이동
      } else {
        console.log("다시 로그인 해주세요");
        navigate("/login");
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            console.error(
              `회원가입 상태 확인 실패: ${status}, ${
                data.message ||
                "회원 정보를 입력하지 않은 유저입니다."
              }`
            );
            alert(
              "회원 정보를 입력하지 않은 유저입니다. 회원가입을 진행해주세요."
            );
            navigate("/signup");
            break;

          case 401:
            console.error(
              `회원가입 상태 확인 실패: ${status}, ${
                data.message || "인증 오류가 발생했습니다."
              }`
            );
            alert(
              "인증 오류가 발생했습니다. 다시 로그인해주세요."
            );
            navigate("/login");
            break;

          case 403:
            console.error(
              `회원가입 상태 확인 실패: ${status}, ${
                data.message || "만료된 토큰입니다."
              }`
            );
            alert("세션이 만료되었습니다. 다시 로그인해주세요.");
            navigate("/login");
            break;

          case 500:
            console.error(
              `회원가입 상태 확인 실패: ${status}, ${
                data.message || "서버 오류가 발생했습니다."
              }`
            );
            alert(
              "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
            break;

          default:
            console.error(
              `회원가입 상태 확인 실패: ${status}, ${
                data.message || "알 수 없는 오류가 발생했습니다."
              }`
            );
            alert(
              "알 수 없는 오류가 발생했습니다. 다시 시도해주세요."
            );
            break;
        }
      } else {
        console.error("회원가입 상태 확인 실패:", error.message);
        alert(
          "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요."
        );
      }
    }
  };

  // 인증 코드 검증 및 토큰 발급 api
  const verifyCode: () => Promise<void> = async () => {
    try {
      const res = await axios.post(
        "https://smuumc.kro.kr/user/verify",
        {
          mailVerification: verificationCode,
        }
      );

      console.log("인증 코드 검증 성공:", res.data);

      // 토큰 발급 성공(쿠키 저장)
      if (res.data.token) {
        document.cookie = `authToken=${res.data.token}; path=/`;
        console.log("토큰 저장 완료:", res.data.token);

        // 회원가입 상태 확인
        await checkUserStatus();
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        // 에러 분류
        switch (status) {
          case 400:
            console.error(
              `인증 코드 검증 실패: ${status}, ${
                data.message ||
                "인증 코드가 제공되지 않았습니다."
              }`
            );
            break;
          case 403:
          case 401:
            console.error(
              `인증 코드 검증 실패: ${status}, ${
                data.message || "인증 코드가 올바르지 않습니다."
              }`
            );
            setLoginStep(LoginStep.InvalidVerificationCode); // 상태 변경
            break;
          case 500:
            console.error(
              `인증 코드 검증 실패: ${status}, ${
                data.message || "서버 오류가 발생했습니다."
              }`
            );
            break;
          default:
            console.error(
              `인증 코드 검증 실패: ${status}, ${
                data.message || "알 수 없는 오류가 발생했습니다."
              }`
            );
            break;
        }
      } else {
        // 기타 에러(네트워크 등등)
        console.error("인증 코드 검증 실패:", error.message);
      }
    }
  };

  // 인증 코드 확인 핸들러
  const handleVerifyCode = () => {
    if (isVerificationCodeValid(verificationCode)) {
      verifyCode(); // 인증 코드 검증 API 호출
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
              <h1 className="text-2xl font-bold mb-4 text-left">
                로그인
              </h1>
              <p className="text-base text-black text-left">
                학번만 기재할 경우,
                <br />
                메일주소가 자동으로 반영되어서 전송됩니다.
              </p>
            </div>
            <div className="flex justify-between items-center w-[327px] mb-4 py-3 px-3 border border-gray-300 rounded-md">
              <input
                type="text"
                value={studentId}
                onChange={handleStudentIdChange}
                maxLength={9}
                placeholder="학번을 입력하세요"
                className="w-[135px] h-[28px] py-3 px-3 text-[20px] text-center placeholder:text-[14px] font-semibold"
              />
              <button
                className={`w-[136px] h-[45px] text-center text-[16px] font-semibold rounded-md transition-colors ${
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

      // 초기 화면 이후(학번 입력 후 - 인증 코드 성공)
      case LoginStep.VerificationCodeInput:
        return (
          <>
            <div className="text-center mb-8 w-full">
              <h1 className="text-2xl font-bold mb-4 text-left">
                로그인
              </h1>
              <p className="text-base text-black text-left">
                학번만 기재할 경우,
                <br />
                메일주소가 자동으로 반영되어서 전송됩니다.
              </p>
            </div>
            <div className="flex justify-between items-center w-[327px] mb-4 py-3 px-3 border border-gray-300 rounded-md">
              <span className="w-[135px] h-[28px] text-[20px] text-center font-semibold text-gray-800">
                {studentId}
              </span>
              <button
                className="w-[136px] h-[45px] text-center text-[16px] font-semibold rounded-md transition-colors bg-[#e1eaf8] text-white cursor-pointer disabled:cursor-not-allowed"
                onClick={() => setIsSubmitted(false)}
                disabled={isSubmitted}
              >
                전송 {isSubmitted ? "완료" : "하기"}
              </button>
            </div>
            <div className="w-full mb-4">
              <p className="text-[12px] text-[#4B67FF] font-bold leading-[120%] mb-4">
                {studentId}@sangmyung.kr로
                <br />
                인증번호를 전송했습니다.
                <br />
                스팸 메일함도 확인해주세요 :)
              </p>
              <input
                type="text"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                maxLength={6}
                placeholder="인증코드 6자리"
                className="w-full py-3 px-3 mb-2 mt-5 border border-gray-300 rounded-md text-xl placeholder:text-base text-left font-bold"
              />
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

      // 초기 화면 이후(학번 입력 후 - 인증 코드 실패)
      case LoginStep.InvalidVerificationCode:
        return (
          <>
            <div className="text-center mb-8 w-full">
              <h1 className="text-2xl font-bold mb-4 text-left">
                로그인
              </h1>
              <p className="text-base text-black text-left">
                학번만 기재할 경우,
                <br />
                메일주소가 자동으로 반영되어서 전송됩니다.
              </p>
            </div>
            <div className="flex justify-between items-center w-[327px] mb-4 py-3 px-3 border border-gray-300 rounded-md">
              <span className="w-[135px] h-[28px] text-[20px] text-center font-semibold text-gray-800">
                {studentId}
              </span>
              <button
                className="w-[136px] h-[45px] text-center text-[16px] font-semibold rounded-md transition-colors bg-[#e1eaf8] text-white cursor-pointer disabled:cursor-not-allowed"
                onClick={() => setIsSubmitted(false)}
                disabled={isSubmitted}
              >
                전송 {isSubmitted ? "완료" : "하기"}
              </button>
            </div>
            <div className="w-full mb-4">
              <p className="text-[12px] text-[#4B67FF] font-bold leading-[120%] mb-4">
                {studentId}@sangmyung.kr로
                <br />
                인증번호를 전송했습니다.
                <br />
                스팸 메일함도 확인해주세요 :)
              </p>
              <input
                type="text"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                maxLength={6}
                placeholder="인증코드 6자리"
                className="w-full py-3 px-3 mb-2 border border-[#ff4d4f] rounded-md text-xl placeholder:text-base text-left font-bold"
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
    <div className="flex flex-col items-center justify-start mt-16 min-h-screen pt-8 bg-white max-w-[600px] mx-auto">
      {renderLoginStep()}
    </div>
  );
};

export default LoginPage;
