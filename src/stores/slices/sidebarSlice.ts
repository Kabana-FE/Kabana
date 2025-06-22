import type { StateCreator } from 'zustand';

import type { SidebarSlice } from '@/stores/types';

const createSidebarSlice: StateCreator<SidebarSlice, [], [], SidebarSlice> = (set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
});

export default createSidebarSlice;
