
기본 파일구조

src/
├── api/                 # Axios 인스턴스, API 요청 함수들
├── assets/              # 이미지, 로고, 글로벌 스타일 등 정적 자원
├── components/          # 재사용 가능한 컴포넌트들
│   └── common/          # 버튼, 인풋, 카드 등 범용 UI
├── layouts/             # 페이지 공통 레이아웃 (예: Navbar 포함 등)
├── pages/               # 라우트 단위 페이지들
│   ├── Login/
│   │   └── LoginPage.tsx
│   ├── Signup/
│   │   └── SignupPage.tsx
│   ├── Main/
│   │   └── MainPage.tsx
│   └── Settings/
│       └── SettingsPage.tsx
├── router/              # React Router 설정 (라우트 목록 등)
│   └── index.tsx
├── types/               # 전역에서 사용하는 타입
├── utils/               # 공통 함수
├── App.tsx              # 루트 컴포넌트
└── main.tsx             # 진입점
