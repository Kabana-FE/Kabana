import type { ColorIconProps } from './types';

/**
 * ✅ CheckIcon (체크 아이콘)
 *
 * 흰색 체크 마크가 있는 아이콘 입니다. 색상 선택에 사용합니다.
 *
 * 기본적으로 흰색을 사용하며, 다른 색상을 원하면 `color` prop을 사용하세요.
 *
 * @component
 * @param {number} [size=16] - 아이콘의 너비 (상수값으로 입력해야 함.)
 * @param {string} [color='var(--color-white)'] - 아이콘 색상 (HEX, CSS 변수 모두 가능)
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (흰색)
 * <CheckIcon />
 *
 * @example
 * // 커스텀 색상 적용
 * <CheckIcon color="#d2d2d2" size={22} />
 *
 * @example
 * // Tailwind에서 정의한 CSS 변수 사용
 * <CheckIcon color="var(--color-gray-300)" />
 */
const CheckIcon = ({ size = 16, color = 'var(--color-white)', ...props }: ColorIconProps) => {
  return (
    <svg
      fill='none'
      height={size * 0.75}
      viewBox='0 0 16 12'
      width={size}
      {...props}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.288 8.775L13.763 0.3C13.963 0.1 14.2005 0 14.4755 0C14.7505 0 14.988 0.1 15.188 0.3C15.388 0.5 15.488 0.7375 15.488 1.0125C15.488 1.2875 15.388 1.525 15.188 1.725L5.988 10.925C5.788 11.125 5.55467 11.225 5.288 11.225C5.02133 11.225 4.788 11.125 4.588 10.925L0.288 6.625C0.088 6.425 -0.00783333 6.1875 0.0005 5.9125C0.00883333 5.6375 0.113 5.4 0.313 5.2C0.513 5 0.7505 4.9 1.0255 4.9C1.3005 4.9 1.538 5 1.738 5.2L5.288 8.775Z'
        fill={color}
      />
    </svg>
  );
};

export default CheckIcon;
