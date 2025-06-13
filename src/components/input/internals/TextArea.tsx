import { twMerge } from 'tailwind-merge';

import type { TextAreaProps } from '@/components/input/types';

const TextArea = ({ name, className, ...props }: TextAreaProps) => {
  return (
    <textarea
      className={twMerge(
        'focus:ring-primary block w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:outline-none',
        className,
      )}
      name={name}
      {...props}
    />
  );
};

export default TextArea;
