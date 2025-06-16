import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import CloseIcon from '@/assets/icons/CloseIcon';
import ErrorIcon from '@/assets/icons/ErrorIcon';
import InfoIcon from '@/assets/icons/InfoIcon';
import SuccessIcon from '@/assets/icons/SuccessIcon';
import WarningIcon from '@/assets/icons/WarningIcon';
import { useToast } from '@/hooks/useToast';

import ToastTimer from './ToastTimer';
import type { ToastProps } from './types';

/**
 * @description 단일 토스트 알림 UI 컴포넌트입니다.
 *
 * 토스트 메시지를 시각적으로 표시하며, 자동 제거와 슬라이드 인/아웃 애니메이션, 상태별 스타일링을 제공합니다.
 *
 * 주요 특징:
 * - `toast.message`를 텍스트로 출력하고, `toast.type`에 따라 색상, 아이콘, 타이틀이 동적으로 설정됩니다.
 * - `isVisible` 상태를 이용하여 토스트가 마운트되면 슬라이드 인(slide-in), 사라질 땐 슬라이드 아웃(slide-out) 애니메이션이 500ms 동안 실행됩니다.
 * - `useEffect`로 토스트가 나타난 뒤 `toast.duration`만큼(3000ms) 유지된 후 자동으로 사라지도록 처리됩니다.
 * - `ToastTimer` 하단 진행 바를 통해 토스트 알림이 사라지기까지 남은 시간을 시각적으로 표시합니다.
 * - 닫기 버튼(`CloseIcon`)을 클릭하면 수동으로 알림을 제거할 수 있습니다.
 *
 * 스타일 구성:
 * - `twMerge`를 통해 기본 Tailwind 스타일과 동적 스타일을 병합
 * - `border-l-8`과 타입별 색상을 조합하여 왼쪽 강조선 스타일
 * - `typeStyles`에서 `success`, `error`, `info`, `warning`, `default` 타입별로 title, 색상, 아이콘을 지정합니다.
 * - 반응형을 고려한 `min-w-300`, `max-w-400`
 *
 * @param {ToastProps} toast - 표시할 토스트 객체 (`id`, `message`, `type`, `duration` 포함)
 *
 * @returns JSX.Element - 알림 메시지 + 타이머 + 닫기 버튼이 포함된 UI 컴포넌트
 *
 * @example
 * <Toast toast={{ id: 'abc123', message: '저장되었습니다!', type: 'success', duration: 3000 }} />
 */

const typeStyles = {
  success: {
    border: 'border-l-green',
    color: 'bg-green',
    title: 'Success',
    icon: <SuccessIcon />,
  },
  error: {
    border: 'border-l-red',
    color: 'bg-red',
    title: 'Error',
    icon: <ErrorIcon />,
  },
  info: {
    border: 'border-l-blue',
    color: 'bg-blue',
    title: 'Info',
    icon: <InfoIcon />,
  },
  warning: {
    border: 'border-l-orange',
    color: 'bg-orange',
    title: 'Warning',
    icon: <WarningIcon />,
  },
};

const Toast = ({ toast }: ToastProps) => {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const animationDuration = 500;

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      const removeTimer = setTimeout(() => {
        removeToast(toast.id);
      }, animationDuration);
      return () => clearTimeout(removeTimer);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.duration, toast.id, removeToast]);

  const handleClose = () => {
    setIsVisible(false);
    const removeTimer = setTimeout(() => {
      removeToast(toast.id);
    }, animationDuration);
    return () => clearTimeout(removeTimer);
  };

  const currentTypeStyle = typeStyles[toast.type];

  return (
    <div
      className={twMerge(
        'rounded-sm bg-white py-5 pr-9 pl-6 shadow-lg',
        'transform transition-all duration-500 ease-in-out',
        'flex min-w-300 items-center justify-between',
        'max-w-400 break-words', // break-words는 index.css에 추가되면 삭제할 예정
        isVisible ? 'translate-x-0' : 'translate-x-[calc(100%+30px)]',
        currentTypeStyle.border,
        'border-l-8',
      )}
      role='alert'
    >
      <div className='flex items-center gap-2'>
        {currentTypeStyle.icon && (
          <div className={twMerge('flex size-6 items-center justify-center rounded-full p-4', currentTypeStyle.color)}>
            {currentTypeStyle.icon}
          </div>
        )}
        <div className='mx-5 flex flex-col'>
          <span className='text-md font-bold text-gray-800'>{currentTypeStyle.title}</span>
          <span className='text-lg text-gray-800'>{toast.message}</span>
        </div>
      </div>
      {/*아이콘을 넣은 버튼들도 컴포넌트화하는게 좋을거 같음 - Close 버튼  */}
      <button
        className='absolute top-2.5 right-4 cursor-pointer p-1 opacity-70 hover:opacity-100'
        onClick={handleClose}
      >
        <CloseIcon color='var(--color-gray-500)' size={12} />
      </button>
      <ToastTimer color={currentTypeStyle.color} duration={toast.duration} isVisible={isVisible} />
    </div>
  );
};

export default Toast;
