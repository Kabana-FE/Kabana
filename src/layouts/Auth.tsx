import { Outlet } from 'react-router';

const AuthLayout = () => (
  <main className='flex min-h-screen items-center justify-center bg-gray-100'>
    <Outlet />
  </main>
);

export default AuthLayout;
