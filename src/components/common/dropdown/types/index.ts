/**
 * @description 드롭다운에서 사용되는 단일 옵션 항목의 타입입니다.
 * 각 옵션은 다음 세 가지 속성으로 구성됩니다:
 * - `label`: 사용자에게 표시될 텍스트입니다.
 * - `value`: 선택 시 `onSelect` 콜백에 전달되는 고유 식별 값입니다.
 * - `to`(선택사항): 선택 시 라우팅에 사용되는 경로입니다. 이 값이 존재하면 `<Link>`로 렌더링됩니다.
 * - `withCheck`(선택사항): `true`일 경우, 선택된 항목 앞에 체크 아이콘을 표시합니다. 기본값은 false입니다.
 */
export interface DropdownOption {
  /** 사용자에게 표시될 옵션 텍스트 */
  label: string;
  /** 선택 시 onSelect 콜백 함수에 전달될 값 (string 또는 number) */
  value: string | number;
  /** 해당 옵션 선택 시 이동할 경로. 라우팅 처리에 사용됩니다. */
  to?: string;
  /** 선택된 상태를 나타내기 위한 체크 아이콘 표시 여부 */
  withCheck?: boolean;
}

/**
 * @description 공통 드롭다운 컴포넌트에 전달되는 Props 타입입니다.
 *
 * 구성 요소:
 * - `trigger`: 드롭다운을 여는 트리거 요소입니다. 버튼, 아이콘 등 모든 ReactNode가 가능합니다.
 * - `options`: 드롭다운에 표시될 항목 목록 배열입니다. 각 항목은 `DropdownOption` 타입을 따릅니다.
 * - `onSelect`: 옵션이 선택될 때 호출되는 콜백 함수입니다. 선택된 옵션의 `value`가 인자로 전달됩니다.
 * - `selectedValue`: 현재 선택된 값입니다. 초기 상태 지정 및 외부 제어용으로 사용되며, 선택사항입니다.
 * - `contentClassName`: 드롭다운 콘텐츠 박스에 추가할 Tailwind CSS 클래스입니다. 드롭다운의 외형을 커스터마이징할 때 사용합니다.
 * - `optionClassName`: 각 드롭다운 항목에 추가할 Tailwind CSS 클래스입니다. 옵션 항목의 스타일을 커스터마이징할 때 사용합니다.
 * - `triggerClassName`: 트리거 버튼 또는 아이콘에 적용할 Tailwind 클래스
 * - `offsetX`: 콘텐츠의 수평 위치 오프셋 (px)
 * - `offsetY`: 콘텐츠의 수직 위치 오프셋 (px)
 * - `positionRef`: 콘텐츠 위치 계산의 기준이 되는 요소 ref
 * - `align`: 콘텐츠의 수평 정렬 방향 (`start` | `end`)
 * -` contentAlign`: 각각의 옵션들이 'start'는 왼쪽 정렬, 'center'는 가운데 정렬됩니다. 기본값은 start입니다.
 */
export interface DropdownProps {
  /**
   * 드롭다운을 열기 위한 트리거 요소입니다.
   * Button, Icon 등 모든 React Node가 될 수 있습니다.
   */
  trigger: React.ReactNode;

  /**
   * 드롭다운에 표시될 옵션 항목들의 배열입니다.
   * 각 항목은 `DropdownOption` 형태를 따릅니다.
   */
  options: DropdownOption[];

  /**
   * 옵션이 선택되었을 때 호출되는 콜백 함수입니다.
   * 선택된 옵션의 `value`가 인자로 전달됩니다.
   */
  onSelect: (value: string | number) => void;

  /**
   * 현재 선택된 옵션의 값입니다.
   * 선택 상태를 표시하거나 초기 상태를 지정할 때 사용할 수 있습니다.
   * 선택사항이며, `null`도 허용됩니다.
   */
  selectedValue?: string | number | null;

  /**
   * 드롭다운 콘텐츠 박스에 추가할 Tailwind CSS 클래스입니다.
   * 드롭다운의 외형을 커스터마이징할 때 사용합니다.
   */
  contentClassName?: string;

  /**
   * 각 드롭다운 옵션 항목에 추가할 Tailwind CSS 클래스입니다.
   * 옵션 항목의 스타일을 커스터마이징할 때 사용합니다.
   */
  optionClassName?: string;

  /**
   * 트리거 요소에 적용할 Tailwind CSS 클래스입니다.
   * 드롭다운을 여는 버튼 또는 아이콘의 스타일을 커스터마이징할 때 사용합니다.
   */
  triggerClassName?: string;

  /**
   * 드롭다운 콘텐츠의 가로 위치를 조정할 값 (px 단위).
   */
  offsetX?: number;

  /**
   * 드롭다운 콘텐츠의 세로 위치를 조정할 값 (px 단위).
   */
  offsetY?: number;

  /**
   * 드롭다운의 위치를 계산할 기준 요소의 ref.
   * 미지정 시 트리거 아이콘이 기준이 됩니다.
   */
  positionRef?: React.RefObject<HTMLElement | null>;

  /**
   * 드롭다운 콘텐츠 전체 정렬 방향.
   * 'start'는 왼쪽, 'end'는 오른쪽 정렬.
   * @default 'start'
   */
  align?: 'start' | 'end';
  /** 드롭다운 옵션 각각 정렬 기준*/
  optionAlign: 'start' | 'center';
  triggerAs?: React.ElementType;
}

/**
 * @description 드롭다운의 개별 항목을 렌더링하는 `DropdownItem` 컴포넌트의 Props 타입입니다.
 * 이 컴포넌트는 `Dropdown` 컴포넌트 내부에서 사용되며, 일반적으로 직접 호출되지 않습니다.
 */
export type DropdownItemProps = {
  /** 렌더링할 옵션의 데이터 객체 (`DropdownOption` 타입) */
  option: DropdownOption;
  /** 현재 항목이 선택된 상태인지를 나타내는 boolean 값. UI에 시각적 구분을 위해 사용됩니다. */
  isSelected: boolean;
  /** 개별 옵션 항목에 적용할 추가적인 Tailwind CSS 클래스 */
  optionClassName?: string;
  /** 옵션 내 컨텐츠의 정렬 방식 ('start' 또는 'center') */
  optionAlign?: 'start' | 'center';
  /** 항목이 클릭(선택)되었을 때 호출되는 콜백 함수. 선택된 `value`가 인자로 전달됩니다. */
  onSelect: (value: string | number) => void;
  /** 항목 선택 후 드롭다운을 닫기 위해 호출되는 콜백 함수 */
  onClose: () => void;
};
