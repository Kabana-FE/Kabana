import type { ColorIconProps } from './types';

/**
 * ✅ SuccessIcon (성공 아이콘)
 *
 * 원형 테두리 안에 체크 마크가 있는 아이콘입니다. 성공/완료 상태를 강조하며,
 * 다른 상태 아이콘들과의 시각적 일관성을 위해 원형 테두리를 포함합니다.
 *
 * 기본적으로 녹색을 사용하며, 다른 색상을 원하면 `color` prop을 사용하세요.
 *
 * @component
 * @param {number} [size=59] - 아이콘의 너비 (상수값으로 입력해야 함.)
 * @param {string} [color='#4CAF50'] - 아이콘 색상 (HEX, CSS 변수 모두 가능)
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (녹색)
 * <SuccessIcon />
 *
 * @example
 * // 커스텀 색상 적용
 * <SuccessIcon color="#d2d2d2" size={22} />
 *
 * @example
 * // Tailwind에서 정의한 CSS 변수 사용
 * <SuccessIcon color="var(--color-gray-300)" />
 */
const SuccessIcon = ({ size = 59, color = '#4CAF50', ...props }: ColorIconProps) => (
  <svg fill='none' height={size} viewBox='0 0 59 59' width={size} {...props} xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M19 30L27 38L40.3333 22'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='5.33333'
    />
    <path
      d='M29.6667 56.3333C44.3943 56.3333 56.3333 44.3943 56.3333 29.6667C56.3333 14.9391 44.3943 3 29.6667 3C14.9391 3 3 14.9391 3 29.6667C3 44.3943 14.9391 56.3333 29.6667 56.3333Z'
      stroke={color}
      strokeWidth='5.33333'
    />
  </svg>
);

export default SuccessIcon;
