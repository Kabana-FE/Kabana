import type { User } from '@/schemas/auth';

/**
 * Zustand 상태 관리를 위한 Auth Slice 정의
 */
export interface AuthSlice {
  accessToken: string | null;
  user: User | null;
  isLoggedIn: boolean;

  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

/**
 * 사이드바 상태 관리를 위한 Slice 정의
 */
export interface SidebarSlice {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

/**
 * @description 하나의 토스트 알림 정보를 나타내는 상태 인터페이스입니다.
 *
 * - id: 각 토스트를 구분하기 위한 고유 ID
 * - message: 사용자에게 표시할 텍스트 메시지
 * - type: 토스트의 유형 ('success' | 'error' | 'info' | 'warning')
 * - duration: 토스트가 화면에 표시될 시간 (밀리초 단위)
 */
export interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration: number;
}

/**
 * @description 토스트 상태 배열과 토스트를 추가/제거하는 메서드를 포함한 상태 인터페이스입니다.
 *
 * - toasts: 현재 표시 중인 토스트 목록
 * - addToast: 새 토스트를 추가하는 메서드 (기본 type: 'info', 기본 duration: 구현에 따라)
 * - removeToast: ID를 기준으로 특정 토스트를 제거하는 메서드
 */
export interface ToastSlice {
  toasts: ToastState[];
  addToast: (message: string, type?: ToastState['type'], duration?: number) => void;
  removeToast: (id: string) => void;
}

/**
 * 모든 Slice들을 통합한 전체 상태 타입
 * 이 타입을 통해 스토어의 모든 상태와 액션에 접근할 수 있습니다.
 */
export type BoundState = AuthSlice & SidebarSlice & ToastSlice;
