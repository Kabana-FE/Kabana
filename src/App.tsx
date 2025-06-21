// import { useEffect, useState } from 'react';
// import { Outlet, useNavigation } from 'react-router-dom';

// import { PendingUI, SplashScreen } from '@/components/common/loadingStatus';

// /**
//  * @description
//  * App의 루트 컴포넌트로, SplashScreen → PendingUI → 실제 콘텐츠(Outlet) 순으로 구성됩니다.
//  * 라우터 설정에 따라 LandingLayout, DashboardLayout, AuthLayout 중 하나가 Outlet을 통해 이곳에 렌더링됩니다.
//  * 최소 Splash 시간을 보장하게 만들 수 있습니다.
//  */

// // 스플래시 화면을 보여주기 전 최소 대기 시간 (ms)
// // 이 시간 안에 로딩이 완료되면 스플래시를 건너뜁니다.
// const SPLASH_MIN_WAIT_MS = 1000;
// // 페이지 전환 PendingUI를 보여주기 전 최소 대기 시간 (ms)
// // 너무 짧으면 빠른 환경에서 깜빡이고, 너무 길면 사용자가 응답 없다고 느낄 수 있습니다. 200-300ms가 적절합니다.
// const PENDING_UI_WAIT_MS = 1000;

// const App = () => {
//   const navigation = useNavigation();
//   const [isInitialLoading, setIsInitialLoading] = useState(true);
//   const [shouldShowSplash, setShouldShowSplash] = useState(false);
//   const [showPendingUI, setShowPendingUI] = useState(false);

//   const isNavigating = navigation.state !== 'idle';

//   // 1. 초기 로딩(Splash)을 위한 useEffect
//   useEffect(() => {
//     if (!isInitialLoading) return;

//     // 타입을 명시적으로 지정합니다.
//     let timer: ReturnType<typeof setTimeout>;

//     timer = setTimeout(() => {
//       setShouldShowSplash(true);
//     }, SPLASH_MIN_WAIT_MS);

//     if (!isNavigating) {
//       clearTimeout(timer);
//       setIsInitialLoading(false);
//     }

//     return () => clearTimeout(timer);
//   }, [isNavigating, isInitialLoading]);

//   // 2. 페이지 전환(PendingUI)을 위한 새로운 useEffect
//   useEffect(() => {
//     if (isInitialLoading) return;

//     // 타입을 명시적으로 지정합니다.
//     let timer: ReturnType<typeof setTimeout>;

//     if (isNavigating) {
//       timer = setTimeout(() => {
//         setShowPendingUI(true);
//       }, PENDING_UI_WAIT_MS);
//     } else {
//       // 'timer'가 할당되기 전에 clearTimeout이 호출될 수 있으므로,
//       // 여기서는 setShowPendingUI(false)만 호출합니다.
//       // 타이머 클리어는 cleanup 함수에서 처리됩니다.
//       setShowPendingUI(false);
//     }

//     // 클린업 함수에서 타이머를 안전하게 제거합니다.
//     return () => clearTimeout(timer);
//   }, [isNavigating, isInitialLoading]);

//   // ... 이하 렌더링 로직은 동일 ...
//   if (isInitialLoading && shouldShowSplash) {
//     return <SplashScreen />;
//   }

//   if (isInitialLoading) {
//     return null;
//   }

//   return (
//     <div className='flex min-h-screen flex-col'>
//       {showPendingUI && <PendingUI />}
//       <Outlet />
//     </div>
//   );
// };

// export default App;
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { PendingUI, SplashScreen } from '@/components/common/loadingStatus';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 최소 2초는 Splash 보여줌

    // 실제 앱 준비가 완료됐다고 가정 (데이터 로딩 시 여기서 Promise.all 등으로 대체 가능)
    const readyTimer = setTimeout(() => {
      setIsAppReady(true);
    }, 3000); // 앱 준비까지 총 3초 걸리게 설정

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  if (showSplash) return <SplashScreen />;
  if (!isAppReady) return <PendingUI />;
  return <Outlet />;
};

export default App;
