import { twMerge } from 'tailwind-merge';

import type { TextInputProps } from '@/components/input/types';

const Text = ({ type = 'text', className, ...props }: TextInputProps) => {
  return (
    <input
      className={twMerge(
        'block h-50 w-full rounded-lg border border-gray-300 px-16 py-12 text-lg text-gray-700 placeholder-gray-400 transition-all duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:ring-capybara focus:outline-none',
        className,
      )}
      type={type}
      {...props}
    />
  );
};

export default Text;
