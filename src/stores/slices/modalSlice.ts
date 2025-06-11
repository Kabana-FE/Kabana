import type { StateCreator } from 'zustand';

import type { ModalSlice } from '../types/modalSlice';

export const createModalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = (set) => ({
  createTodo: false,
  editTodo: false,
  createColumn: false,
  editColumn: false,
  createDashboard: false,

  toggleCreateTodo: () => set((state) => ({ createTodo: !state.createTodo })),
  toggleEditTodo: () => set((state) => ({ editTodo: !state.editTodo })),
  toggleCreateColumn: () => set((state) => ({ createColumn: !state.createColumn })),
  toggleEditColumn: () => set((state) => ({ editColumn: !state.editColumn })),
  toggleCreateDashboard: () => set((state) => ({ createDashboard: !state.createDashboard })),
});
