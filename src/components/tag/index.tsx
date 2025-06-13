import { twMerge } from 'tailwind-merge';

import type TagType from './types';

const Tag = ({ children, className, ...props }: TagType) => {
  return (
    <span className={twMerge('px-10 py-2 text-[12px]', className)} {...props}>
      {children}
    </span>
  );
};

export default Tag;
