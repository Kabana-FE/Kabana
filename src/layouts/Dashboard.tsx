import { Outlet } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import DashboardHeader from '@/components/common/header/Dashboard';
import Sidebar from '@/components/common/sidebar';
import { useKabanaStore } from '@/stores';

const DashboardLayout = () => {
  const isSidebarOpen = useKabanaStore((state) => state.isSidebarOpen);

  const mainContentClasses = twMerge(
    'flex flex-1 transition-all duration-300 ease-in-out',
    isSidebarOpen ? 'ml-70 tablet:ml-160 pc:ml-300' : 'tablet:ml-70',
  );

  return (
    <div className='relative flex min-h-screen flex-col bg-gray-100'>
      <DashboardHeader />
      <div className='relative flex w-full flex-1'>
        <Sidebar />
        <div className={mainContentClasses}>
          <main className='flex flex-1 bg-gray-100 pt-60 tablet:pt-70'>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
