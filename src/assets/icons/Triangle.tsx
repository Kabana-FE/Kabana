import { getRotationOffset } from '@/utils/getRotationOffset';

import type { DirectionIconProps } from './types';

/**
 * ▼ Triangle (삼각형 아이콘)
 *
 * 기본적으로 아래쪽(bottom)을 향하도록 설계되어 있으며,
 * 다른 방향으로 회전하려면 `direction` prop을 사용하세요.
 *
 *
 * @component
 * @param {number | string} [size=8] - 아이콘의 너비 (height는 자동으로 size의 절반) (상수값으로 입력해야 함.)
 * @param {string} [color='var(--color-gray-700)'] - 아이콘 색상 (HEX, CSS 변수 모두 가능)
 * @param {'right' | 'left' | 'top' | 'bottom'} [direction='bottom'] - 아이콘이 바라볼 방향
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성 (예: className, aria-label 등)
 *
 * @example
 * // 기본 사용 (아래 방향, 회색)
 * <Triangle />
 *
 * @example
 * // 오른쪽 방향으로 회전
 * <Triangle direction="right" />
 *
 * @example
 * // 커스텀 색상 적용
 * <Triangle color="#ff0000" size={10} />
 *
 * @example
 * // Tailwind에서 설정한 CSS 변수 사용
 * <Triangle color="var(--color-gray-300)" direction="top" />
 */

export default function Triangle({
  size = 8,
  color = 'var(--color-gray-700)',
  direction = 'bottom',
  ...props
}: DirectionIconProps) {
  const baseDirection = 'bottom';
  const rotation = getRotationOffset(baseDirection, direction);

  return (
    <svg
      fill='none'
      height={size / 2}
      style={{ transform: `rotate(${rotation}deg)` }}
      {...props}
      viewBox='0 0 10 5'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.48015 4.35449L1.06643 0.940798C1.01935 0.893709 0.982259 0.84113 0.955176 0.783064C0.928092 0.724979 0.914551 0.66275 0.914551 0.596378C0.914551 0.463634 0.959437 0.348305 1.04921 0.250389C1.13896 0.152474 1.25727 0.103516 1.40414 0.103516H8.59574C8.7426 0.103516 8.86091 0.152944 8.95066 0.251798C9.04043 0.35067 9.08532 0.466009 9.08532 0.597815C9.08532 0.630784 9.03462 0.745184 8.93322 0.941014L5.51972 4.35452C5.44125 4.43299 5.36014 4.49028 5.27638 4.52639C5.1926 4.5625 5.10045 4.58055 4.99994 4.58055C4.89942 4.58055 4.80727 4.5625 4.7235 4.52639C4.63974 4.49028 4.55862 4.43298 4.48015 4.35449Z'
        fill={color}
      />
    </svg>
  );
}
