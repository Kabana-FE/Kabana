import { Outlet } from 'react-router-dom';

import DashboardHeader from '@/components/common/header/Dashboard';
import Sidebar from '@/components/common/sidebar';

const DashboardLayout = () => (
  <div className='flex min-h-screen flex-col'>
    <DashboardHeader />
    <Sidebar />
    <main className='flex flex-1 flex-col items-center justify-center bg-gray-100'>
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
