import type { StateCreator } from 'zustand';

import type { ModalSlice } from '../types/modalSlice';

export const createModalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = (set) => ({
  createTodo: false,
  editTodo: false,
  createColumn: false,
  editColumn: false,
  createDashboard: false,
  cardDetail: false,
  deleteAlert: false,

  toggleCreateTodo: () => set((state) => ({ createTodo: !state.createTodo })),
  toggleEditTodo: () => set((state) => ({ editTodo: !state.editTodo })),
  toggleCreateColumn: () => set((state) => ({ createColumn: !state.createColumn })),
  toggleEditColumn: () => set((state) => ({ editColumn: !state.editColumn })),
  toggleCreateDashboard: () => set((state) => ({ createDashboard: !state.createDashboard })),
  toggleCardDetail: () => set((state) => ({ cardDetail: !state.cardDetail })),
  toggleDeleteAlert: () => set((state) => ({ deleteAlert: !state.deleteAlert })),
});
