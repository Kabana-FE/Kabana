import { twMerge } from 'tailwind-merge';

import type ButtonProps from './types';

const buttonVariants = {
  filled: 'bg-capybara text-white hover:opacity-90',
  outlined: 'border border-gray-300 bg-white text-capybara hover:border-capybara',
};

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
