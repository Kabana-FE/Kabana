import { twMerge } from 'tailwind-merge';

import type { AvatarProps } from '@/components/Avatar/types';

const colors = [
  'bg-[#FFCCCC]',
  'bg-[#FFDDCC]',
  'bg-[#F6E1C3]',
  'bg-[#FFE3A9]',
  'bg-[#D0E8C5]',
  'bg-[#BDE8CA]',
  'bg-[#C4D9FF]',
  'bg-[#C5D3E8]',
  'bg-[#EBD6FB]',
  'bg-[#FFC7EA]',
];
/**
 * 닉네임의 첫 글자를 기반으로 고유한 색상을 선택합니다.
 * @param nickname - 사용자 닉네임
 * @returns 색상 클래스 문자열
 */
const getColor = (nickname: string) => {
  const trimmed = nickname.trim();
  if (!trimmed) return colors[0];
  const firstChar = trimmed.charAt(0).toUpperCase();
  const index = firstChar.charCodeAt(0) % 10;
  return colors[index];
};
/**
 * 닉네임에서 이니셜을 추출합니다.
 * 공백으로 구분된 각 단어의 첫 글자를 대문자로 변환합니다.
 * @param nickname - 사용자 닉네임
 * @returns 이니셜 문자열
 */
const getInitials = (nickname: string) => {
  return nickname
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join('');
};
/**
 * Avatar 컴포넌트
 * @description 유저 프로필 아바타 컴포넌트입니다. 이미지를 제공하지 않으면 닉네임 기반의 이니셜과 색상을 표시합니다.
 *
 * @param {string} src - 프로필 이미지 URL
 * @param {string} nickname - 사용자 닉네임 (이니셜 및 배경색 추출에 사용됨)
 * @param {string} className - 추가로 적용할 Tailwind 클래스
 *
 * @returns {JSX.Element} 프로필 아바타 요소
 */
const Avatar = ({ src, nickname, className }: AvatarProps) => {
  const bgColor = getColor(nickname);
  const Initial = getInitials(nickname);

  return (
    <div
      aria-label='프로필 이미지'
      className={twMerge(
        `${bgColor} flex size-34 items-center justify-center rounded-full text-lg font-semibold text-white outline-2 outline-white tablet:size-38`,
        className,
      )}
    >
      {src ? <img alt='프로필 이미지' className='rounded-full' src={src} /> : <span>{Initial}</span>}
    </div>
  );
};

export default Avatar;
