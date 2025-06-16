import { createPortal } from 'react-dom';

import useKabanaStore from '@/stores/store';

import Toast from './Toast';

/**
 * @description 전역 토스트 알림을 렌더링하는 Provider 컴포넌트입니다.
 *
 * Zustand 전역 상태에서 `toasts` 배열을 구독하고, 각 토스트를 `<Toast />` 컴포넌트로 렌더링합니다.
 *
 * 렌더링은 `createPortal`을 통해 HTML의 `#toast-root` 요소에 삽입되며,
 * DOM 계층 구조와 무관하게 항상 화면의 우측 상단 고정 위치에서 토스트가 표시됩니다.
 *
 * - `toasts.length === 0`인 경우 아무것도 렌더링하지 않습니다.
 * - 기본 위치는 `fixed top-4 right-4`, `z-[9999]`로 다른 UI 위에 표시됩니다.
 * - `#toast-root`가 존재하지 않는 경우 콘솔에 에러를 출력하고 렌더링하지 않습니다.
 *
 * @returns 전역 토스트 목록을 포탈로 렌더링하는 컴포넌트
 *
 *
 * @example
 * ```tsx
 * <ToastProvider />
 * ```
 * @see public/index.html 내 `<div id="toast-root"></div>` 필요
 */
const ToastProvider = () => {
  const toasts = useKabanaStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  const toastRoot = document.getElementById('toast-root');
  if (!toastRoot) {
    console.error("🩺 The DOM element with id 'toast-root' was not found.");
    return null;
  }

  return createPortal(
    <div className='fixed top-4 right-4 z-[9999] flex flex-col gap-3'>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>,
    toastRoot,
  );
};

export default ToastProvider;
