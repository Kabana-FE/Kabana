import { getRotationOffset } from '@/utils/getRotationOffset';

import type { DirectionIconProps } from './types';

/**
 *  〉 Caret(꺽쇠 아이콘)
 *
 *  기본적으로 오른쪽을 바라보도록 설계되어있으며, 다른 방향으로 사용하시고 싶으면 direction prop을 사용하세요.
 *
 * @component
 * @param {number} [size=18] - 아이콘의 가로/세로 크기 (상수값으로 입력해야 함.)
 * @param {string} [color='#333236'] - 아이콘의 색상 HEX 코드나 CSS 변수(`var(--color-gray-300)`) 가능.
 * @param {'right' | 'left' | 'top' | 'bottom'} [direction='right'] - 아이콘이 바라볼 방향.
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성들 (`className`, `aria-*`, 등)
 *
 * @example
 * // 기본 사용 (오른쪽 방향, 기본 색상)
 * <Caret />
 *
 * @example
 * // 아래 방향, 커스텀 색상
 * <Caret direction="bottom" color="#d2d2d2" size={24} />
 *
 * @example
 * // 위 방향, Tailwind에서 정의한 CSS 변수 사용
 * <Caret direction="top" color="var(--color-gray-300)" />
 */

export default function Caret({
  size = 18,
  color = 'var(--color-gray-700)',
  direction = 'right',
  ...props
}: DirectionIconProps) {
  const baseDirection = 'right';
  const rotation = getRotationOffset(baseDirection, direction);
  return (
    <svg
      fill='none'
      height={size}
      style={{ transform: `rotate(${rotation}deg)` }}
      {...props}
      viewBox='0 0 19 18'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.2259 8.99998L5.57634 3.35046C5.42731 3.20142 5.35471 3.02402 5.35854 2.81826C5.36239 2.61248 5.43884 2.43508 5.58787 2.28606C5.73691 2.13702 5.91431 2.0625 6.12007 2.0625C6.32584 2.0625 6.50324 2.13702 6.65227 2.28606L12.3941 8.03942C12.5297 8.17499 12.6302 8.32691 12.6955 8.49518C12.7609 8.66345 12.7936 8.83172 12.7936 8.99998C12.7936 9.16824 12.7609 9.33651 12.6955 9.50479C12.6302 9.67305 12.5297 9.82497 12.3941 9.96054L6.64074 15.7139C6.4917 15.8629 6.31622 15.9355 6.1143 15.9317C5.91239 15.9279 5.73691 15.8514 5.58787 15.7024C5.43884 15.5533 5.36432 15.3759 5.36432 15.1702C5.36432 14.9644 5.43884 14.787 5.58787 14.638L11.2259 8.99998Z'
        fill={color}
      />
    </svg>
  );
}
