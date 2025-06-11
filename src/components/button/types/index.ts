export default interface ButtonProps {
  /**
   * 버튼 스타일을 선택합니다.
   * - 'filled': 배경이 채워진 버튼
   * - 'outlined': 테두리만 있는 버튼
   * - 'none': 스타일 없음
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined' | 'none';
  /**
   * 버튼 크기를 선택합니다.
   * - 'sm': 작은 크기의 버튼 ex) 수락/거절
   * - 'md': 중간 크기의 버튼 ex) 로그인 버튼
   * - 'lg': 큰 크기의 버튼 ex) 모달 버튼
   * - 'none': 사이즈 없음
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'none';
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
  className?: string;
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
  /**
   * 버튼 요소에 접근하기 위한 React ref입니다.
   * 외부에서 포커스 제어나 DOM 접근이 필요한 경우 사용할 수 있습니다.
   */
  ref?: React.Ref<HTMLButtonElement>; //customComp 적용한다면 바꿔야 함.
  /**
   * 접근성 향상을 위한 라벨 텍스트입니다.
   * 일반적으로 버튼 내부에 텍스트가 없거나, 아이콘만 있는 경우에 사용합니다.
   */
  ariaLabel?: string;
}
