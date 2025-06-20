import ChevronIcon from '@/assets/icons/ChevronIcon';
import { useKabanaStore } from '@/stores';

import Button from '../button';

const DashboardHeader = () => {
  const { isSidebarOpen, toggleSidebar } = useKabanaStore();
  return (
    <header className='fixed top-0 left-0 z-50 flex h-50 w-full items-center border-b border-gray-200 bg-white pr-24'>
      <Button
        aria-label={isSidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
        className='h-auto items-center justify-center rounded-full border bg-white p-10 shadow-md transition hover:bg-gray-100 active:bg-cream'
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <div className='flex items-center justify-center gap-3'>
            <ChevronIcon direction='left' />
          </div>
        ) : (
          <div className='flex items-center justify-center gap-3'>
            <ChevronIcon direction='right' />
          </div>
        )}
      </Button>
    </header>
  );
};

export default DashboardHeader;
