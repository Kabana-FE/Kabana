/**
 * 아이콘의 방향을 지정하는 문자열 리터럴 타입입니다.
 *
 * - `'right'` : 오른쪽 방향 (기본값인 경우가 많음)
 * - `'left'`  : 왼쪽 방향
 * - `'top'`   : 위쪽 방향
 * - `'bottom'`: 아래쪽 방향
 *
 * 컴포넌트에서 회전 로직(`transform: rotate(...)`)에 사용되며,
 * SVG가 특정 방향을 기준으로 그려졌을 때 이를 시각적으로 조정하는 데 사용됩니다.
 */
export type IconDirection = 'right' | 'left' | 'top' | 'bottom';

/**
 * SVG 아이콘 공통 속성 타입입니다.
 *
 * 모든 아이콘에서 공통적으로 사용할 `size`와
 * React의 `SVGProps<SVGSVGElement>`를 포함합니다.
 */
export interface BaseIconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 아이콘의 가로/세로 크기
   * - 일부 컴포넌트에서는 높이를 비율에 맞게 재조정 되어있습니다.
   * - 꼭 상수값으로 입력해야 합니다. (예: `size={18}`)
   */
  size?: number;
}

/**
 * 색상(color) 속성을 포함한 아이콘 속성 타입입니다.
 *
 * HEX 코드(`#000000`), RGB, CSS 변수(`var(--color-gray-700)`) 등 다양한 형식을 허용합니다.
 * Tailwind CSS와 연동된 변수 사용도 가능합니다.
 */
export interface ColorIconProps extends BaseIconProps {
  /**
   * 아이콘의 색상입니다.
   * - `fill` 속성에 적용됩니다.
   * - 커스텀 색상을 직접 입력하거나, CSS 변수로 지정 가능합니다.
   * - 예시: "#ff0000" | "rgb(255, 0, 0)" | "var(--color-capybara)"
   */
  color?: string;
}

/**
 * 방향(direction)을 포함한 아이콘 속성 타입입니다.
 *
 * 기본 방향(baseDirection)에서 원하는 방향으로 회전시키기 위해 사용됩니다.
 * `getRotationOffset` 유틸 함수와 함께 사용하여, SVG 아이콘을 시각적으로 회전시킵니다.
 */
export interface DirectionIconProps extends ColorIconProps {
  /**
   * 아이콘이 바라볼 방향입니다.
   * - `IconDirection` 타입을 따르며, 보통 기본 방향에서 상대 회전을 계산합니다.
   * - 아이콘 SVG가 특정 방향(예: right, bottom)을 기준으로 작성되었는지를 고려하여 사용하세요.
   * - 'right' | 'left' | 'top' | 'bottom' 중 하나를 선택할 수 있습니다.
   */
  direction?: IconDirection;
}
