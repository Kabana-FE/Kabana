import { create } from 'zustand';

import type { ModalSlice } from './modalSlice';
import { createModalSlice } from './modalSlice';

const useKabanaStore = create<ModalSlice>()((...a) => ({
  ...createModalSlice(...a),
}));

export default useKabanaStore;
