import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';

import { PendingUI, SplashScreen } from '@/components/common/loadingStatus';

import DashboardLayout from './components/layouts/DashboardLayout';
import LandingLayout from './components/layouts/LandingLayout';

const Root = () => {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const [ready, setReady] = useState(false);
  const [minSplashTime, setMinSplashTime] = useState(false);

  const isPending = navigation.state !== 'idle';
  const isLanding = pathname === '/';
  const isAuthPage = pathname.startsWith('/signup') || pathname.startsWith('/login');

  // 최소 splash 시간 보장 - 영상 찍을때 필요.
  useEffect(() => {
    const timeout = setTimeout(() => setMinSplashTime(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (navigation.state === 'idle' && minSplashTime) {
      setReady(true);
    }
  }, [navigation.state, minSplashTime]);

  if (!ready) return <SplashScreen />;

  if (isPending) return <PendingUI />;
  if (isLanding) return <LandingLayout />;
  if (isAuthPage) return <Outlet />;

  return <DashboardLayout />;
};

export default Root;
