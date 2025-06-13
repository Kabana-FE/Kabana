import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AuthState } from './types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isLoggedIn: false,
      setAccessToken: (token) => set({ accessToken: token, isLoggedIn: true }),
      setUser: (user) => set({ user: user }),
      clearAuth: () => set({ accessToken: null, user: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
