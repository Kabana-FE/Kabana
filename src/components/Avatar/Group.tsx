import { Children, isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';

import Avatar from '@/components/Avatar';
import type { GroupProps } from '@/components/Avatar/types';
/**
 * Group 컴포넌트
 * @description 여러 아바타(Avatar)를 그룹으로 묶어 보여주는 컴포넌트입니다. 최대 표시 수를 초과하는 경우 "+N" 형식으로 추가 인원을 나타냅니다.
 *
 * @param {React.ReactNode} children - Avatar 컴포넌트들을 포함하는 자식 요소
 * @param {string} className - 추가로 적용할 Tailwind 클래스
 * @param {number} max - 표시할 최대 Avatar 수 (초과 시 "+N" 형태로 표시)
 *
 * @returns {JSX.Element} 아바타 그룹 요소
 */
const Group = ({ children, className, max }: GroupProps) => {
  const _children = Children.toArray(children).filter(
    (child) =>
      isValidElement(child) &&
      (child.type === Avatar || (child.type as { displayName?: string })?.displayName === 'Avatar'),
  );

  const visibleAvatars = max ? _children.slice(0, max) : _children;
  const extraCount = max && _children.length > max ? _children.length - max : 0;

  return (
    <div aria-label='프로필 그룹' className={twMerge('flex -space-x-8', className)} role='group'>
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
