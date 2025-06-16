import { twMerge } from 'tailwind-merge';

import type { LabelProps } from './types';

const Label = ({ children, className, htmlFor, ...props }: LabelProps) => {
  return (
    <label className={twMerge('text-lg text-gray-700', className)} htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
};

export default Label;
