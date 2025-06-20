import { Children, isValidElement } from 'react';
import { createPortal } from 'react-dom';

import type { PopoverContentProps, PopoverProps, PopoverState, PopoverTriggerProps } from './types';

/**
 * @module PopoverRoot
 *
 * @description
 * Popover 컴포넌트의 최상위 래퍼입니다.
 *
 * 이 컴포넌트는 상태 및 DOM 참조 관리, 위치 계산 등 팝오버의 핵심 로직을 처리합니다.
 *
 * 자식 요소 `Popover.Trigger`, `Popover.Content` 컴포넌트를 자동으로 탐지하여
 * 각 요소에 필요한 props (`triggerRef`, `onToggle`, `close`)를 주입합니다.
 *
 * `Popover.Content`는 `portal-root`에 createPortal로 렌더링되며,
 * 좌표 정보(`coords`)를 기반으로 절대 위치가 지정됩니다.
 *
 * @param {PopoverProps & PopoverState} props - 팝오버 컴포넌트의 상태 및 구성 요소를 포함한 props
 * @param {React.ReactNode} props.children - `Popover.Trigger`, `Popover.Content`를 포함할 수 있는 자식 요소들
 * @param {boolean} props.isOpen - 팝오버가 열려 있는지 여부
 * @param {() => void} props.toggle - 팝오버 열기/닫기 토글 함수
 * @param {() => void} props.close - 팝오버를 닫는 함수
 * @param {React.RefObject<HTMLElement>} props.triggerRef - 트리거 요소의 참조 (팝오버 위치 계산에 사용)
 * @param {React.RefObject<HTMLDivElement>} props.contentRef - 콘텐츠 요소의 참조 (외부 클릭 감지 등 사용 가능)
 * @param {{ bottom: number; left: number } | null} props.coords - 팝오버 콘텐츠의 위치 정보
 *
 * @returns {JSX.Element | null} 트리거 요소와 포탈로 렌더링된 콘텐츠 요소를 포함하는 컴포넌트
 *
 * @example
 * <Popover.Root {...popoverState}>
 *   <Popover.Trigger>열기</Popover.Trigger>
 *   <Popover.Content>내용</Popover.Content>
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
