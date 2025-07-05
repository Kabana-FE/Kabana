/**
 * @description Popover UI를 제어하는 `usePopover` 훅의 반환 타입입니다.
 * 팝오버 열림 여부, 토글/닫기 함수, 위치 계산을 위한 ref와 좌표 정보를 제공합니다.
 * @property {boolean} isOpen - 팝오버의 열림/닫힘 상태.
 * @property {() => void} toggle - 팝오버의 열림/닫힘 상태를 토글하는 함수.
 * @property {() => void} close - 팝오버를 닫는 함수.
 * @property {React.RefObject<HTMLElement | null>} triggerRef - 트리거 DOM 요소를 참조하기 위한 ref. (기준 위치 계산에 사용됨)
 * @property {React.RefObject<HTMLDivElement | null>} contentRef - 콘텐츠 DOM 요소를 참조하기 위한 ref.(외부 클릭 감지 등에 사용됨)
 * @property {{ top: number; left: number } | null} coords - 팝오버 콘텐츠가 표시될 좌표.
 */
export interface PopoverState {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  /** 트리거 요소의 DOM 참조 (기준 위치 계산에 사용됨) */
  triggerRef: React.RefObject<HTMLElement | null>;
  /** 콘텐츠 영역의 DOM 참조 (외부 클릭 감지 등에 사용됨) */
  contentRef: React.RefObject<HTMLDivElement | null>;
  /** 팝오버 콘텐츠가 표시될 좌표 (절대 위치) */
  coords: { bottom: number; left: number } | null;
}

/**
 * @description
 * `Popover.Root` 컴포넌트에 전달되는 props의 타입입니다.
 * 하위에 `Popover.Trigger`와 `Popover.Content`를 포함하는 것이 필수입니다.
 *
 * @property {React.ReactNode} children
 * 팝오버를 구성하는 하위 요소로, `Popover.Trigger`와 `Popover.Content` 등을 포함해야 합니다.
 */
export interface PopoverProps {
  /** - 팝오버를 구성하는 자식 요소입니다. Trigger와 Content 컴포넌트를 포함합니다. */
  children: React.ReactNode;
}

/**
 * @description
 * `usePopover` 훅에 전달되는 옵션 객체입니다.
 * 팝오버 콘텐츠의 위치 및 정렬 방식 등을 세부적으로 제어할 수 있습니다.
 *
 * ### 사용 목적
 * - 콘텐츠 좌표의 오프셋을 조정하고,
 * - 위치 계산 기준(anchor 요소)을 명시하거나,
 * - 콘텐츠의 수평 정렬 방향을 지정할 수 있습니다.
 *
 * @property {number} [offsetX=0] - 콘텐츠의 x축 위치를 조정하기 위한 오프셋 값입니다. 기본값은 `0`입니다.
 * @property {number} [offsetY=2] - 콘텐츠의 y축 위치를 조정하기 위한 오프셋 값입니다. 기본값은 `2`입니다.
 *
 * @property {React.RefObject<HTMLElement | null>} [positionRef] - 팝오버 위치 계산 시 기준이 될 요소의 ref입니다.
 * 지정하지 않으면 기본적으로 `triggerRef`가 기준이 됩니다.
 * 예: "아이콘 버튼 오른쪽 정렬", "커스텀 요소 기준 정렬" 등 다양한 위치 전략에 활용됩니다.
 *
 * @property {'start' | 'end'} [align='start'] - 콘텐츠의 수평 정렬 방향을 지정합니다.
 * - `'start'`: 기준 요소의 **왼쪽 끝**에 Popover의 **왼쪽 끝**을 정렬합니다.
 * - `'end'`: 기준 요소의 **오른쪽 끝**에 Popover의 **오른쪽 끝**을 정렬합니다.
 */
export interface PopoverOptions {
  /** 콘텐츠의 x축 위치를 조정하기 위한 오프셋 값 (기본값: 0) */
  offsetX?: number;
  /** 콘텐츠의 y축 위치를 조정하기 위한 오프셋 값 (기본값: 2) */
  offsetY?: number;

  /**
   * Popover의 위치를 계산할 기준이 되는 요소의 ref.
   * 지정하지 않으면 triggerRef를 기준으로 계산됩니다.
   * 예: "아이콘 버튼 오른쪽 정렬"이나 "특정 커스텀 요소 기준 정렬" 등 다양한 위치 전략을 지원합니다.
   */
  positionRef?: React.RefObject<HTMLElement | null>;
  /**
   * Popover 콘텐츠의 정렬 방향을 결정합니다.
   * - `start`: 기준 요소의 왼쪽 끝에 Popover의 왼쪽 끝을 맞춥니다. (기본값)
   * - `end`: 기준 요소의 오른쪽 끝에 Popover의 오른쪽 끝을 맞춥니다.
   */
  align?: 'start' | 'end';
}

/**
 * @description
 * `Popover.Trigger` 컴포넌트의 props 타입입니다.
 * 이 컴포넌트는 팝오버를 열기 위한 트리거 역할을 하며, 보통 아이콘 버튼, 텍스트 버튼 등으로 사용됩니다.
 *
 * 내부적으로 `Popover.Root`로부터 `triggerRef`와 `onToggle` 콜백이 주입되며,
 * 사용자는 보통 `children`, `as`, `className` 정도만 명시하면 됩니다.
 *
 * ### 주요 특징
 * - 팝오버를 여는 클릭 트리거로 사용됩니다.
 * - 기본적으로 `span` 태그를 사용하며, `as`를 통해 다른 태그로 커스터마이징할 수 있습니다.
 * - `triggerRef`, `onToggle`은 `Popover.Root`에서 자동으로 주입되므로 직접 넘기지 않아도 됩니다.
 *
 * @property {React.ReactNode} children - 트리거 내부에 표시될 콘텐츠입니다. 아이콘, 텍스트, 버튼 등 React 요소를 사용할 수 있습니다.
 * @property {() => void} [onToggle] - 팝오버의 열림/닫힘 상태를 토글하는 함수입니다. 내부에서 자동 주입되므로 직접 지정할 필요는 없습니다.
 * @property {React.RefObject<HTMLElement>} [triggerRef] - 트리거 DOM 요소에 대한 참조입니다. 자동 주입됩니다.
 * @property {React.ElementType} [as='span'] - 트리거로 사용할 HTML 태그 또는 React 컴포넌트입니다. 기본값은 `'span'`입니다.
 * @property {string} [className] - Tailwind CSS 등 유틸리티 클래스를 적용하기 위한 사용자 정의 클래스입니다.
 * @property {React.KeyboardEventHandler<HTMLElement>} [onKeyDown] - 키보드 이벤트 핸들러입니다.
 * @property {string} [role] - ARIA role을 지정합니다. (예: 'button')
 * @property {number} [tabIndex] - 요소의 탭 순서를 지정합니다.
 */
export interface PopoverTriggerProps {
  /** 트리거 내부에 표시될 콘텐츠(아이콘, 텍스트, 버튼 등)입니다. */
  children: React.ReactNode;
  /**
   * 팝오버의 열림/닫힘 상태를 토글하는 함수입니다.
   * 보통 `Popover.Root` 내부에서 자동으로 주입되며, 직접 전달할 필요는 없습니다.
   */
  onToggle?: () => void;
  /**
   * 트리거 요소의 DOM 참조입니다.
   * `Popover.Root`에서 자동으로 전달되므로 사용자가 수동으로 지정할 필요는 없습니다.
   */
  triggerRef?: React.RefObject<HTMLElement | null>;
  /** 트리거로 사용할 요소의 타입을 지정합니다. 기본값은 `'button'`입니다. */
  as?: React.ElementType;
  /**  트리거 요소에 추가할 사용자 정의 CSS 클래스입니다. (Tailwind 등 유틸리티 클래스 적용 시 사용) */
  className?: string;
  /** 키보드 이벤트 핸들러로, 외부에서 전달된 경우 사용됩니다. */
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  /** 트리거 요소의 ARIA 역할을 지정합니다. 기본값은 'button'입니다. */
  role?: string;
  /** 트리거 요소의 탭 인덱스입니다. 기본값은 `0`입니다. */
  tabIndex?: number;
}

/**
 * @description
 * Popover.Content 컴포넌트의 props 타입입니다.
 * Popover.Content 컴포넌트는 팝오버에 표시될 콘텐츠 영역을 나타내며,
 * 자식 요소(children)로 정적인 React 노드뿐 아니라 Render Prop 패턴의 함수를 전달할 수 있습니다.
 *
 * ### 주요 특징
 * - 일반적인 React 노드를 그대로 자식으로 전달하거나, Render Prop 형태로 `close` 함수를 받아 동적으로 콘텐츠를 구성할 수 있습니다.
 * - `close` 함수는 Render Prop 사용 시에만 자동으로 주입되며, 팝오버를 내부에서 닫기 위한 용도로 사용됩니다.
 * - `className`으로 Tailwind CSS 등의 스타일을 확장할 수 있으며,
 * - `contentRef`는 팝오버 외부 클릭 감지 및 포지셔닝을 위해 내부적으로 사용됩니다. (보통 자동 주입됨)
 *
 *
 * @property {React.ReactNode | ((bag: { close: () => void }) => React.ReactNode)} children
 * 팝오버에 렌더링될 콘텐츠입니다.
 * 정적인 React 노드 또는 `close` 함수를 인자로 받는 함수형(Render Prop) 형태로 전달할 수 있습니다.
 *
 * @property {string} [className]
 * 콘텐츠 컨테이너에 Tailwind 등 유틸리티 클래스를 적용할 수 있는 사용자 정의 클래스입니다.
 *
 * @property {() => void} [close]
 * 팝오버를 닫는 함수입니다. `children`이 함수형일 경우 인자로 전달되며, 팝오버 내부에서 수동으로 닫고자 할 때 사용됩니다.
 *
 * @property {React.RefObject<HTMLDivElement | null>} [contentRef]
 * 팝오버 콘텐츠 DOM 요소에 대한 참조입니다. 위치 계산 또는 외부 클릭 감지 등에 사용되며 보통 자동 주입됩니다.
 */
export interface PopoverContentProps {
  /**팝오버에 표시될 콘텐츠입니다. 일반 React 노드 또는 `close` 함수를 인자로 받는 Render Prop 함수를 사용할 수 있습니다.*/
  children: React.ReactNode | ((bag: { close: () => void }) => React.ReactNode);
  /** 콘텐츠 컨테이너에 추가할 사용자 정의 CSS 클래스입니다. */
  className?: string;
  /** 팝오버를 닫는 함수입니다. `children`이 함수일 경우 인자로 전달되며, `Popover.Root`에서 주입됩니다.*/
  close?: () => void;
  /** 콘텐츠 요소의 DOM 참조입니다. `Popover.Root`에서 자동으로 주입됩니다. */
  contentRef?: React.RefObject<HTMLDivElement | null>;
}
