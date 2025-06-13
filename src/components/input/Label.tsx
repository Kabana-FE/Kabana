import { twMerge } from 'tailwind-merge';

import type { LabelProps } from './types';

const Label = ({ children, className }: LabelProps) => {
  return <label className={twMerge('text-lg text-gray-700', className)}>{children}</label>;
};

export default Label;
