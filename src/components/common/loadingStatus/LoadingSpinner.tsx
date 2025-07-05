import { useEffect, useState } from 'react';

import DotIcon from '@/assets/icons/DotIcon';

import type { LoadingSpinnerProps } from './types';

/**
 * @description 세 개의 점이 순차적으로 튀어 오르는 애니메이션을 보여주는 로딩 스피너입니다.
 * index.css에 정의된 @keyframes 를 직접 사용합니다.
 *  `delay`를 주면 해당 시간(ms) 이후에만 나타납니다.
 */
const LoadingSpinner = ({ appearAfter = 1000 }: LoadingSpinnerProps) => {
  const [shouldRender, setShouldRender] = useState(appearAfter === 0);

  useEffect(() => {
    if (appearAfter === 0) return;

    const timer = setTimeout(() => {
      setShouldRender(true);
    }, appearAfter);

    return () => clearTimeout(timer);
  }, [appearAfter]);

  if (!shouldRender) return null;

  return (
    <div aria-label='로딩 중' className='flex items-center justify-center space-x-8' role='status'>
      <DotIcon className='animate-bounce-delay [animation-delay:-0.32s]' color='var(--color-capybara)' size={16} />
      <DotIcon className='animate-bounce-delay [animation-delay:-0.16s]' color='var(--color-capybara)' size={16} />
      <DotIcon className='animate-bounce-delay' color='var(--color-capybara)' size={16} />
    </div>
  );
};

export default LoadingSpinner;
