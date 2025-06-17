import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { ToastTimerProps } from './types';

/**
 * @description 토스트 알림의 남은 표시 시간을 시각적으로 보여주는 진행 바 컴포넌트입니다.

`duration` 값(밀리초 기준)에 따라 진행 바가 점점 줄어들며,
지정된 시간이 지나면 0%가 되어 토스트가 제거될 준비가 되었음을 나타냅니다.

`requestAnimationFrame`을 사용하여 매 프레임마다 남은 시간을 계산하고,
이에 비례해 `progress` 상태를 갱신합니다.

동작 원리:
- `isVisible`이 `true`가 되면 현재 시간을 기준으로 타이머를 시작합니다.
- `duration`이 지날 때까지 `progress`를 100% → 0%로 점점 감소시킵니다.
- 진행률은 실시간으로 계산되며, 매 프레임마다 `setProgress`를 호출합니다.
- `progress`가 0 이하가 되면 `setProgress(0)`으로 고정하고, `requestAnimationFrame`을 명시적으로 중단합니다.
- `isVisible`이 `false`가 되거나 언마운트될 경우에도 애니메이션을 안전하게 정리(cleanup)합니다.

시각 구성:
- 배경 바 위에 색이 지정된 진행 바를 `color` 클래스로 표현합니다.
- 진행 바는 `width: ${progress}%` 방식으로 길이가 줄어듭니다.
- `transition-all duration-[10ms]`을 적용해 부드러운 줄어듦 효과를 제공합니다.
 * @param {number} duration - 토스트가 표시될 전체 시간 (ms 단위)
 * @param {boolean} isVisible - 토스트가 현재 화면에 보이는지 여부
 * @param {string} color - 진행 바 색상을 나타내는 Tailwind 클래스
 * @returns {JSX.Element} 하단에 위치한 진행 바 UI
 * @example <ToastTimer duration={3000} isVisible={true} color="bg-green-500" />
 */
const ToastTimer = ({ duration, isVisible, color }: ToastTimerProps) => {
  const [progress, setProgress] = useState(100);
  const animationFrameRef = useRef<number | null>(null); // requestAnimationFrame ID 저장
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isVisible) {
      startTimeRef.current = Date.now();
      setProgress(100);

      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current;
        console.log('Frame at', elapsed, 'ms');
        const remainingTime = Math.max(0, duration - elapsed);
        const newProgress = (remainingTime / duration) * 100;

        if (newProgress > 0) {
          setProgress(newProgress);
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setProgress(0);
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [duration, isVisible]);

  return (
    <div className='absolute bottom-0 left-0 h-3 w-full bg-gray-300'>
      <div
        className={twMerge('linear h-full transition-all duration-[10ms]', color)}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ToastTimer;

// 아래 코드는 지우지마세요~ 나중에 지울게요.
// import { useEffect, useRef, useState } from 'react';
// import { twMerge } from 'tailwind-merge';

// import type { ToastTimerProps } from './types';

/**
 * @description setTimeout을 사용한 토스트 타이머 컴포넌트입니다.
 * `progress`가 100%에서 0%까지 점점 줄어들며, 부드러운 시각 효과를 위해
 * 10ms 간격으로 업데이트됩니다.
 */
// const ToastTimer = ({ duration, isVisible, color }: ToastTimerProps) => {
//   const [progress, setProgress] = useState(100);
//   const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const startTimeRef = useRef<number>(0);

//   useEffect(() => {
//     const clear = () => {
//       if (timeoutIdRef.current) {
//         clearTimeout(timeoutIdRef.current);
//         timeoutIdRef.current = null;
//       }
//     };

//     if (isVisible) {
//       startTimeRef.current = Date.now();
//       setProgress(100);

//       const tick = () => {
//         const elapsed = Date.now() - startTimeRef.current;
//         console.log('Tick at', elapsed, 'ms');
//         const remainingTime = Math.max(0, duration - elapsed);
//         const newProgress = (remainingTime / duration) * 100;

//         if (newProgress > 0) {
//           setProgress(newProgress);
//           timeoutIdRef.current = setTimeout(tick, 10); // 약 100fps 수준
//         } else {
//           setProgress(0);
//           clear();
//         }
//       };

//       tick(); // 시작
//     } else {
//       clear(); // 숨겨질 때 중단
//     }

//     return clear; // 언마운트 시 중단
//   }, [duration, isVisible]);

//   return (
//     <div className='absolute bottom-0 left-0 h-3 w-full bg-gray-300'>
//       <div
//         className={twMerge('linear h-full transition-[width] duration-[10ms]', color)}
//         style={{ width: `${progress}%` }}
//       />
//     </div>
//   );
// };

// export default ToastTimer;
