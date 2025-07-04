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

## <img src="https://github.com/user-attachments/assets/61948087-7b4b-4c9c-905a-fec9b11d9620" alt="깃털" width="30"/> 설계 포인트 & 주요 개선 사항

### UI/UX 
- 사이드바 토글 여부 저장
- 빠른 네트워크에서 로딩 상태UI 표시 



--- 
## <img src="https://github.com/user-attachments/assets/61948087-7b4b-4c9c-905a-fec9b11d9620" alt="깃털" width="30"/> 트러블슈팅

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

## <img src="https://github.com/user-attachments/assets/61948087-7b4b-4c9c-905a-fec9b11d9620" alt="깃털" width="30"/> TIL

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





---
### <img src="https://github.com/user-attachments/assets/61948087-7b4b-4c9c-905a-fec9b11d9620" alt="깃털" width="30"/> User Flow

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

### 📁 디렉토리 


---
### <img src="https://github.com/user-attachments/assets/61948087-7b4b-4c9c-905a-fec9b11d9620" alt="깃털" width="30"/> 프로젝트 관리(GitHub Projects)
- [칸반보드](https://github.com/orgs/Kabana-FE/projects/3/views/1) 
- [로드맵](https://github.com/orgs/Kabana-FE/projects/3/views/4)

---
### 개발 생산성 & 품질 향상
 - 폴더 및 파일 컨벤션 정리 → 유지보수성과 코드 가독성 향상<br>
 - [PR 리뷰](https://github.com/Kabana-FE/Kabana/pulls?q=is%3Apr+is%3Aclosed)와 [데일리 스크럼](https://github.com/Kabana-FE/Kabana/discussions/categories/6%EC%9B%94-7%EC%9D%BC), [디스커션](https://github.com/Kabana-FE/Kabana/discussions) 등 다양한 커뮤니케이션 적극 활용 → 애자일 협업 방식으로 코드 품질 향상, 효율 증대<br>

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
### <img src="https://github.com/user-attachments/assets/61948087-7b4b-4c9c-905a-fec9b11d9620" alt="깃털" width="30"/>  팀 회고

- [팀 회고 보러 가기](https://github.com/Kabana-FE/Kabana/discussions/138)



---




