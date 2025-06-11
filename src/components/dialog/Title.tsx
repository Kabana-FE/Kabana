import { twMerge } from 'tailwind-merge';

import type { DialogProp } from './types';

const Title = ({ children, className }: DialogProp) => {
  return <h1 className={twMerge('text-2xl text-gray-700', className)}>{children}</h1>;
};

export default Title;
