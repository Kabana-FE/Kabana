// icon 수정 예정(임시로 설정)
import arrowBackward from '@/assets/icons/arrow_backward.svg';
import arrowForward from '@/assets/icons/arrow_forward.svg';

import type { PagenationButtonProps } from './types';

/**
 * 페이지네이션 버튼 컴포넌트입니다.
 * 방향(left 또는 right)에 따라 아이콘과 스타일이 다르게 적용됩니다.
 *
 * @param {'left' | 'right'} direction  - 버튼 방향
 * @param {boolean} isDisabled - 버튼 비활성화 여부
 * @param {() => void} onButtonClick - 버튼 클릭 시 호출되는 함수
 */

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
      className={`${style} size-36 cursor-pointer border border-gray-300 disabled:cursor-not-allowed tablet:size-40`}
      disabled={isDisabled}
      type='button'
      onClick={onButtonClick}
    >
      <img alt={alt} className='m-auto size-16' src={icon} />
    </button>
  );
};

export default PagenationButton;
