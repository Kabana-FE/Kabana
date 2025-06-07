import type { StateCreator } from 'zustand';

export interface ModalSlice {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const createModalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = (set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
});
