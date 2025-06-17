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
}
