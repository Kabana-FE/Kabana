import type { StateCreator } from 'zustand';

export interface ModalSlice {
  toggleModal: boolean;
  setToggleModal: () => void;
}

export const createModalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = (set) => ({
  toggleModal: false,
  setToggleModal: () => set((state) => ({ toggleModal: !state.toggleModal })),
});
