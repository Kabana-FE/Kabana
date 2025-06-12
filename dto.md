Data Transfer Object:
서버와 클라이언트 간에 주고받는 데이터의 구조를 정의한 객체(어떤 속성들이 있고 각 속성의 타입은 무엇인지)

백엔드 명세를 기반으로 정의한 타입들입니다.

작성 목적:

1.  백엔드에서 받은 명세(raw)를 보기 편하게 기록/보존합니다.
2.  API 요청/응답 타입 설계 참고용으로 사용합니다.
3.  Zod schema 정의 시 참고용으로 사용합니다.

⚠️ 실제 런타임 유효성 검사는 Zod schema에서 수행되며,
이 파일은 TypeScript의 타입 검사를 위한 참고 용도로만 사용됩니다.

```ts
// 🗂️ 사용자 정보
/** From Server 사용자 데이터 구조입니다.*/
export interface UserServiceResponseDto {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

/** To server 사용자 정보 수정 요청 시 사용하는 데이터 구조입니다. */
export interface UpdateMyInfoRequestDto {
  nickname?: string;
  profileImageUrl?: string | null;
}

// 🗂️ Auth
/** To server 회원가입 요청 시 보내는 데이터 구조입니다. */
export interface CreateUserRequestDto {
  email: string;
  nickname: string;
  password: string;
}

/** To Server 로그인 요청 시 보내는 데이터 구조입니다. */
export interface LoginRequestDto {
  email: string;
  password: string;
}

/** To Server 비밀번호 변경 요청 시 보내는 데이터 구조입니다. */
export interface ChangePasswordRequestDto {
  password: string;
  newPassword: string;
}

// 🗂️ 대시보드
/** From Server 대시보드 정보 데이터 구조입니다.  */
export interface DashboardApplicationServiceResponseDto {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

/** To Server 대시보드 생성 요청 시 보내는 데이터 구조입니다.  */
export interface CreateDashboardRequestDto {
  title: string;
  color: string;
}

/**  To server 대시보드 목록 조회 시 사용하는 페이지네이션 방식 타입입니다. */
export type NavigationMethod = 'infiniteScroll' | 'pagination';

/** To server 서버에 대시보드 목록 조회 요청 시 사용하는 데이터 구조입니다.  */
export interface FindDashboardsRequestDto {
  navigationMethod: NavigationMethod;
  cursorId?: number;
  page?: number;
  size?: number;
}

/** To Server 대시보드 수정 요청 시 보내는 데이터 구조입니다. */
export interface UpdateDashboardRequestDto {
  title?: string;
  color?: string;
}

// 🗂️ 컬럼
/** From Server 컬럼 정보 데이터 구조입니다.  */
export interface ColumnServiceResponseDto {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

/** To Server 컬럼 생성 요청 시 보내는 데이터 구조입니다. */
export interface CreateColumnRequestDto {
  title: string;
  dashboardId: number;
}

/** From Server 컬럼 목록 응답 시 사용되는 데이터 구조입니다.  */
export interface ResponsePayloadColumnServiceResponseDtoArray {
  result: 'SUCCESS';
  data: ColumnServiceResponseDto[] | null;
}

/** To Server 특정 대시보드의 컬럼 목록을 조회할 때 사용하는 요청 데이터 구조입니다. */
export interface FindColumnsRequestDto {
  dashboardId: number;
}

/** To Server 컬럼 제목 수정 요청 시 보내는 데이터 구조입니다.  */
export interface UpdateColumnRequestDto {
  title: string;
}

// 🗂️ 카드
/** From Server 카드 담당자 정보 데이터 구조입니다. */
export interface AssigneeDto {
  profileImageUrl?: string | null;
  nickname: string;
  id: number;
}

/** From Server 카드 상세 데이터 구조입니다.  */
export interface CardServiceResponseDto {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate?: string | null;
  assignee?: AssigneeDto | null;
  imageUrl?: string | null;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

/** To Server 카드 생성 요청 시 보내는 데이터 구조입니다.  */
export interface CreateCardRequestDto {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
}

/** To Server 카드 목록 조회 요청 시 사용하는 쿼리 파라미터 구조입니다.  */
export interface FindCardsRequestDto {
  size?: number;
  cursorId?: number;
  columnId: number;
}

/** To Server 카드 수정 요청 시 보내는 데이터 구조입니다.  */
export interface UpdateCardRequestDto {
  columnId?: number;
  assigneeUserId?: number | null;
  title?: string;
  description?: string;
  dueDate?: string | null;
  tags?: string[];
  imageUrl?: string | null;
}

// 🗂️ 댓글
/** From Server 댓글 작성자의 정보를 포함한 데이터 구조입니다.  */
export interface CommentAuthorDto {
  profileImageUrl?: string | null;
  nickname: string;
  id: number;
}

/** From Server 댓글 데이터 구조입니다.  */
export interface CommentServiceDto {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: CommentAuthorDto;
}

/** To Server 댓글 생성 요청 시 보내는 데이터 구조입니다. */
export interface CreateCommentRequestDto {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

/** To Server 댓글 목록 조회 요청 시 사용하는 데이터 구조입니다.  */
export interface FindCommentsRequestDto {
  size?: number;
  cursorId?: number;
  cardId: number;
}

/** To Server 댓글 수정 요청 시 보내는 데이터 구조입니다.  */
export interface UpdateCommentRequestDto {
  content: string;
}

// 🗂️ 초대
/** From Server 초대 관련 사용자 정보를 담는 데이터 구조입니다.  */
export interface InvitationUserDto {
  nickname: string;
  email: string;
  id: number;
}

/** From Server 초대 정보 데이터 구조입니다. */
export interface InvitationServiceResponseDto {
  id: number;
  inviter: InvitationUserDto;
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: InvitationUserDto;
  inviteAccepted?: boolean | null;
  createdAt: string;
  updatedAt: string;
}

/** To server 초대 생성 요청 시 보내는 데이터 구조입니다. */
export interface CreateDashboardInvitationRequestDto {
  email: string;
}

/** To server 초대 목록 조회 요청 시 사용하는 데이터 구조입니다.  */
export interface FindDashboardInvitationsRequestDto {
  page?: number;
  size?: number;
}

/** To server 초대 목록 필터링 요청 시 사용하는 데이터 구조입니다.  */
export interface FindInvitationsRequestDto {
  size?: number;
  cursorId?: number;
  title?: string;
}

/** To server 초대 수락/거절 여부 수정 요청 시 사용하는 데이터 구조입니다.  */
export interface UpdateInvitationRequestDto {
  inviteAccepted: boolean;
}

// 🗂️ 멤버
/** From Server 대시보드 멤버 정보 데이터 구조입니다.  */
export interface MemberApplicationServiceResponseDto {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

/** To server 대시보드 멤버 목록 조회 요청 시 사용하는 데이터 구조입니다.  */
export interface FindMembersRequestDto {
  page?: number;
  size?: number;
  dashboardId: number;
}

// 🗂️ 오류 응답
/** From Server 오류 응답 시 사용하는 데이터 구조입니다. */
export interface ErrorResponsePayload {
  message: string;
}
```
