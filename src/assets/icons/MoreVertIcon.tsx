import { getRotationOffset } from '@/utils/getRotationOffset';

import type { DirectionIconProps } from './types';

/**
 * ⋮ MoreVertIcon (더보기 아이콘)
 *
 * 기본적으로 세로(아래쪽)를 향하도록 설계되어있으며, 다른 방향을 사용하고 싶으면 `direction` prop을 사용하세요.
 *
 * @component
 * @param {number} [size=28] - 아이콘의 가로/세로 크기 (상수값으로 입력해야 함.)
 * @param {string} [color='var(--color-gray-700)'] - 아이콘 색상 HEX 또는 CSS 변수(`var(--color-gray-700)`) 등
 * @param {'right' | 'left' | 'top' | 'bottom'} [direction='bottom'] - 아이콘이 바라볼 방향
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성들 (`className`, `aria-*`, 등)
 *
 * @example
 * // 기본 사용 (아래 방향)
 * <MoreVertIcon />
 *
 * @example
 * // 오른쪽 방향으로 회전
 * <MoreVertIcon direction="right" />
 *
 * @example
 * // 색상과 크기 커스터마이징
 * <MoreVertIcon color="#999" size={20} />
 *
 * @example
 * // Tailwind에서 정의한 CSS 변수 사용
 * <MoreVertIcon color="var(--color-gray-300)" direction="left" />
 */
const MoreVertIcon = ({
  size = 28,
  color = 'var(--color-gray-700)',
  direction = 'bottom',
  ...props
}: DirectionIconProps) => {
  const baseDirection = 'bottom';
  const rotation = getRotationOffset(baseDirection, direction);
  return (
    <svg
      fill='none'
      height={size}
      style={{ transform: `rotate(${rotation}deg)` }}
      viewBox='0 0 28 28'
      {...props}
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14 22.4809C13.5187 22.4809 13.1068 22.3096 12.7641 21.9669C12.4214 21.6242 12.25 21.2122 12.25 20.731C12.25 20.2497 12.4214 19.8378 12.7641 19.4951C13.1068 19.1524 13.5187 18.981 14 18.981C14.4812 18.981 14.8932 19.1524 15.2359 19.4951C15.5786 19.8378 15.7499 20.2497 15.7499 20.731C15.7499 21.2122 15.5786 21.6242 15.2359 21.9669C14.8932 22.3096 14.4812 22.4809 14 22.4809ZM14 15.7502C13.5187 15.7502 13.1068 15.5789 12.7641 15.2361C12.4214 14.8934 12.25 14.4815 12.25 14.0002C12.25 13.519 12.4214 13.107 12.7641 12.7643C13.1068 12.4216 13.5187 12.2503 14 12.2503C14.4812 12.2503 14.8932 12.4216 15.2359 12.7643C15.5786 13.107 15.7499 13.519 15.7499 14.0002C15.7499 14.4815 15.5786 14.8934 15.2359 15.2361C14.8932 15.5789 14.4812 15.7502 14 15.7502ZM14 9.01944C13.5187 9.01944 13.1068 8.84809 12.7641 8.50538C12.4214 8.16269 12.25 7.75072 12.25 7.26947C12.25 6.78824 12.4214 6.37627 12.7641 6.03357C13.1068 5.69088 13.5187 5.51953 14 5.51953C14.4812 5.51953 14.8932 5.69088 15.2359 6.03357C15.5786 6.37627 15.7499 6.78824 15.7499 7.26947C15.7499 7.75072 15.5786 8.16269 15.2359 8.50538C14.8932 8.84809 14.4812 9.01944 14 9.01944Z'
        fill={color}
      />
    </svg>
  );
};

export default MoreVertIcon;
