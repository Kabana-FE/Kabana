import { Children } from 'react';
import { twMerge } from 'tailwind-merge';

import Avatar from '@/components/Avatar';
import type { GroupProps } from '@/components/Avatar/types';

const Group = ({ children, className, max }: GroupProps) => {
  const _children = Children.toArray(children).filter(
    (child) => (child as React.ReactElement).type === Avatar,
  ) as React.ReactElement[];

  const visibleAvatars = max ? _children.slice(0, max) : _children;
  const extraCount = max && _children.length > max ? _children.length - max : 0;

  return (
    <div aria-label='프로필 그룹' className={twMerge('flex -space-x-6', className)} role='group'>
      {visibleAvatars}
      {extraCount > 0 && (
        <div className='flex size-34 items-center justify-center rounded-full bg-gray-400 text-sm font-semibold text-white outline-2 outline-white tablet:size-38'>
          +{extraCount}
        </div>
      )}
    </div>
  );
};

export default Group;
