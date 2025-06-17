import { Outlet } from 'react-router';

const SimpleLayout = () => (
  <main className='flex flex-1 flex-col'>
    <Outlet />
  </main>
);

export default SimpleLayout;
