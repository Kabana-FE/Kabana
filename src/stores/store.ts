import { create } from 'zustand';

import { createModalSlice, createToastSlice } from './slices';
import type { ModalSlice, ToastSlice } from './types';

type CombinedSlices = ModalSlice & ToastSlice;

const useKabanaStore = create<CombinedSlices>()((...args) => ({
  ...createModalSlice(...args),
  ...createToastSlice(...args),
}));

export default useKabanaStore;
