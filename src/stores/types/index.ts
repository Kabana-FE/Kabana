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
 * 모든 Slice들을 통합한 전체 상태 타입
 * 이 타입을 통해 스토어의 모든 상태와 액션에 접근할 수 있습니다.
 */
export type BoundState = AuthSlice & SidebarSlice;
