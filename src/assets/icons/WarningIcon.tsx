import type { ColorIconProps } from './types';

/**
 * ⚠️ WarningIcon (경고 아이콘)
 *
 * 삼각형 안에 느낌표가 있는 경고 알림용 아이콘입니다.
 *
 * 기본적으로 주황색을 사용하며, 다른 색상을 원하면 `color` prop을 사용하세요.
 *
 * @component
 * @param {number} [size=60] - 아이콘의 너비 (상수값으로 입력해야 함.)
 * @param {string} [color='#FFA000'] - 아이콘 색상 (HEX, CSS 변수 모두 가능)
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (주황색)
 * <WarningIcon />
 *
 * @example
 * // 커스텀 색상 적용
 * <WarningIcon color="#d2d2d2" size={22} />
 *
 * @example
 * // Tailwind에서 정의한 CSS 변수 사용
 * <WarningIcon color="var(--color-gray-300)" />
 */
const WarningIcon = ({ size = 60, color = '#FFA000', ...props }: ColorIconProps) => (
  <svg fill='none' height={size} viewBox='0 0 60 60' width={size} {...props} xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M29.9999 56.6673C44.7275 56.6673 56.6666 44.7282 56.6666 30.0007C56.6666 15.2731 44.7275 3.33398 29.9999 3.33398C15.2723 3.33398 3.33325 15.2731 3.33325 30.0007C3.33325 44.7282 15.2723 56.6673 29.9999 56.6673Z'
      stroke={color}
      strokeWidth='5.33333'
    />
    <path d='M30 16.666V32.666' stroke={color} strokeLinecap='round' strokeWidth='5.33333' />
    <path
      d='M30 47.334C32.2091 47.334 34 45.5431 34 43.334C34 41.1248 32.2091 39.334 30 39.334C27.7909 39.334 26 41.1248 26 43.334C26 45.5431 27.7909 47.334 30 47.334Z'
      fill={color}
    />
  </svg>
);

export default WarningIcon;
