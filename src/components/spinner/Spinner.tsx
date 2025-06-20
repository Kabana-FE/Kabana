import type { ColorIconProps } from '@/assets/icons/types';

/**
 * 스피너
 *
 * 기본적으로 검정색을 사용하며, 다른 색상을 원하면 `color` prop을 사용하세요.
 *
 * @component
 * @param {number} [size=16] - 아이콘의 너비 (상수값으로 입력해야 함.)
 * @param {string} [color='#000000'] - 아이콘 색상 (HEX, CSS 변수 모두 가능)
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (검정)
 * <Spinner />
 *
 * @example
 * // 커스텀 색상 적용
 * <Spinner color="#d2d2d2" size={20} />
 * @example
 * //Tailwind에서 정의한 CSS 변수 사용
 * <Spinner color="var(--color-gray-300)" />
 */

const Spinner = ({ size = 16, color = '#000000', ...props }: ColorIconProps) => {
  return (
    <svg fill='none' height={size} viewBox='0 0 24 24' width={size} {...props} xmlns='http://www.w3.org/2000/svg'>
      <circle
        cx='12'
        cy='12'
        r='10'
        stroke={color}
        strokeDasharray='31.416, 31.416'
        strokeLinecap='round'
        strokeWidth='2'
      >
        <animateTransform
          attributeName='transform'
          dur='1s'
          from='0 12 12'
          repeatCount='indefinite'
          to='360 12 12'
          type='rotate'
        />
      </circle>
    </svg>
  );
};
export default Spinner;
