import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import createAuthSlice from './slices/authSlice';
import createSidebarSlice from './slices/sidebarSlice';
import createToastSlice from './slices/toastSlice';
import type { BoundState } from './types';

export const useKabanaStore = create<BoundState>()(
  persist(
    (...args) => ({
      ...createAuthSlice(...args),
      ...createSidebarSlice(...args),
      ...createToastSlice(...args),
    }),
    {
      name: 'kabana-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        isSidebarOpen: state.isSidebarOpen,
      }),
    },
  ),
);
