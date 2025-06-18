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
