import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { ToastTimerProps } from './types';

/**
 * ToastTimer 컴포넌트
 *
 * @description
 * 토스트 알림 하단에 표시되는 진행 바(progress bar)를 렌더링합니다.
 * 주어진 `duration` 동안 진행률을 100%에서 0%로 감소시키며,
 * 실시간으로 애니메이션되는 너비(`width`)를 통해 시각적으로 남은 시간을 표시합니다.
 *
 * 내부적으로 `requestAnimationFrame`을 사용하여 매 프레임마다 남은 시간을 계산하고,
 * `progress` 상태를 갱신합니다. 이로 인해 브라우저 성능에 최적화된 자연스러운 애니메이션이 제공됩니다.
 *
 * @param {number} duration - 진행 바가 감소할 총 시간 (밀리초 단위)
 * @param {boolean} isVisible - 토스트가 화면에 표시 중인지 여부. `true`일 때 타이머가 시작됩니다.
 * @param {string} color - 진행 바의 색상을 Tailwind CSS 클래스명으로 지정합니다. (예: 'bg-green-500')
 *
 * @returns {JSX.Element} 진행 바 UI 요소 (`<div>` 형태)
 *
 * @example
 * ```tsx
 * <ToastTimer duration={3000} isVisible={true} color="bg-green-500" />
 * ```
 *
 * @component
 */
const ToastTimer = ({ duration, isVisible, color }: ToastTimerProps) => {
  const [progress, setProgress] = useState(100);
  const frameIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, duration - elapsed);
      const nextProgress = (remaining / duration) * 100;

      setProgress(nextProgress);

      if (remaining > 0) {
        frameIdRef.current = requestAnimationFrame(animate);
      }
    };

    if (isVisible) {
      startTimeRef.current = Date.now();
      setProgress(100);
      frameIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [isVisible, duration]);

  return (
    <div className='absolute bottom-0 left-0 h-3 w-full bg-gray-300'>
      <div className={twMerge('linear h-full', color)} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ToastTimer;
