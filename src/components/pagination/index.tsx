import ChevronIcon from '@/assets/icons/ChevronIcon';
import Button from '@/components/common/button';

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
 * @param {boolean} isLoading - 로딩 여부
 *
 * @example
 * <Pagination
 *   currentPage={2}
 *   totalPages={5}
 *   onPageChange={(page) => console.log('페이지 변경:', page)}
 * />
 */

const Pagination = ({ currentPage, totalPages, onPageChange, isLoading, children }: PaginationProps) => {
  const paginationBtnStyle =
    ' border border-gray-300 p-0 active:bg-gray-200 disabled:border-1 disabled:border-solid disabled:border-gray-800 disabled:bg-white disabled:opacity-20 tablet:size-40 bg-white';
  return (
    <div className='flex items-center'>
      <div className='mx-2'>{children}</div>
      <Button
        aria-label='이전 페이지'
        className={`${paginationBtnStyle} rounded-r-none p-4`}
        disabled={currentPage === 1 || isLoading}
        size='none'
        variant='none'
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronIcon direction='left' size={16} />
      </Button>
      <Button
        aria-label='다음 페이지'
        className={`${paginationBtnStyle} rounded-l-none p-4`}
        disabled={currentPage === totalPages || isLoading}
        size='none'
        variant='none'
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronIcon direction='right' size={16} />
      </Button>
    </div>
  );
};

export default Pagination;
