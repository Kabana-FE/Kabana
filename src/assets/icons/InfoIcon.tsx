import type { ColorIconProps } from './types';

/**
 * ℹ️ InfoIcon (정보 아이콘)
 *
 * 원형 테두리와 함께 느낌표가 있는 정보 알림용 아이콘입니다.
 *
 * 기본적으로 파란색을 사용하며, 다른 색상을 원하면 `color` prop을 사용하세요.
 *
 * @component
 * @param {number} [size=60] - 아이콘의 너비 (상수값으로 입력해야 함.)
 * @param {string} [color='#2196F3'] - 아이콘 색상 (HEX, CSS 변수 모두 가능)
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (파란색)
 * <InfoIcon />
 *
 * @example
 * // 커스텀 색상 적용
 * <InfoIcon color="#d2d2d2" size={22} />
 *
 * @example
 * // Tailwind에서 정의한 CSS 변수 사용
 * <InfoIcon color="var(--color-gray-300)" />
 */
const InfoIcon = ({ size = 60, color = '#2196F3', ...props }: ColorIconProps) => (
  <svg fill='none' height={size} viewBox='0 0 60 60' width={size} {...props} xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M29.9999 56.6673C44.7275 56.6673 56.6666 44.7282 56.6666 30.0007C56.6666 15.2731 44.7275 3.33398 29.9999 3.33398C15.2723 3.33398 3.33325 15.2731 3.33325 30.0007C3.33325 44.7282 15.2723 56.6673 29.9999 56.6673Z'
      stroke={color}
      strokeWidth='5.33333'
    />
    <path
      d='M29.9999 21.9993C31.4727 21.9993 32.6666 20.8054 32.6666 19.3327C32.6666 17.8599 31.4727 16.666 29.9999 16.666C28.5272 16.666 27.3333 17.8599 27.3333 19.3327C27.3333 20.8054 28.5272 21.9993 29.9999 21.9993Z'
      fill={color}
    />
    <path d='M30 30V46' stroke={color} strokeLinecap='round' strokeWidth='5.33333' />
  </svg>
);

export default InfoIcon;
