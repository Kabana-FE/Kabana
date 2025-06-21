import { useKabanaStore } from '@/stores';

/**
 * @description Zustand로 구현된 토스트 상태를 사용하는 커스텀 훅입니다.
 *
 * 전역 상태의 `addToast`와 `removeToast`를 가져와,
 * 사용자가 빠르게 다양한 유형의 토스트(success, error, info, warning)를 호출할 수 있도록 도와줍니다.
 *
 * @returns
 * - `addToast(message, type?, duration?)`: 원하는 유형의 토스트를 수동으로 추가
 * - `removeToast(id)`: 특정 토스트를 ID 기준으로 제거
 * - `showSuccess(message, duration?)`: 성공 토스트 표시 (type: `'success'`)
 * - `showError(message, duration?)`: 에러 토스트 표시 (type: `'error'`)
 * - `showInfo(message, duration?)`: 정보 토스트 표시 (type: `'info'`)
 * - `showWarning(message, duration?)`: 경고 토스트 표시 (type: `'warning'`)
 *
 * @example
 * ```ts
 * const { showError } = useToast();
 * showError('저장에 실패했습니다.', 5000);
 * ```
 */
export const useToast = () => {
  const addToast = useKabanaStore((state) => state.addToast);
  const removeToast = useKabanaStore((state) => state.removeToast);
  const showSuccess = (message: string, duration?: number) => addToast(message, 'success', duration);
  const showError = (message: string, duration?: number) => addToast(message, 'error', duration);
  const showInfo = (message: string, duration?: number) => addToast(message, 'info', duration);
  const showWarning = (message: string, duration?: number) => addToast(message, 'warning', duration);
  return { addToast, removeToast, showSuccess, showError, showInfo, showWarning };
};
