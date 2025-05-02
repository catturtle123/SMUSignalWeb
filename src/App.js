import React from 'react';
import Login from './components/Login';
import styled from 'styled-components';
import { ThemeProvider } from './utils/ThemeProvider';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
`;

function App() {
  const handleLoginSuccess = () => {
    // 로그인 성공 시 처리 로직
    console.log('로그인 성공!');
    // 다른 페이지로 이동 등의 로직 추가
  };

  return (
    <ThemeProvider>
      <AppContainer>
        <Login onLoginSuccess={handleLoginSuccess} />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App; 