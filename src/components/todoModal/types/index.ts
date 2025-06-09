export default interface TodoModalType {
  title: string;
  children: React.ReactNode;
  /**
   * 버튼이 동작할때 실행하는 함수를 넣어줍니다.
   * */
  onSubmit: (e: React.FormEvent) => void;
}
