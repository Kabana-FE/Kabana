import { Children, isValidElement } from 'react';
import { createPortal } from 'react-dom';

import type { PopoverContentProps, PopoverProps, PopoverState, PopoverTriggerProps } from './types';

/**
 * @module PopoverRoot
 *
 * @description
 * Popover 컴포넌트의 최상위 래퍼입니다.
 *
 * 이 컴포넌트는 팝오버 UI의 핵심 상태를 전달하고,
 * 자식 컴포넌트인 `Popover.Trigger`와 `Popover.Content`를 자동 탐지하여
 * 내부적으로 필요한 props들을 주입합니다.
 *
 * - `Popover.Trigger`에는 `triggerRef`와 `onToggle`이 전달됩니다.
 * - `Popover.Content`는 `isOpen`이 true일 때만 `portal-root`에 portal로 렌더링되며,
 *    좌표 정보(`coords`)를 기반으로 절대 위치가 적용됩니다.
 * - 외부에서 `triggerRef`, `contentRef`, `toggle`, `close` 등의 상태와 함수를 전달받아 작동합니다.
 *
 * @param {PopoverProps & PopoverState} props - 팝오버 구성에 필요한 상태 및 참조
 * @param {React.ReactNode} props.children - Popover.Trigger와 Popover.Content를 포함하는 자식 요소
 * @param {boolean} props.isOpen - 팝오버가 열려 있는지 여부
 * @param {() => void} props.toggle - 팝오버 열기/닫기를 토글하는 함수
 * @param {() => void} props.close - 팝오버를 닫는 함수
 * @param {React.RefObject<HTMLElement>} props.triggerRef - 트리거 요소의 참조 (좌표 계산에 사용)
 * @param {React.RefObject<HTMLDivElement>} props.contentRef - 콘텐츠 요소의 참조 (외부 클릭 감지 등)
 * @param {{ bottom: number; left: number } | null} props.coords - 콘텐츠의 위치를 지정할 좌표
 *
 * @returns {JSX.Element | null} 트리거 요소와 포탈로 렌더링된 콘텐츠를 포함한 JSX 요소
 *
 * @example
 * <Popover.Root {...popoverState}>
 *   <Popover.Trigger>버튼</Popover.Trigger>
 *   <Popover.Content>메뉴</Popover.Content>
 * </Popover.Root>
 */
const Root = ({ children, isOpen, toggle, close, triggerRef, contentRef, coords }: PopoverProps & PopoverState) => {
  const portalRoot = typeof document !== 'undefined' ? document.getElementById('portal-root') : null;

  if (!portalRoot) return null;

  const triggerComponent = Children.map(children, (child) => {
    if (isValidElement<PopoverTriggerProps>(child) && (child.type as any).displayName === 'PopoverTrigger') {
      return <child.type {...child.props} triggerRef={triggerRef} onToggle={toggle} />;
    }
    return null;
  });

  const contentComponent = Children.map(children, (child) => {
    if (isValidElement<PopoverContentProps>(child) && (child.type as any).displayName === 'PopoverContent') {
      return (
        isOpen &&
        createPortal(
          <div
            ref={contentRef}
            className='absolute z-50'
            style={coords ? { top: coords.bottom, left: coords.left } : {}}
          >
            <child.type {...child.props} close={close} />
          </div>,
          portalRoot,
        )
      );
    }
    return null;
  });

  return (
    <div>
      {triggerComponent}
      {contentComponent}
    </div>
  );
};
Root.displayName = 'PopoverRoot';
export default Root;
