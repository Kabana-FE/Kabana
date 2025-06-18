import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import createAuthSlice from './slices';
import type { AuthSlice } from './types';

export const useKabanaStore = create<AuthSlice>()(
  persist(
    (...args) => ({
      ...createAuthSlice(...args),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);
