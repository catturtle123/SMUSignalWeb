import { useState } from "react";
import styles from "./Login.module.css";

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
  const [studentId, setStudentId] =
    useState<string>("202010914");
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

  // 학번 제출 핸들러
  const handleSubmitStudentId = () => {
    if (isStudentIdValid(studentId)) {
      setLoginStep(LoginStep.VerificationCodeInput);
      setButtonText("전송 완료");
      setIsSubmitted(true);
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
      case LoginStep.StudentIDInput:
        return (
          <>
            <div className={styles["login-header"]}>
              <h1>로그인</h1>
              <p>
                학번만 기재할 경우,
                <br />
                메일주소가 자동으로 반영되어서 전송됩니다.
              </p>
            </div>
            <div className={styles["input-container"]}>
              <input
                type="text"
                value={studentId}
                onChange={handleStudentIdChange}
                maxLength={9}
                placeholder="학번을 입력하세요"
                className={styles["student-id-input"]}
              />
              <button
                className={`${styles["submit-button"]} ${
                  isStudentIdValid(studentId)
                    ? styles["active"]
                    : styles["inactive"]
                }`}
                onClick={handleSubmitStudentId}
                disabled={!isStudentIdValid(studentId)}
              >
                {buttonText}
              </button>
            </div>
          </>
        );

      case LoginStep.VerificationCodeInput:
        return (
          <>
            <div className={styles["login-header"]}>
              <h1>로그인</h1>
              <p>
                학번만 기재할 경우,
                <br />
                메일주소가 자동으로 반영되어서 전송됩니다.
              </p>
            </div>
            <div className={styles["student-id-display"]}>
              <span>{studentId}</span>
              <button
                className={styles["resend-button"]}
                onClick={() => setIsSubmitted(false)}
                disabled={isSubmitted}
              >
                전송 {isSubmitted ? "완료" : "하기"}
              </button>
            </div>
            <div className={styles["verification-info"]}>
              <p className={styles["email-info"]}>
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
                className={styles["verification-code-input"]}
              />
              <p className={styles["code-length-info"]}>
                인증코드는 6자리입니다.
              </p>
            </div>
            <button
              className={`${styles["confirm-button"]} ${
                isVerificationCodeValid(verificationCode)
                  ? styles["active"]
                  : styles["inactive"]
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

      case LoginStep.InvalidVerificationCode:
        return (
          <>
            <div className={styles["login-header"]}>
              <h1>로그인</h1>
              <p>
                학번만 기재할 경우,
                <br />
                메일주소가 자동으로 반영되어서 전송됩니다.
              </p>
            </div>
            <div className={styles["student-id-display"]}>
              <span>{studentId}</span>
              <button
                className={styles["resend-button"]}
                onClick={() => setIsSubmitted(false)}
                disabled={isSubmitted}
              >
                전송 {isSubmitted ? "완료" : "하기"}
              </button>
            </div>
            <div className={styles["verification-info"]}>
              <p className={styles["email-info"]}>
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
                className={`${styles["verification-code-input"]} ${styles["error"]}`}
              />
              <p className={styles["code-error-info"]}>
                유효한 인증코드가 아닙니다!
              </p>
            </div>
            <button
              className={`${styles["confirm-button"]} ${
                isVerificationCodeValid(verificationCode)
                  ? styles["active"]
                  : styles["inactive"]
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
          <div className={styles["login-header"]}>
            <h1>로그인</h1>
            <p>
              학번만 기재할 경우,
              <br />
              메일주소가 자동으로 반영되어서 전송됩니다.
            </p>
          </div>
        );
    }
  };

  return (
    <div className={styles["login-container"]}>
      {renderLoginStep()}
    </div>
  );
};

export default Login;
