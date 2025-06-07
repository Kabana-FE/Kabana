// icon 수정 예정(임시로 설정)
import arrowBackward from '@/assets/icons/arrow_backward.svg';
import arrowForward from '@/assets/icons/arrow_forward.svg';

import type { PagenationButtonProps } from './types';

const PagenationButton = ({ direction, isDisabled, onButtonClick }: PagenationButtonProps) => {
  const directionMap = {
    left: {
      icon: arrowBackward,
      alt: '이전 페이지',
      style: 'rounded-l-sm',
    },
    right: {
      icon: arrowForward,
      alt: '다음 페이지',
      style: 'rounded-r-sm',
    },
  } as const;
  const { icon, alt, style } = directionMap[direction];

  return (
    <button
      className={`${style} size-40 cursor-pointer border border-gray-300`}
      disabled={isDisabled}
      onClick={onButtonClick}
    >
      <img alt={alt} className='m-auto size-16' src={icon} />
    </button>
  );
};

export default PagenationButton;
