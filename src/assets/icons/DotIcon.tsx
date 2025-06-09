import type { ColorIconProps } from './types';

/**
 * ➕ DotIcon (뱃지로 사용할 점 아이콘)
 *
 * 기본적으로 갈색을 사용하며, 다른 색상을 원하면 `color` prop을 사용하세요.
 *
 * @component
 * @param {number} [size=6] - 아이콘의 너비 (상수값으로 입력해야 함.)
 * @param {string} [color='#764D4D'] - 아이콘 색상 (HEX, CSS 변수 모두 가능)
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (회색)
 * <DotIcon />
 *
 * @example
 * // 커스텀 색상 적용
 * <DotIcon color="#d2d2d2" size={20} />
 * @example
 * //Tailwind에서 정의한 CSS 변수 사용
 * <DotIcon color="var(--color-gray-300)" />
 */

const DotIcon = ({ size = 6, color = '#764D4D', ...props }: ColorIconProps) => {
  return (
    <svg fill='none' height={size} viewBox='0 0 6 6' width={size} {...props} xmlns='http://www.w3.org/2000/svg'>
      <circle cx='3' cy='3' fill={color} r='3' />
    </svg>
  );
};

export default DotIcon;
