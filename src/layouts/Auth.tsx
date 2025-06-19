import { Outlet } from 'react-router';

const AuthLayout = () => (
  <main className='flex flex-1 flex-col items-center justify-center bg-gray-100'>
    <Outlet />
  </main>
);

export default AuthLayout;
