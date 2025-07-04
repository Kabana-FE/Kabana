![kabana_logo](https://github.com/user-attachments/assets/3272c820-e8df-45d6-8f7b-86a26394abd6)

> **카피바라처럼 느긋하게, 그래도 결국 해내는 우리**

Kabana는 바쁜 일정을 관리하면서도 마음의 평화를 유지할 수 있도록 디자인된 작업 관리 칸반보드 웹 애플리케이션입니다.  
재사용성과 유지보수성을 위해 컴포넌트 기반 아키텍처를 활용하여 **React**, **Vite**, **TypeScript**로 구축되었습니다.  
깔끔한 UI, Zustand를 통한 강력한 데이터 관리, Axios 및 React Router의 데이터 로딩/뮤테이션 기능을 활용한 효율적인 API 상호 작용이 특징입니다.

---

<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/2d0d40c0-161b-4132-a465-08c028b42793" alt="카바나 팀" width="800" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/d77b6f80-4320-406f-9687-0df54615fc8a" alt="태식" width="700" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/b6d1becf-31e0-4cbf-8379-7e1d023c8d44" alt="시은" width="550" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/8bf4c47f-af75-4138-a1fd-b886d51eced5" alt="수진" width="750" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/08b5d4d3-dd62-49e9-9c15-f2bfb86f631a" alt="지섭" width="750"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/9cedeafe-a7b1-4c3a-a511-b0d542e58f78" alt="지현" width="650" />
    </td>
  </tr>
  <tr>
    <th>R&R</th>
    <td>이태식</td>
    <td>송시은</td>
    <td>손수진</td>
    <td>박지섭</td>
    <td>김지현</td>
  </tr>
  <tr>
    <td><strong>페이지</strong></td>
    <td>- 내 대시보드</td>
    <td>- 에러 페이지(ErrorDisplay, 404)</td>
    <td>- 대시보드 상세</td>
    <td>- 로그인<br>- 회원가입</td>
    <td>- 랜딩페이지<br>- 마이페이지<br>- 대시보드 수정</td>
  <tr>
    <td><strong>공통 컴포넌트, <br> 공통 로직</strong></td>
    <td>- Button<br>- Header<br>- SkeletonU<br>- 무한스크롤</td>
    <td>- Sidebar<br>- Popover<br>- Dropdown<br>- Toaster<br>- Tooltip<br>- Splash Screen<br>- PendingUI<br>- Loading Spinner</td>
    <td>- Template Modal<br>- 할일 생성 Modal<br>- 할일 수정 Modal<br>- 할일 카드 Modal(댓글)</td>
    <td>- Input<br>- SVG</td>
    <td>- Pagination<br>- Footer<br>- 대시보드 생성 Modal<br>- 컬럼 생성 Modal<br>- 컬럼 수정 Modal <br>- 초대하기 Modal</td>
  </tr>
  <tr>
    <td><strong>프로젝트 설정</strong></td>
    <td>- 배포</td>
    <td>- 라우터 설정 <br>- api 관리</td>
    <td></td>
    <td>- ESLint, Pretter 설정<br>- Lefthook 설정</td>
    <td></td>
  </tr>
  <tr>
    <td><strong>데모</strong></td>
    <td>- gif </td>
    <td>- README</td>
    <td>- 발표</td>
    <td>- PPT</td>
    <td>- 영상</td>
  </tr>
</table>

---

## <img src="https://github.com/user-attachments/assets/61948087-7b4b-4c9c-905a-fec9b11d9620" alt="깃털" width="30"/> 기술 스택

- **핵심 스택**: React 19 + Vite 6.3.5 + TypeScript 5.8.3
- **패키지 매니저**: pnpm
- **라우팅**: React Router 7.6.2 (DataAPI mode)
- **상태 관리**: Zustand 5.0.5
- **API 클라이언트**: Axios 1.9.0
- **폼 & 유효성 검사**: React Hook Form 7.57.0 (Zod 유효성 검사 사용)
- **스타일링**: Tailwind CSS 4.1.8
- **코드 포맷팅**: Prettier 3.5.3
- **린팅**: ESLint 9.28.0
- **Git Hooks**: Lefthook 1.11.13, Lint-staged
- **배포**: Vercel

---

## <img src="https://github.com/user-attachments/assets/61948087-7b4b-4c9c-905a-fec9b11d9620" alt="깃털" width="30"/> Engineering Breakdown

> ▶ [엔지니어링 breakdown](https://github.com/Kabana-FE/Kabana/discussions/categories/engineering-breakdown)<br>

- ***

## <img src="https://github.com/user-attachments/assets/61948087-7b4b-4c9c-905a-fec9b11d9620" alt="깃털" width="30"/> 트러블슈팅

> ▶ [더 많은 트러블 슈팅을 보고싶다면 이곳을 클릭해 확인하세요.](https://github.com/Kabana-FE/Kabana/discussions/categories/trouble-shooting)

<table>
  <thead>
    <tr>
      <th>문제 상황</th>
      <th>해결 방법</th>
      <th>작성자</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/StarSync-FE/StarSync/discussions/67">Axios 요청 실패 시 재시도 처리</a></td>
      <td>Axios Interceptor로 30초 동안 자동 재시도</td>
      <td>송시은</td>
    </tr>
    <tr>
      <td><a href="https://github.com/StarSync-FE/StarSync/discussions/138">로딩 상태 관리 - Splash Screen 이슈</a></td>
      <td>Splash Screen 종료 타이밍을 navigation state 기반으로 제어</td>
      <td>송시은</td>
    </tr>
    <tr>
      <td><a href="https://github.com/StarSync-FE/StarSync/discussions/134">스타일 린트 설정 문제</a></td>
      <td>lefthook 코드 품질 관리 자동화 시도</td>
      <td>박지섭</td>
    </tr>
    <tr>
      <td><a href="https://github.com/StarSync-FE/StarSync/discussions/300">에러 바운더리 적용 범위 설정</a></td>
      <td>Global / API / Render 에러 바운더리를 명확히 분리 적용</td>
      <td>송시은</td>
    </tr>
  </tbody>
</table>

## <img src="https://github.com/user-attachments/assets/61948087-7b4b-4c9c-905a-fec9b11d9620" alt="깃털" width="30"/> TIL

> ▶ [더 많은 TIL을 보고 싶다면 이곳을 클릭해 확인하세요.](https://github.com/Kabana-FE/Kabana/discussions/categories/til)

<table>
  <thead>
    <tr>
      <th>제목</th>
      <th>작성자</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="https://github.com/StarSync-FE/StarSync/discussions/60">
          폴더 배럴 패턴을 적용하며 구조적 설계의 중요성 이해
        </a>
      </td>
      <td>송시은</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/StarSync-FE/StarSync/discussions/68">
          극단의 칼라 사용 지양 및 색상 조화 고려
        </a>
      </td>
      <td>송시은, 박지섭</td>
    </tr>
  </tbody>
</table>
             |

---

## <img src="https://github.com/user-attachments/assets/61948087-7b4b-4c9c-905a-fec9b11d9620" alt="깃털" width="30"/> UX 개선 사항

- 사이드바 토글 여부 저장
- 빠른 네트워크에서 로딩 상태UI 표시

---

### 🪶 User Flow

시작 및 인증

```
🖥️ 랜딩 페이지
  ├─▶ '로그인' 클릭
  │     └─🔑 로그인 페이지
  └─▶ '회원가입' 클릭
        └─📝 회원가입 페이지
              └─▶ 가입 후 로그인 페이지
                     └─▶ 로그인 성공 → 📋 내 대시보드
```

대시보드 관리

```
📋 내 대시보드
  ├─▶ '+ 새로운 대시보드' 클릭
  │     └─➕ 대시보드 생성 모달
  │           └─▶ 생성 완료 → 📊 대시보드 상세
  └─▶ 기존 대시보드 선택 → 📊 대시보드 상세

📊 대시보드 상세
  └─▶ '관리' 버튼 클릭
        └─⚙️ 대시보드 수정 페이지
              ├─▶ '초대하기' → 📧 멤버 초대 모달
              ├─▶ 구성원 관리 (현재 페이지 유지)
              └─▶ 대시보드 삭제 → 📋 내 대시보드로 이동
```

작업 및 할 일 관리

```
📊 대시보드 상세
  ├─▶ '+ 새로운 컬럼 추가' → ➕ 컬럼 생성 모달 → 생성 → 돌아오기
  ├─▶ 컬럼 설정 클릭 → ✏️ 컬럼 수정/삭제 모달 → 수정/삭제
  ├─▶ '할 일 생성' 클릭 → ➕ 할 일 생성 모달 → 생성
  └─▶ 카드 클릭 → 📄 카드 상세 모달
        ├─▶ 댓글 추가/수정/삭제 (상세 모달 유지)
        ├─▶ '수정' → ✏️ 카드 수정 모달 → 수정 완료 → 돌아오기
        └─▶ '삭제' → 대시보드 상세로 돌아오기
```

계정 관리

```
👤 헤더 프로필 아이콘
  └─▶ 드롭다운 메뉴 선택
        ├─▶ '마이페이지' → 👤 마이페이지
        │     ├─▶ 프로필 수정
        │     ├─▶ 비밀번호 변경
        │     └─▶ '돌아가기' → 📋 내 대시보드
        └─▶ '로그아웃' → 🖥️ 랜딩 페이지
```

---

### 🪶 디렉토리

```
Kabana/
├── 📁 src/
│   ├── 📁 actions/          # React Router 액션 함수
│   ├── 📁 apis/             # API 요청 함수
│   ├── 📁 assets/           # 폰트, 아이콘, 이미지 등 정적 자원
│   ├── 📁 components/       # 재사용 가능한 UI 컴포넌트
│   ├── 📁 constants/        # 상수 (경로, 메시지, UI 설정)
│   ├── 📁 hooks/            # 커스텀 훅
│   ├── 📁 layouts/          # 페이지 레이아웃
│   ├── 📁 loaders/          # React Router 데이터 로더
│   ├── 📁 pages/            # 라우팅되는 페이지 컴포넌트
│   ├── 📁 router/           # 라우터 설정
│   ├── 📁 schemas/          # 데이터 유효성 검사 스키마 (Zod)
│   ├── 📁 stores/           # 전역 상태 관리 (Zustand)
│   ├── 📁 utils/            # 유틸리티 함수
│   ├── 📄 App.tsx           # 애플리케이션 최상위 컴포넌트
│   ├── 📄 index.css          # 전역 CSS 스타일
│   └── 📄 main.tsx          # 애플리케이션 진입점
├── 📄 .eslintrc.cjs        # ESLint 설정 파일
├── 📄 package.json         # 프로젝트 의존성 및 스크립트
├── 📄 tsconfig.json         # TypeScript 설정
└── 📄 vite.config.ts        # Vite 설정 파일
```

---

### 🪶 프로젝트 문서 & 디자인

🔗 [카바나 디자인(Figma) Kabana](https://www.figma.com/design/O0wvflDySgeIdkzzoEq1qa/Kabana?node-id=0-1&p=f&t=JIlWjJxoneJvCJZb-0)<br>
🔗 [기반 디자인(Figma) Taskify](https://www.figma.com/design/O0wvflDySgeIdkzzoEq1qa/Kabana?node-id=0-1&p=f&t=FL3yVfKPruMCBwwv-0)<br>
🔗 [Docs (스타일 가이드, 브랜치 전략 등)](https://github.com/Kabana-FE/Kabana/discussions/categories/docs-convention-r-r-etc)<br>
🔗 [전체 프로젝트 문서(Notion)](https://brazen-gopher-e81.notion.site/Kabana-1f4692e2f1d0800a979fce7058096a33?source=copy_link)<br>

---

### 🪶 프로젝트 관리

애자일 협업 방식을 기반으로 코드 품질과 작업 효율을 높였습니다.
<br>다양한 커뮤니케이션과 GitHub Projects를 적극 활용하며 이슈 기반으로 작업을 관리했습니다.
<br>또한, 정기적인 커뮤니케이션을 통해 팀 작업의 가시성과 협업 효율성을 높였습니다.

- [칸반보드](https://github.com/orgs/Kabana-FE/projects/3/views/1) – 작업 흐름을 실시간으로 트래킹
- [로드맵](https://github.com/orgs/Kabana-FE/projects/3/views/4) – 주요 기능과 일정 관리
- [PR 리뷰(+코드래빗)](https://github.com/Kabana-FE/Kabana/pulls?q=is%3Apr+is%3Aclosed) – 코드 품질 개선을 위한 상호 리뷰
- [데일리 스크럼](https://github.com/Kabana-FE/Kabana/discussions/categories/6%EC%9B%94-7%EC%9D%BC) – 매일 진행 상황 공유 및 협의
- [디스커션](https://github.com/Kabana-FE/Kabana/discussions) – 설계, 트러블슈팅, 회고 등 다양한 논의

---

### 🪶 팀 회고

- [팀 회고 보러 가기](https://github.com/Kabana-FE/Kabana/discussions/138)

---
