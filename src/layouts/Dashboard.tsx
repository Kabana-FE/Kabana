import { Outlet } from 'react-router-dom';

import DashboardHeader from '@/components/common/header/Dashboard';

const DashboardLayout = () => (
  <div className='flex min-h-screen flex-col'>
    <DashboardHeader />
    <main className='flex flex-1 flex-col pt-[64px]'>
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
