import { twMerge } from 'tailwind-merge';

import type { LabelProps } from './types';

const Label = ({ children, className, htmlFor }: LabelProps) => {
  return (
    <label className={twMerge('text-lg text-gray-700', className)} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
