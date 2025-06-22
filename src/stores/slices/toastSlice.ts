import type { StateCreator } from 'zustand';

import type { ToastSlice, ToastState } from '@/stores/types';

/**
 * @description 토스트 알림 기능을 위한 Zustand 슬라이스를 생성합니다.
 *
 * 이 슬라이스는 전역에 토스트 목록(toasts)을 저장하고,
 * `addToast`를 통해 새로운 토스트를 추가하며,
 * 일정 시간 후 자동으로 해당 토스트를 제거합니다.
 *
 * - `addToast(message, type?, duration?)`
 *   새로운 토스트를 추가합니다. 기본 타입은 'info', 기본 지속 시간은 3000ms입니다.
 *   내부적으로 crypto.randomUUID()를 생성하여 토스트를 식별하고, duration 후 `removeToast`로 자동 제거됩니다.
 *
 * - `removeToast(id)`
 *   특정 토스트 ID를 기준으로 해당 토스트를 상태에서 제거합니다.
 *
 * @returns Zustand용 `ToastSlice` 객체
 */
const createToastSlice: StateCreator<ToastSlice, [], [], ToastSlice> = (set, get) => ({
  toasts: [],
  addToast: (message: string, type = 'info', duration = 3000) => {
    const id = crypto.randomUUID();
    const newToast: ToastState = { id, message, type, duration };
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    setTimeout(() => {
      get().removeToast(id);
    }, duration);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
});

export default createToastSlice;
