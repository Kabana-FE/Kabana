import { twMerge } from 'tailwind-merge';

import type { TextInputProps } from '@/components/common/input/types';

const Text = ({ type = 'text', className, leftIcon, rightIcon, isInvalid, ref, ...props }: TextInputProps) => {
  return (
    <div className='relative w-full'>
      {leftIcon && (
        <div className='absolute top-1/2 left-16 flex -translate-y-1/2 items-center justify-center'>{leftIcon}</div>
      )}

      <input
        ref={ref}
        className={twMerge(
          'block h-50 w-full rounded-lg border px-16 py-12 text-lg text-gray-700 placeholder-gray-400 transition-all duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:ring-capybara focus:outline-none',
          leftIcon && 'pl-45',
          rightIcon && 'pr-45',
          isInvalid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
          className,
        )}
        type={type}
        {...props}
      />

      {rightIcon && (
        <div className='absolute top-1/2 right-16 flex -translate-y-1/2 items-center justify-center'>{rightIcon}</div>
      )}
    </div>
  );
};

export default Text;
