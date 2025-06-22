import type { ColorIconProps } from './types';

/**
 * ❌ ErrorIcon (에러 아이콘)
 *
 * 원형 테두리에 엑스(X) 기호가 있는 아이콘입니다. 에러 또는 실패 알림에 사용됩니다.
 *
 * 기본적으로 빨간색을 사용하며, 다른 색상을 원하면 `color` prop을 사용하세요.
 *
 * @component
 * @param {number} [size=60] - 아이콘의 너비 (상수값으로 입력해야 함.)
 * @param {string} [color='#F44336'] - 아이콘 색상 (HEX, CSS 변수 모두 가능)
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (빨간색)
 * <ErrorIcon />
 *
 * @example
 * // 커스텀 색상 적용
 * <ErrorIcon color="#d2d2d2" size={22} />
 *
 * @example
 * // Tailwind에서 정의한 CSS 변수 사용
 * <ErrorIcon color="var(--color-gray-300)" />
 */
const ErrorIcon = ({ size = 60, color = '#F44336', ...props }: ColorIconProps) => {
  return (
    <svg fill='none' height={size} viewBox='0 0 60 60' width={size} {...props} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M29.9999 56.6673C44.7275 56.6673 56.6666 44.7282 56.6666 30.0007C56.6666 15.2731 44.7275 3.33398 29.9999 3.33398C15.2723 3.33398 3.33325 15.2731 3.33325 30.0007C3.33325 44.7282 15.2723 56.6673 29.9999 56.6673Z'
        stroke={color}
        strokeWidth='5.33333'
      />
      <path d='M19.3333 19.334L40.6666 40.6673' stroke={color} strokeLinecap='round' strokeWidth='5.33333' />
      <path d='M40.6666 19.334L19.3333 40.6673' stroke={color} strokeLinecap='round' strokeWidth='5.33333' />
    </svg>
  );
};
export default ErrorIcon;
