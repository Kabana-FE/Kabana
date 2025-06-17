/**
 * ❌ ErrorIcon (에러 아이콘)
 *
 * 원형 테두리에 엑스(X) 기호가 있는 아이콘입니다. 에러 또는 실패 알림에 사용됩니다.
 *
 * @component
 * @param {number} [size=20] - 아이콘 크기 (px 단위)
 * @param {string} [color='#ef4444'] - 아이콘 색상 (Tailwind error 계열 기본값)
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성
 *
 * @example
 * <ErrorIcon />
 * <ErrorIcon color="#ff0000" size={18} />
 */
const ErrorIcon = ({ size = 20, color = '#ef4444', ...props }: { size?: number; color?: string }) => {
  return (
    <svg fill='none' height={size} viewBox='0 0 24 24' width={size} xmlns='http://www.w3.org/2000/svg' {...props}>
      <circle cx='12' cy='12' r='10' stroke={color} strokeWidth='2' />
      <line stroke={color} strokeLinecap='round' strokeWidth='2' x1='8' x2='16' y1='8' y2='16' />
      <line stroke={color} strokeLinecap='round' strokeWidth='2' x1='16' x2='8' y1='8' y2='16' />
    </svg>
  );
};
export default ErrorIcon;
