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
   * 버튼 내부에 표시될 콘텐츠입니다. 주로 텍스트를 넣습니다.
   */
  children: React.ReactNode;
}
