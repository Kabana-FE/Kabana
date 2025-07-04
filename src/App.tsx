import { useEffect, useState } from 'react';
import { Outlet, useNavigation } from 'react-router';

import { PendingUI, SplashScreen } from './components/common/loadingStatus';
/**
 * App 컴포넌트
 *
 * 애플리케이션의 루트 컴포넌트로, 라우터에 따라 페이지를 렌더링하기 전 다음과 같은 로딩 흐름을 제어합니다:
 *
 * 1. SplashScreen 단계:
 *    - 최초 앱 진입 시 1000ms 이상 걸리면 SplashScreen이 표시될 수 있습니다.
 *    - 이 시간이 지나기 전에 라우팅 상태가 'idle'이면 Splash를 건너뛰고 바로 콘텐츠를 렌더링합니다.
 *
 * 2. PendingUI 단계:
 *    - 페이지 전환(navigation.state !== 'idle')이 감지되면, 1000ms 이상 지속될 경우에만 PendingUI가 표시됩니다.
 *    - 너무 짧은 전환에는 PendingUI가 표시되지 않아 UX 깜빡임을 방지합니다.
 *    - 전환이 끝나면 PendingUI는 즉시 사라집니다.
 *
 * 3. Outlet 영역:
 *    - React Router의 <Outlet />을 통해 실제 라우터에서 매칭된 컴포넌트가 이곳에 렌더링됩니다.
 *
 * 구성 요소:
 * - <SplashScreen /> : 초기 진입 시 보여줄 앱 소개 또는 로딩 화면
 * - <PendingUI /> : 페이지 전환 중 일정 시간 이상 로딩이 지속될 경우 나타나는 인디케이터
 * - <Outlet /> : 라우팅된 레이아웃 또는 페이지가 실제로 렌더링되는 자리
 *
 * @returns {React.ReactElement} 앱의 루트 레이아웃 및 로딩 UI를 포함한 JSX 요소
 */
const App = () => {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== 'idle';
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [shouldShowSplash, setShouldShowSplash] = useState(false);
  const [showPendingUI, setShowPendingUI] = useState(false);
  useEffect(() => {
    if (!isInitialLoading) return;
    const timer = setTimeout(() => {
      setShouldShowSplash(true);
    }, 1000);
    if (!isNavigating) {
      clearTimeout(timer);
      setIsInitialLoading(false);
    }
    return () => clearTimeout(timer);
  }, [isInitialLoading, isNavigating]);
  useEffect(() => {
    if (isInitialLoading) return;
    let timer: ReturnType<typeof setTimeout>;
    if (isNavigating) {
      timer = setTimeout(() => {
        if (isNavigating) {
          setShowPendingUI(true);
        }
      }, 1000);
    } else {
      setShowPendingUI(false);
    }
    return () => clearTimeout(timer);
  }, [isNavigating, isInitialLoading]);
  if (isInitialLoading && shouldShowSplash) return <SplashScreen />;
  if (isInitialLoading) return null;
  return (
    <div className='flex min-h-screen flex-col'>
      {showPendingUI && <PendingUI />}
      <Outlet />
    </div>
  );
};
export default App;
