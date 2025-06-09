export default interface ButtonProps {
  /**
   * 버튼 스타일을 선택합니다.
   * - 'filled': 배경이 채워진 버튼
   * - 'outlined': 테두리만 있는 버튼
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined';
  /**
   * 버튼 타입입니다.
   * - 'button' | 'submit' | 'reset'
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Tailwind CSS 클래스 추가용 커스텀 클래스입니다.
   * 버튼 크기나 여백 등 개별 스타일을 적용할 때 사용합니다.
   */
  className: string;
  /**
   * 버튼 클릭 시 호출되는 함수입니다.
   */
  onButtonClick?: () => void;
  /**
   * 버튼 내부에 표시될 콘텐츠입니다.
   */
  children: React.ReactNode;
  /**
   * 버튼을 비활성화할지 여부입니다.
   * `true`로 설정하면 클릭할 수 없으며, 비활성화된 스타일이 적용됩니다.
   * JSX에서는 `disabled`만 적어도 `true`로 인식됩니다.
   */
  disabled?: boolean;
}
