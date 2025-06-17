/**
 * ℹ️ InfoIcon (정보 아이콘)
 *
 * 원형 테두리와 함께 느낌표가 있는 정보 알림용 아이콘입니다.
 *
 * @component
 * @param {number} [size=20] - 아이콘 크기 (px 단위)
 * @param {string} [color='#3b82f6'] - 아이콘 색상 (Tailwind info 계열 기본값)
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성
 *
 * @example
 * <InfoIcon />
 * <InfoIcon color="#007BFF" size={20} />
 */
const InfoIcon = ({ size = 20, color = '#3b82f6' }: { size?: number; color?: string }) => (
  <svg fill='none' height={size} viewBox='0 0 24 24' width={size} xmlns='http://www.w3.org/2000/svg'>
    <circle cx='12' cy='12' r='10' stroke={color} strokeWidth='2' />
    <circle cx='12' cy='8' fill={color} r='1' />
    <line stroke={color} strokeLinecap='round' strokeWidth='2' x1='12' x2='12' y1='11' y2='17' />
  </svg>
);

export default InfoIcon;
