import Pagination from '@/components/pagination';

import type { SidebarPaginationProps } from './types';

const SidebarPagination = ({
  totalPages,
  currentPage,
  isSidebarOpen,
  isLoading,
  onPageChange,
}: SidebarPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className='w-full border-t border-gray-200 pt-10'>
      <div className='flex'>
        <Pagination currentPage={currentPage} isLoading={isLoading} totalPages={totalPages} onPageChange={onPageChange}>
          <span className='mr-8 hidden text-md text-gray-400 pc:block'>{`${currentPage} / ${totalPages}`}</span>
        </Pagination>
      </div>
      <div className='w-full pt-5 text-xs text-gray-400'>
        {isSidebarOpen && <div className='mt-2 hidden text-center tablet:block'>Powered by Capybara 🦫</div>}
      </div>
    </div>
  );
};

export default SidebarPagination;
