import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/footer';
import LandingHeader from '@/components/common/header/Landing';

const LandingLayout = () => (
  <div className='flex min-h-screen flex-col'>
    <LandingHeader />
    <main className='flex-1 items-center justify-center bg-black'>
      {/* px-16 tablet:px-40 pc:px-360 패딩을 추가하려다 유연하지 못할거 같아서 center로 맞추기만 했어요. 지현님이 보고 필요하면 추가하세요.*/}
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default LandingLayout;
