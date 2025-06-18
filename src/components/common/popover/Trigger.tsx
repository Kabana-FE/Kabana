import { twMerge } from 'tailwind-merge';

import type { PopoverTriggerProps } from './types';

/**
 * @description
 * 팝오버를 열고 닫는 트리거 역할을 하는 컴포넌트입니다.
 *
 * `Popover.Root` 내부에서만 사용되며, `triggerRef`와 `onToggle`은 Root 컴포넌트에서 자동으로 주입됩니다.
 *
 * 사용자는 주로 다음 세 가지 props만 지정하면 됩니다:
 * - `children`: 트리거 내부에 렌더링할 아이콘, 텍스트 등
 * - `as`: 렌더링할 HTML 요소 또는 React 컴포넌트 타입
 * - `className`: 사용자 정의 스타일 지정용 클래스
 *
 * ### 주요 특징
 * - 기본적으로 `<button>` 요소로 렌더링되며, `as` prop을 통해 커스텀 태그나 컴포넌트로 변경할 수 있습니다.
 * - `triggerRef`는 루트 요소에 바인딩되어 외부 클릭 감지 및 위치 계산에 사용됩니다.
 * - 클릭 시 `onToggle` 함수가 호출되어 팝오버의 열림 상태가 토글됩니다.
 * - Tailwind CSS 스타일 병합을 위해 `twMerge`가 적용되어 기본 클래스(`flex cursor-pointer`)와 외부 클래스를 결합합니다.
 *
 * @param {PopoverTriggerProps} props - 트리거 컴포넌트에 전달되는 속성 객체
 * @param {React.ReactNode} props.children - 트리거 내부에 렌더링될 콘텐츠 (예: 아이콘, 텍스트 등)
 * @param {() => void} [props.onToggle] - 팝오버 열림/닫힘을 토글하는 함수 (Root에서 자동 주입)
 * @param {React.RefObject<HTMLElement>} [props.triggerRef] - 트리거 요소에 바인딩되는 참조 (Root에서 자동 주입)
 * @param {string} [props.className] - Tailwind 등의 유틸리티 클래스 적용을 위한 사용자 정의 클래스 이름
 * @param {React.ElementType} [props.as='button'] - 렌더링할 요소 타입. 기본값은 `'button'`
 *
 * @example
 * ```tsx
 * <Popover.Trigger as="div" className="px-2">
 *   <MoreIcon />
 * </Popover.Trigger>
 * ```
 */
const Trigger = ({ children, onToggle, triggerRef, as: Component = 'button', className }: PopoverTriggerProps) => {
  return (
    <Component ref={triggerRef} className={twMerge('flex cursor-pointer', className)} onClick={onToggle}>
      {children}
    </Component>
  );
};

Trigger.displayName = 'PopoverTrigger';
export default Trigger;
