import type { StateCreator } from 'zustand';

export interface ModalSlice {
  modalToggle: boolean;
  setModalToggle: () => void;
}

export const createModalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = (set) => ({
  modalToggle: false,
  setModalToggle: () => set((state) => ({ modalToggle: !state.modalToggle })),
});
