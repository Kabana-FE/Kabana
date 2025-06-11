export type ButtonProps<T extends React.ElementType> = {
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
   * 버튼 내부에 표시될 콘텐츠입니다.
   */
  children: React.ReactNode;

  as?: T;
} & Omit<React.ComponentPropsWithRef<T>, 'variant' | 'size' | 'children' | 'as'>;
