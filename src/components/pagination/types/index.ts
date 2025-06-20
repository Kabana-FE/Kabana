export default interface PaginationProps {
  /**
   * 현재 페이지 번호 (1부터 시작)
   */
  currentPage: number;

  /**
   * 전체 페이지 수
   */
  totalPages: number;

  /**
   * 페이지가 변경될 때 호출되는 콜백 함수
   * @param page - 이동할 페이지 번호
   */
  onPageChange: (page: number) => void;

  /**
   * 로딩 상태여부를 나타냅니다.
   * `true`이면 로딩 중, `false`이면 로딩이 완료되었거나 시작되지 않은 상태입니다.
   */
  isLoading?: boolean;
}
