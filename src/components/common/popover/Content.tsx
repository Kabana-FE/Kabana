import { twMerge } from 'tailwind-merge';

import type { PopoverContentProps } from './types';

/**
 * @description
 * 팝오버에 표시될 콘텐츠 영역을 렌더링하는 컴포넌트입니다.
 *
 * 이 컴포넌트는 반드시 `Popover.Root`의 자식으로 사용되어야 하며,
 * 정적인 React 노드 뿐만 아니라 Render Prop 패턴을 통해 동적인 UI도 구성할 수 있습니다.
 * @note
 * Render Prop 패턴은 React 컴포넌트에서 자식으로 함수를 전달하여
 * 컴포넌트 내부의 데이터를 외부에서 동적으로 렌더링할 수 있게 해주는 패턴입니다.
 *
 * ### 주요 특징
 * - `children`을 정적 콘텐츠로 전달하거나, 함수 형태로 전달하여 내부에서 `close()` 함수를 사용할 수 있습니다.
 * - 스타일은 기본적으로 Tailwind CSS 클래스(`min-w-100`, `rounded-md`, `border`, `bg-white`, `p-6`)가 적용되며,
 *   `className`을 통해 외부에서 덮어쓸 수 있습니다.
 * - `ref`는 외부 클릭 감지 또는 위치 계산 등을 위해 콘텐츠 요소에 연결됩니다.
 *
 * @param {PopoverContentProps} props - Popover.Content에 전달되는 props 객체
 * @param {React.ReactNode | ((bag: { close: () => void }) => React.ReactNode)} props.children - 팝오버에 렌더링할 콘텐츠입니다. 정적인 노드 또는 Render Prop 함수로 전달 가능하며, 함수형일 경우 `close()` 함수를 인자로 받습니다.
 * @param {string} [props.className] - Tailwind 등의 유틸리티 클래스를 전달할 수 있는 선택적 사용자 정의 클래스입니다.
 * @param {() => void} [props.close] - 팝오버를 닫는 함수입니다. `children`이 함수일 때만 유효하며, `Popover.Root`에서 자동 주입됩니다.
 * @param {React.RefObject<HTMLDivElement | null>} [props.contentRef] - 콘텐츠 요소의 DOM 참조입니다. 위치 계산 또는 외부 클릭 감지 등을 위해 사용되며, Root에서 자동으로 주입됩니다.
 *
 * @returns {JSX.Element} 팝오버 콘텐츠를 감싸는 `<div>` 요소를 반환합니다.
 *
 * @example
 * 정적 콘텐츠
 * <Popover.Content>
 *   <p>팝오버 내용입니다.</p>
 * </Popover.Content>
 *
 * @example
 * Render Prop 패턴
 * <Popover.Content>
 *   {({ close }) => (
 *     <div>
 *       <p>동적으로 생성된 내용입니다.</p>
 *       <button onClick={close}>닫기</button>
 *     </div>
 *   )}
 * </Popover.Content>
 */
const Content = ({ children, className, close, contentRef }: PopoverContentProps) => {
  const content = typeof children === 'function' ? children({ close: close || (() => {}) }) : children;

  return (
    <div ref={contentRef} className={twMerge('min-w-100 rounded-md border border-gray-300 bg-white p-6', className)}>
      {content}
    </div>
  );
};

Content.displayName = 'PopoverContent';
export default Content;
