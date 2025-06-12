import type { User } from './user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}
