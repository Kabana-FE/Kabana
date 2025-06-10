import { twMerge } from 'tailwind-merge';

import type ButtonProps from './types';

const buttonVariants = {
  filled: 'bg-capybara text-white hover:bg-[#653f3f] active:bg-[#4b2828]',
  outlined:
    'border border-gray-300 bg-white text-capybara hover:border-capybara hover:bg-[#f9f5f5] active:bg-[#f1e8e8]',
  none: '',
};
const buttonSizes = {
  sm: 'text-xs h-32 py-7 px-16',
  md: 'text-2lg h-50 py-12 px-26',
  lg: 'text-lg h-54 py-14 px-30',
};

/**
 * 공통 버튼 컴포넌트입니다.
 * 'variant'를 통해 스타일을 변경할 수 있고, 'size'로 버튼의 크기를 선택할 수 있습니다.
 *
 * @param {'filled'|'outlined'|'none'} variant 기본값은 'filled' 입니다.
 * @param {'sm'|'md'|'lg'} size 기본값은 'md' 입니다.
 * @param {string} className 추가적인 스타일을 받습니다.
 * @param {React.ReactNode} children 버튼의 내용을 받습니다.
 * @param {boolean} disabled 버튼을 비활성화할지 여부입니다.
 * @param {'button' | 'submit' | 'reset'} type 버튼의 타입을 받습니다. 기본값은 'button' 입니다.
 * @param {function} onButtonClick 버튼이 눌렸을 때 실행될 함수를 받습니다.
 * @param {React.Ref<HTMLButtonElement>} ref 버튼 요소에 접근하기 위한 React ref입니다.
 * @param {string} 접근성 향상을 위한 라벨 텍스트입니다.
 * @example
 * <SecondaryButton className='h-32 w-100 px-37 py-7 text-sm' variant='outlined'>
 *   버튼 내용이 들어갑니다.
 * </SecondaryButton>
 */

const Button = ({
  variant = 'filled',
  size = 'md',
  className,
  children,
  disabled,
  type = 'button',
  onButtonClick,
  ref,
  ariaLabel,
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      aria-label={ariaLabel}
      className={twMerge(
        'inline-flex cursor-pointer items-center justify-center rounded-sm font-medium whitespace-nowrap',
        'disabled:cursor-not-allowed disabled:border-none disabled:bg-gray-400 disabled:text-white',
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      disabled={disabled}
      type={type}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};
export default Button;
