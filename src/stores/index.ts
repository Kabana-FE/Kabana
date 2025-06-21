import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createAuthSlice, createSidebarSlice, createToastSlice } from './slices';
import type { BoundState } from './types';

export const useKabanaStore = create<BoundState>()(
  persist(
    (...args) => ({
      ...createToastSlice(...args),
      ...createAuthSlice(...args),
      ...createSidebarSlice(...args),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        isSidebarOpen: state.isSidebarOpen,
      }),
    },
  ),
);
