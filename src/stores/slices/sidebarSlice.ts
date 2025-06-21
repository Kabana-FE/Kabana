import type { StateCreator } from 'zustand';

import type { BoundState, SidebarSlice } from '@/stores/types';

export const createSidebarSlice: StateCreator<BoundState, [], [], SidebarSlice> = (set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
});
