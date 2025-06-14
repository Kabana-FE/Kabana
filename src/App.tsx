import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';

import { PendingUI, SplashScreen } from '@/components/common/loadingStatus';
import { ROUTES } from '@/constants/paths/routes';

const { APP: LANDING, SIGNUP, SIGNIN } = ROUTES;

/**
 * @description
 * App의 루트 컴포넌트로, SplashScreen → PendingUI → 실제 콘텐츠(Outlet) 순으로 구성됩니다.
 * 라우터 설정에 따라 LandingLayout, DashboardLayout, SimpleLayout 중 하나가 Outlet을 통해 이곳에 렌더링됩니다.
 * 최소 Splash 시간을 보장하게 만들 수 있습니다.
 */
const App = () => {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const [ready, setReady] = useState(false);
  const [minSplashTime, setMinSplashTime] = useState(false);

  const isPending = navigation.state !== 'idle';

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

  return (
    <div className='flex min-h-screen flex-col'>
      {isPending && <PendingUI />}
      <Outlet />
    </div>
  );
};

export default App;
