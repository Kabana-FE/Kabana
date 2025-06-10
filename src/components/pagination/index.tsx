import PaginationButton from '../buttons/pagination';
import type PaginationProps from './types';

/**
 * 페이지네이션 컨트롤러 컴포넌트입니다.
 * 현재 페이지와 전체 페이지 수에 따라 이전/다음 버튼의 활성화 여부를 판단하고,
 * 페이지 변경 요청 시 콜백 함수를 호출합니다.
 *
 * @component
 *
 * @param {number} currentPage - 현재 페이지 번호 (1부터 시작)
 * @param {number} totalPages - 전체 페이지 수
 * @param {(page: number) => void} onPageChange - 페이지가 변경될 때 호출되는 콜백 함수
 *
 * @example
 * <Pagination
 *   currentPage={2}
 *   totalPages={5}
 *   onPageChange={(page) => console.log('페이지 변경:', page)}
 * />
 */

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <>
      <PaginationButton
        direction='left'
        isDisabled={currentPage === 1}
        onButtonClick={() => onPageChange(currentPage - 1)}
      />
      <PaginationButton
        direction='right'
        isDisabled={currentPage === totalPages}
        onButtonClick={() => onPageChange(currentPage + 1)}
      />
    </>
  );
};

export default Pagination;
