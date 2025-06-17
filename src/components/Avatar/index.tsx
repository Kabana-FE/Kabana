import { twMerge } from 'tailwind-merge';

import type { AvatarProps } from '@/components/Avatar/types';

const colors = [
  'bg-violet-400',
  'bg-Magnolia-400',
  'bg-red-400',
  'bg-green-400',
  'bg-purple-400',
  'bg-orange-400',
  'bg-blue-400',
  'bg-pink-400',
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
const getInitials = (nickname: string) => {
  return nickname
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('');
};

const Avatar = ({ src, nickname, className }: AvatarProps) => {
  const bgColor = getRandomColor();
  const Initial = getInitials(nickname);

  return (
    <div
      aria-label='프로필 이미지'
      className={twMerge(`${bgColor} size-34 rounded-full outline-2 outline-white tablet:size-38`, className)}
    >
      {src ? (
        <img alt='프로필 이미지' className='size-34 tablet:size-38' src={src} />
      ) : (
        <span className='flex size-34 items-center justify-center text-lg font-semibold text-white tablet:size-38'>
          {Initial}
        </span>
      )}
    </div>
  );
};

export default Avatar;
