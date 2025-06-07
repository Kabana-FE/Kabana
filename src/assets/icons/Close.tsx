import type { ColorIconProps } from './types';

/**
 * ❌ Close (닫기 아이콘)
 *
 * 기본적으로 회색을 사용하며, 다른 색상을 원하면 `color` prop을 사용하세요.
 *
 * @component
 * @param {number} [size=16] - 아이콘의 너비 (상수값으로 입력해야 함.)
 * @param {string} [color='#6B6B6B'] - 아이콘 색상 (HEX, CSS 변수 모두 가능)
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (회색)
 * <Close />
 *
 * @example
 * // 커스텀 색상 적용
 * <Close color="#d2d2d2" size={20} />
 * @example
 * //Tailwind에서 정의한 CSS 변수 사용
 * <Close color="var(--color-gray-300)" />
 */

export default function Close({ size = 16, color = '#6B6B6B', ...props }: ColorIconProps) {
  return (
    <svg fill='none' height={size} viewBox='0 0 16 16' width={size} {...props} xmlns='http://www.w3.org/2000/svg'>
      <path d='M15 1L1 15' stroke={color} strokeLinecap='round' strokeWidth='2' />
      <path d='M1 1L15 15' stroke={color} strokeLinecap='round' strokeWidth='2' />
    </svg>
  );
}
