import { twMerge } from 'tailwind-merge';

import type { TextAreaProps } from '@/components/common/input/types';

const TextArea = ({ className, type: _ignored, ...props }: TextAreaProps) => {
  return (
    <textarea
      className={twMerge(
        'block h-110 w-full resize-none rounded-md border border-gray-300 p-16 text-lg text-gray-700 placeholder-gray-400 transition-all duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:ring-capybara focus:outline-none',
        className,
      )}
      {...props}
    />
  );
};

export default TextArea;
