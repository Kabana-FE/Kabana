import { twMerge } from 'tailwind-merge';

import type { ButtonProps } from './types';

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
  none: '',
};

/**
 * 공통 버튼 컴포넌트입니다.
 * 'variant'를 통해 스타일을 변경할 수 있고, 'size'로 버튼의 크기를 선택할 수 있습니다.
 * 'as'를 통해 렌더링될 HTML요소를 변경할 수 있으며, 기본적으로 'button'입니다.
 * 버튼인 경우 type의 기본값은 'button'입니다.
 *
 * @param {'filled'|'outlined'|'none'} variant 기본값은 'filled' 입니다.
 * @param {'sm'|'md'|'lg'|'none'} size 기본값은 'md' 입니다.
 * @param {React.ReactNode} children 버튼의 내용을 받습니다.
 * @param {React.ElementType} as 기본값은 'button'입니다.
 * @example
 * <Button size='sm' variant='outlined'>
 *   버튼 내용이 들어갑니다.
 * </Button>
 */

const Button = <T extends React.ElementType = 'button'>({
  as,
  children,
  variant = 'filled',
  size = 'md',
  type = 'button',
  className,
  ...props
}: ButtonProps<T>) => {
  const Component = as || 'button';
  return (
    <Component
      className={twMerge(
        'inline-flex cursor-pointer items-center justify-center rounded-sm font-medium whitespace-nowrap',
        'disabled:cursor-not-allowed disabled:border-none disabled:bg-gray-400 disabled:text-white',
        'transition-colors duration-200 ease-in-out',
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      type={Component === 'button' ? type : undefined}
      {...props}
    >
      {children}
    </Component>
  );
};
export default Button;
