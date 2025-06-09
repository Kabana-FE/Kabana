import { Outlet } from 'react-router-dom';

import DashboardHeader from '@/components/common/header/Dashboard';

const DashboardLayout = () => (
  <div className='flex min-h-screen flex-col'>
    <DashboardHeader />
    <main className='flex-1 pt-[64px]'>
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
