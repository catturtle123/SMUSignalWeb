import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../utils/ThemeProvider';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.G600};
  margin-bottom: 20px;
  text-align: center;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
  position: relative;
`;

const InputField = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid ${props => props.isError ? props.theme.colors.R400 : props.theme.colors.G300};
  border-radius: 8px;
  overflow: hidden;
`;

const Input = styled.input`
  flex: 1;
  padding: 16px;
  border: none;
  font-size: 16px;
  outline: none;
`;

const VerifyButton = styled.button`
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.TB2};
  border: none;
  color: #fff;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const ActiveVerifyButton = styled(VerifyButton)`
  background-color: ${({ theme }) => theme.colors.TB};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.R400};
  font-size: 14px;
  margin: 5px 0;
  text-align: left;
`;

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.TB};
  font-size: 14px;
  margin: 5px 0;
  text-align: left;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${props => props.disabled ? props.theme.colors.TB3 : props.theme.colors.TB};
  border: none;
  border-radius: 8px;
  color: ${props => '#fff'};
  font-size: 16px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  margin-top: 20px;
`;

const Login = ({ onLoginSuccess }) => {
  const theme = useTheme();
  const [studentId, setStudentId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState({
    studentId: '',
    verificationCode: ''
  });
  const [verificationStatus, setVerificationStatus] = useState({
    sent: false,
    completed: false,
    message: ''
  });
  const [isVerifyingId, setIsVerifyingId] = useState(false);

  const validateStudentId = (id) => {
    return id.length === 9;
  };

  const validateVerificationCode = (code) => {
    return code.length === 6;
  };

  const handleSendVerification = () => {
    if (!validateStudentId(studentId)) {
      setErrors({
        ...errors,
        studentId: '학번은 9자리여야 합니다'
      });
      return;
    }

    // 인증번호 전송 로직
    setIsVerifyingId(true);
    
    // 실제로는 API 호출이 필요하지만, 여기서는 시뮬레이션
    setTimeout(() => {
      setVerificationStatus({
        sent: true,
        completed: false,
        message: `${studentId}@sangmyung.kr로 인증번호를 전송했습니다.\n스팸 메일함도 확인해주세요`
      });
      setIsVerifyingId(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {
      studentId: !validateStudentId(studentId) ? '학번은 9자리여야 합니다' : '',
      verificationCode: !validateVerificationCode(verificationCode) ? '인증코드는 6자리입니다.' : ''
    };

    setErrors(newErrors);

    // 유효성 검사 통과 시 로그인 시도
    if (!newErrors.studentId && !newErrors.verificationCode && verificationStatus.sent) {
      // 로그인 로직 구현 (API 호출 등)
      console.log('Login attempt:', { studentId, verificationCode });
      
      // 성공 시 다음 페이지로 이동
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }
  };

  // 학번이 9자리인지 확인
  const isStudentIdValid = validateStudentId(studentId);

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <Description theme={theme}>
        학번만 기재할 경우<br />
        메일주소가 자동으로 반영되어서 전송됩니다.
      </Description>
      
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <InputField theme={theme}>
            <Input
              type="text"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                if (errors.studentId) {
                  setErrors({...errors, studentId: ''});
                }
                if (verificationStatus.sent) {
                  setVerificationStatus({
                    ...verificationStatus,
                    sent: false,
                    message: ''
                  });
                }
              }}
              placeholder="202010914"
            />
            {isVerifyingId ? (
              <VerifyButton disabled theme={theme}>전송 중...</VerifyButton>
            ) : verificationStatus.sent ? (
              <VerifyButton disabled theme={theme}>전송 완료</VerifyButton>
            ) : isStudentIdValid ? (
              <ActiveVerifyButton onClick={handleSendVerification} theme={theme}>
                전송 하기
              </ActiveVerifyButton>
            ) : (
              <VerifyButton disabled theme={theme}>
                전송 하기
              </VerifyButton>
            )}
          </InputField>
          {errors.studentId && <ErrorMessage theme={theme}>{errors.studentId}</ErrorMessage>}
          {verificationStatus.message && <SuccessMessage theme={theme}>{verificationStatus.message}</SuccessMessage>}
        </InputContainer>
        
        {verificationStatus.sent && (
          <InputContainer>
            <InputField isError={errors.verificationCode} theme={theme}>
              <Input
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value);
                  if (errors.verificationCode) {
                    setErrors({...errors, verificationCode: ''});
                  }
                }}
                placeholder="인증번호 6자리"
              />
            </InputField>
            {errors.verificationCode && <ErrorMessage theme={theme}>{errors.verificationCode}</ErrorMessage>}
          </InputContainer>
        )}
        
        <SubmitButton 
          type="submit" 
          disabled={!verificationStatus.sent || !validateVerificationCode(verificationCode)}
          theme={theme}
        >
          확인
        </SubmitButton>
      </form>
    </LoginContainer>
  );
};

export default Login; 