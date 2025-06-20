import { twMerge } from 'tailwind-merge';

import colorList from '@/constants/ui/colorList';

import type TagType from './types';

const Tag = ({ children, className, ...props }: TagType) => {
  const getColor = (nickname: string) => {
    const text = typeof nickname === 'string' ? nickname : String(nickname);
    const trimmed = text.trim();
    if (!trimmed) return colorList[0];
    const firstChar = trimmed.charAt(0).toUpperCase();
    const index = firstChar.charCodeAt(0) % colorList.length;
    return colorList[index];
  };

  const tagColor = getColor(children as string);
  return (
    <span className={twMerge(`inline-flex w-auto px-10 py-2 text-[12px] ${tagColor}`, className)} {...props}>
      {children}
    </span>
  );
};

export default Tag;
