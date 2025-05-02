import React, { createContext, useContext, useState } from 'react';

// 테마 색상 정의
const THEMES = {
  light: {
    colors: {
      TB: '#4B67FF',    // 주요 테마 색상
      TB2: '#B4CFF5',   // 비활성화 버튼 색상
      TB3: '#E9F0F9',   // 비활성화 제출 버튼 색상
      R400: '#FF3B30',  // 에러 색상
      G300: '#ddd',     // 경계선 색상
      G600: '#666',     // 설명 텍스트 색상
      G200: '#eee',     // 밝은 회색
    }
  }
};

const ThemeContext = createContext({
  theme: THEMES.light,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEMES.light);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.theme;
};

export default ThemeProvider; 