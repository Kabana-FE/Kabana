export default interface SearchParams {
  /**
   * 검색 입력 필드의 현재 값입니다.
   */
  value: string;
  /**
   * 검색 입력 필드의 값을 업데이트하는 React state setter 함수입니다.
   */
  setValue: React.Dispatch<React.SetStateAction<string>>;
  /**
   * 검색 로직을 실행하는 콜백 함수입니다.
   * `delay` 시간 후 `value`를 인자로 받아 호출됩니다.
   * @param {string} value - 현재 검색어.
   */
  onSearch: (value: string) => void;
  /**
   * 검색어 입력 후 `onSearch` 함수가 호출되기까지의 지연 시간(밀리초)입니다.
   * 기본값은 500ms입니다.
   */
  delay?: number;
}
