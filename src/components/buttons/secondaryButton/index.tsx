import { twMerge } from 'tailwind-merge';

import type ButtonProps from './types';

const buttonVariants = {
  filled: 'bg-capybara text-white hover:bg-[#653f3f] active:bg-[#4b2828]',
  outlined:
    'border border-gray-300 bg-white text-capybara hover:border-capybara hover:bg-[#f9f5f5] active:bg-[#f1e8e8]',
};

/**
 * secondary 버튼 컴포넌트입니다.
 * 'variant'를 통해 스타일을 변경할 수 있고, 'className'으로 버튼의 크기를 정해주어야 합니다.
 *
 * @param {'filled'|'outlined'} variant 기본값은 'filled' 입니다.
 * @param {string} className 추가적인 스타일을 받습니다.
 * @param {React.ReactNode} children 버튼의 내용을 받습니다.
 * @param {'button' | 'submit' | 'reset'} type 버튼의 타입을 받습니다. 기본값은 'button' 입니다.
 * @param {function} onButtonClick 버튼이 눌렸을 때 실행될 함수를 받습니다.
 * @example
 * <SecondaryButton className='h-32 w-100 px-37 py-7 text-sm' variant='outlined'>
 *   버튼 내용이 들어갑니다.
 * </SecondaryButton>
 */

const SecondaryButton = ({ variant = 'filled', className, children, type = 'button', onButtonClick }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'flex cursor-pointer items-center justify-center rounded-sm whitespace-nowrap',
        buttonVariants[variant],
        className,
      )}
      type={type}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};
export default SecondaryButton;
