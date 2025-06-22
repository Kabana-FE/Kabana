import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/footer';
import LandingHeader from '@/components/common/header/Landing';

const LandingLayout = () => (
  <div className='flex min-h-screen flex-col'>
    <LandingHeader />
    <main className='flex-1 items-center justify-center bg-black px-16 tablet:px-40'>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default LandingLayout;
