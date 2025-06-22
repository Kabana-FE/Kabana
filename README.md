![kabana_logo](https://github.com/user-attachments/assets/3272c820-e8df-45d6-8f7b-86a26394abd6)

> **"카피바라처럼 느긋하게, 그래도 결국 해내는 우리."**  
> **"To-do doesn’t have to mean stress."**

### Kabana는 바쁜 일정을 관리하면서도 마음의 평화를 유지할 수 있도록 디자인된 작업 관리 웹 애플리케이션입니다.  
재사용성과 유지보수성을 위해 컴포넌트 기반 아키텍처를 활용하여 **React**, **Vite**, **TypeScript**로 구축되었습니다.  
깔끔한 UI, Zustand를 통한 강력한 데이터 관리, Axios 및 React Router의 데이터 로딩/뮤테이션 기능을 활용한 효율적인 API 상호 작용이 특징입니다.


---

![image](https://github.com/user-attachments/assets/f79cb057-8ff3-4685-8c3e-48a073188bb2)

<table>
  <tr>
    <td>
      - 내 대시보드 페이지<br>
      - 로딩 UI (SkeletonUI)<br>
      - 공통 컴포넌트: Button, Header <br>
      - 🎬 영상 제작<br>
      - 🚀 배포<br>
    </td>
    <td>
      - 라우터 설정<br>
      - API 관리<br>
      - 에러 처리 & 에러 페이지<br>
      - Splash, PendingUI, Spinner<br>
      - 공통 컴포넌트: <br>
        Sidebar, Popover, Dropdown, Toaster, Tooltip<br>
      - 📘 README 작성
    </td>
    <td>
      - 대시보드 상세 페이지<br>
      - 모달: 할 일 생성, 수정, 카드 보기<br>
      - 공통 컴포넌트: Modal<br>
      - 📢 발표
    </td>
    <td>
      - 프로젝트 세팅<br>
      - 로그인 페이지<br>
      - 회원가입 페이지<br>
      - 공통 컴포넌트: Input<br>
      - 🚀 배포<br>
      - 📽 PPT 제작
    </td>
    <td>
      - 랜딩 페이지<br>
      - 마이페이지<br>
      - 대시보드 수정 페이지<br>
      - 모달: 대시보드 생성, 새 컬럼 생성, 컬럼 수정, 초대하기<br>
      - 공통 컴포넌트: Pagination, Footer
      - 📽 데이터 입력 
    </td>
  </tr>
</table>

---
## 설계 포인트 & 주요 개선 사항

### UI/UX 설계 포인트
- 사이드바 토글 여부 저장
- 빠른 네트워크에서 로딩 상태UI 표시 

### 개발 생산성 & 품질 향상
 - 폴더 및 파일 컨벤션 정리 → 유지보수성과 코드 가독성 향상<br>
 - [PR 리뷰](https://github.com/Kabana-FE/Kabana/pulls?q=is%3Apr+is%3Aclosed)와 [데일리 스크럼](https://github.com/Kabana-FE/Kabana/discussions/categories/6%EC%9B%94-7%EC%9D%BC), [디스커션](https://github.com/Kabana-FE/Kabana/discussions) 등 다양한 커뮤니케이션 적극 활용 → 애자일 협업 방식으로 코드 품질 향상, 효율 증대<br>

<!-- 
### 트러블슈팅

> 🌟 [더 많은 트러블 슈팅을 보고싶다면 이곳을 클릭해 확인하세요.](https://github.com/Kabana-FE/Kabana/discussions/categories/trouble-shooting)
>
> | 문제 상황                                                                                         | 해결 방법                                                  | 작성자 |
> | :------------------------------------------------------------------------------------------------ | :--------------------------------------------------------- | :----- |
> | [](https://github.com/StarSync-FE/StarSync/discussions/67)                          | Axios Interceptor로 30초 동안 자동 재시도                  | 송시은 |
> | [로딩 상태 관리<br>- splash screen 이슈](https://github.com/StarSync-FE/StarSync/discussions/138) | Splash Screen 종료 타이밍을 navigation state 기반으로 제어 | 송시은 |
> | [스타일 린트 설정 문제](https://github.com/StarSync-FE/StarSync/discussions/134)                  | lefthook 코드 품질 관리 자동화 시도                        | 박지섭 |
> | [에러 바운더리 적용 범위 설정](https://github.com/StarSync-FE/StarSync/discussions/300)           | Global / API / Render 에러 바운더리를 명확히 분리 적용     | 송시은 |
> | [Git 이전 커밋 수정 방법 문제](https://github.com/StarSync-FE/StarSync/discussions/71)            | `git rebase -i`, `git reset --soft` 명령어를 활용          | 전유진 |
> | [export default 충돌 문제](https://github.com/StarSync-FE/StarSync/discussions/98)                | default as 로 통일하여 모듈 충돌 방지                      | 전유진 |
> | [facepaint 사용 관련 이슈](https://github.com/StarSync-FE/StarSync/discussions/314)               | null병합 연산자 사용 관리                                  | 조인성 |

### TIL

> 🌟 [더 많은 TIL을 보고 싶다면 이곳을 클릭해 확인하세요.](https://github.com/Kabana-FE/Kabana/discussions/categories/til)
>
> | 제목                                                                                                          | 작성자                         |
> | :------------------------------------------------------------------------------------------------------------ | :----------------------------- |
> | [폴더 배럴 패턴을 적용하며 구조적 설계의 중요성 이해](https://github.com/StarSync-FE/StarSync/discussions/60) | 송시은                         |
> | [극단의 칼라 사용 지양 및 색상 조화 고려](https://github.com/StarSync-FE/StarSync/discussions/68)             | 송시은, 박지섭                 |
> | [SPA 구조 설계 시 시멘틱 태그 계층화 고려](https://github.com/StarSync-FE/StarSync/discussions/61)            | 송시은, 전유진                 |
> | [모달 컴포넌트 관리 위치의 중요성 인식](https://github.com/StarSync-FE/StarSync/discussions/63)               | 송시은, 손수진, 전유진, 조인성 |
> | [프로젝트 협업에서 배운 점](https://github.com/StarSync-FE/StarSync/discussions/74)                           | 전유진, 손수진                 |
> | [동일 페이지 navigation 클릭 시 새로고침 여부 결정](https://github.com/StarSync-FE/StarSync/discussions/306)  | 송시은, 박지섭                 |
> | [useLoaderData()를 사용했을 때 최신 상태 반영](https://github.com/StarSync-FE/StarSync/discussions/323)       | 조인성                         |
이 부분은 주석입니다. 마크다운 렌더링 시 출력되지 않음 -->

### 팀 회고

- [팀 회고 보러 가기](https://github.com/Kabana-FE/Kabana/discussions/138)



---

### 프로젝트 관리(GitHub Projects)
- [칸반보드](https://github.com/orgs/Kabana-FE/projects/3/views/1) 
- [로드맵](https://github.com/orgs/Kabana-FE/projects/3/views/4) 

GitHub Projects를 적극 활용하며 이슈 기반으로 작업을 관리하고, 칸반보드로 각 작업의 진행상태를 실시간으로 트래킹하였습니다. <br>
또한 주요 기능 완성 목표를 마일스톤으로 설정하여 프로젝트 전체 일정을 관리하였습니다. 팀 작업의 가시성과 체계성을 높였습니다.

---

### 프로젝트 리소스

🔗 [기반 디자인(Figma) Kabana](https://www.figma.com/design/O0wvflDySgeIdkzzoEq1qa/Kabana?node-id=0-1&p=f&t=JIlWjJxoneJvCJZb-0)<br>
🔗 [기반 디자인(Figma) Taskify](https://www.figma.com/design/O0wvflDySgeIdkzzoEq1qa/Kabana?node-id=0-1&p=f&t=FL3yVfKPruMCBwwv-0)<br>
🔗 [Docs (스타일 가이드, 브랜치 전략 등)](https://github.com/Kabana-FE/Kabana/discussions/categories/docs-convention-r-r-etc)<br>
🔗 [전체 프로젝트 문서(Notion)](https://brazen-gopher-e81.notion.site/Kabana-1f4692e2f1d0800a979fce7058096a33?source=copy_link)<br>
🔗 [엔지니어링 breakdown](https://github.com/Kabana-FE/Kabana/discussions/categories/engineering-breakdown)<br>

---

### 주요 기능

- **사용자 인증**: 안전한 회원가입, 로그인, 비밀번호 변경 기능을 제공합니다.
- **대시보드 관리**: 대시보드를 생성, 조회, 편집, 삭제할 수 있습니다. 사용자는 대시보드 내에서 멤버 및 초대도 관리할 수 있습니다.
- **컬럼 관리**: 대시보드 내에서 작업을 구성하기 위해 컬럼을 생성, 편집, 삭제할 수 있습니다.
- **카드(작업) 관리**: 컬럼 내에서 카드를 추가, 상세 조회, 편집, 삭제할 수 있습니다. 카드는 제목, 설명, 마감일, 담당자, 태그, 이미지를 포함할 수 있습니다.
- **댓글**: 개별 카드에 댓글을 추가, 편집, 삭제할 수 있습니다.
- **사용자 프로필 관리**: 닉네임 및 프로필 이미지를 포함한 개인 정보를 조회 및 업데이트하고 비밀번호를 변경할 수 있습니다.
- **반응형 UI**: 다양한 화면 크기(모바일, 태블릿, 데스크톱)에 최적화되어 있습니다.
- **전역 상태 관리**: 효율적이고 확장 가능한 상태 관리를 위해 Zustand를 활용합니다.
- **툴팁**: 사이드바 기능에 모바일 대응 툴팁 제공. 데스크톱은 hover, 모바일은 long-press로 대응합니다.
- **에러 핸들링**: React Router Error Boundaries 및 커스텀 에러 표시 컴포넌트를 통한 중앙 집중식 에러 핸들링.
- **토스트 알림**: 다양한 작업 및 이벤트에 대한 사용자 친화적인 토스트 메시지.
- **무한 스크롤 및 페이지네이션**: 대시보드 초대 및 카드와 같은 대규모 목록의 효율적인 로딩.
- **접근성**: 적절한 시맨틱 HTML 및 ARIA 속성을 통한 접근성에 중점.
- **코드 품질**: ESLint 및 Prettier로 코드 스타일 관리, Commitlint와 Lefthook으로 커밋 메시지 규칙 준수.

---

### 사용 기술

- **핵심 스택**: React 19 + Vite 6.3.5 + TypeScript 5.8.3
- **패키지 매니저**: pnpm
- **라우팅**: React Router 7.6.2
- **상태 관리**: Zustand 5.0.5
- **API 클라이언트**: Axios 1.9.0
- **폼 & 유효성 검사**: React Hook Form 7.57.0 (Zod 유효성 검사 사용)
- **스타일링**: Tailwind CSS 4.1.8
- **코드 포맷팅**: Prettier 3.5.3
- **린팅**: ESLint 9.28.0
- **Git Hooks**: Lefthook 1.11.13, Lint-staged
- **배포**: Vercel

---


### 📁 디렉토리 
```bash
Kabana/
├── public/                 # 정적 자산
├── src/
│   ├── assets/             # 이미지, 아이콘, 폰트
│   ├── apis/               # API 서비스 모듈 (axios 인스턴스, 요청 함수)
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   ├── constants/          # 전역 상수 (경로, 메시지, UI 설정 등)
│   ├── hooks/              # 커스텀 React Hooks
│   ├── layouts/            # 페이지 레이아웃
│   ├── loaders/            # React Router 데이터 로더
│   ├── pages/              # 개별 페이지 컴포넌트
│   ├── router/             # 라우터 설정
│   ├── schemas/            # Zod 유효성 검사 스키마
│   ├── stores/             # Zustand 전역 상태 스토어
│   ├── utils/              # 유틸리티 함수
│   ├── App.tsx             # 메인 App 컴포넌트
│   ├── main.tsx            # 애플리케이션 진입점
│   └── index.css           # 전역 스타일 및 Tailwind 설정
└── lefthook.yml
```
