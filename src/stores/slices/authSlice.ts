import type { StateCreator } from 'zustand';

import type { AuthSlice } from '@/stores/types';

const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  accessToken: null,
  user: null,
  isLoggedIn: false,

  setAccessToken: (token) => set({ accessToken: token, isLoggedIn: true }),
  setUser: (user) => set({ user }),
  clearAuth: () => set({ accessToken: null, user: null, isLoggedIn: false }),
});

export default createAuthSlice;
