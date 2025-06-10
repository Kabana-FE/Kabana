import { create } from 'zustand';

import { createModalSlice } from './slices/modalSlice';
import type { ModalSlice } from './types/modalSlice';

const useKabanaStore = create<ModalSlice>()((...args) => ({
  ...createModalSlice(...args),
}));

export default useKabanaStore;
