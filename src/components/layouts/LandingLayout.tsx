import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/footer/Footer';
import LandingHeader from '@/components/common/header/LandingHeader';

const LandingLayout = () => (
  <div className='flex min-h-screen flex-col'>
    <LandingHeader />
    <main className='flex-1'>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default LandingLayout;
