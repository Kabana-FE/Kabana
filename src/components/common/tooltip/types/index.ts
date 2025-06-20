/**
 * Tooltip 컴포넌트에 전달되는 props의 타입 정의입니다.
 *
 * @property {React.ReactNode} children - Tooltip 내부에 렌더링될 콘텐츠입니다.
 * @property {DOMRect | null} targetRect - Tooltip이 위치해야 할 대상 요소의 위치와 크기를 나타내는 DOMRect 객체입니다.
 * @property {string} [className] - 추가적인 Tailwind 또는 CSS 클래스 이름입니다. (선택 사항)
 */
export interface TooltipProps {
  /**
   * Tooltip 내부에 렌더링될 콘텐츠입니다.
   * 일반적으로 텍스트나 React 엘리먼트를 전달합니다.
   */
  children: React.ReactNode;
  /**
   * Tooltip이 기준으로 삼을 대상 요소의 위치 및 크기를 담는 DOMRect 객체입니다.
   * 요소의 `getBoundingClientRect()` 등을 통해 전달되며,
   * null인 경우 Tooltip은 렌더링되지 않거나 위치 계산을 생략합니다.
   */
  targetRect: DOMRect | null;
  /**
   * Tooltip의 추가 스타일을 적용할 수 있는 클래스 이름입니다.
   * Tailwind CSS 또는 일반 CSS 클래스 이름을 전달할 수 있습니다.
   */
  className?: string;
}
