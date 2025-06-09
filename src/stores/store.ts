import { create } from 'zustand';

import type { ModalSlice } from './modalSlice';
import { createModalSlice } from './modalSlice';

const useKabanaStore = create<ModalSlice>()((...args) => ({
  ...createModalSlice(...args),
}));

export default useKabanaStore;
