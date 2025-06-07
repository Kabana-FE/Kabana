// import { useEffect, useState } from 'react';
// import { RouterProvider } from 'react-router-dom';

// import { SplashScreen } from './components/loadingStatus';

// const App = ({ router }) => {
//   const [showSplashScreen, setShowSplashScreen] = useState(true);

//   useEffect(() => {
//     const splashScreenInterval = setInterval(() => {
//       const navState = router.state.navigation.state;

//       if (navState === 'idle') {
//         setShowSplashScreen(false);
//         clearInterval(splashScreenInterval);
//       }
//     }, 1000);

//     return () => clearInterval(splashScreenInterval); // ← return문 빠졌던 부분 보완
//   }, []);

//   return <>{showSplashScreen ? <SplashScreen /> : <RouterProvider router={router} />}</>;
// };

// export default App;
