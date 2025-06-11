import { twMerge } from 'tailwind-merge';

import { type DialogProp } from './types';

const Title = ({ children, className }: DialogProp) => {
  return <div className={twMerge('text-2xl text-gray-700', className)}>{children}</div>;
};

export default Title;
