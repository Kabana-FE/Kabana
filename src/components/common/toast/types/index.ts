import type { ToastState } from '@/stores/types';

/**
 * @description 개별 토스트 컴포넌트에 전달되는 props입니다.
 *
 * - `toast`: 메시지, 타입, 지속 시간 등 토스트의 전체 정보가 담긴 객체
 */
export interface ToastProps {
  toast: ToastState;
}

/**
 * @description 토스트 자동 제거 타이머에 필요한 props입니다.
 *
 * - `duration`: 토스트가 유지될 시간 (밀리초 단위)
 * - `isVisible` : 토스트가 현재 보이는지 여부 (사라지는 애니메이션 중인지)
 * - `color`: 진행 바(progress bar)에 적용할 색상 (토스트 유형에 따라 달라짐)
 */
export interface ToastTimerProps {
  duration: number;
  isVisible: boolean;
  color: string;
}
