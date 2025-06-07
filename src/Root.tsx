import { Outlet, useLocation, useNavigation } from 'react-router-dom';

import { PendingUI } from '@/components/common/loadingStatus';

import DashboardLayout from './components/layouts/DashboardLayout';
import LandingLayout from './components/layouts/LandingLayout';

const Root = () => {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const isPending = navigation.state !== 'idle';
  const isLanding = pathname === '/';
  const isAuthPage = pathname.startsWith('/signup') || pathname.startsWith('/login');

  if (isPending) return <PendingUI />;
  if (isLanding) return <LandingLayout />;
  if (isAuthPage) return <Outlet />;

  return <DashboardLayout />;
};

export default Root;
