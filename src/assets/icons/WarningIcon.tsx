/**
 * ⚠️ WarningIcon (경고 아이콘)
 *
 * 삼각형 안에 느낌표가 있는 경고 알림용 아이콘입니다.
 *
 * @component
 * @param {number} [size=20] - 아이콘 크기 (px 단위)
 * @param {string} [color='#f97316'] - 아이콘 색상 (Tailwind warning 계열 기본값)
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성
 *
 * @example
 * <WarningIcon />
 * <WarningIcon color="#FFA500" size={22} />
 */
const WarningIcon = ({
  size = 20,
  color = '#f97316',
}: { size?: number; color?: string } & React.SVGProps<SVGSVGElement>) => (
  <svg fill='none' height={size} viewBox='0 0 24 24' width='64' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='12' cy='12' r='10' stroke={color} strokeWidth='2' />
    <line stroke={color} strokeLinecap='round' strokeWidth='2' x1='12' x2='12' y1='7' y2='13' />
    <circle cx='12' cy='17' fill={color} r='1.5' />
  </svg>
);

export default WarningIcon;
