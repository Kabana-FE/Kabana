import type { ColorIconProps } from './types'; //

/**
 * ✅ SuccessIcon (성공 아이콘)
 *
 * 원형 테두리 안에 체크 마크가 있는 아이콘입니다. 성공/완료 상태를 강조하며,
 * 다른 상태 아이콘들과의 시각적 일관성을 위해 원형 테두리를 포함합니다.
 *
 * @component
 * @param {number} [size=20] - 아이콘 크기 (px 단위, 고정 숫자)
 * @param {string} [color='#00cc99'] - 아이콘 색상 (기본 성공 색상)
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성
 *
 * @example
 * <SuccessIcon />
 * <SuccessIcon color="#22c55e" size={24} />
 */
const SuccessIcon = (
  { size = 20, color = '#00cc99', ...props }: ColorIconProps, // Changed type to ColorIconProps to correctly infer the 'color' property from type definition
) => (
  <svg fill='none' height={size} viewBox='0 0 24 24' width={size} xmlns='http://www.w3.org/2000/svg'>
    <circle cx='12' cy='12' r='10' stroke={color} strokeWidth='2' />
    <path d='M8 12.5L11 15.5L16 9.5' stroke={color} strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
  </svg>
);

export default SuccessIcon;
