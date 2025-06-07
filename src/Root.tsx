// import { Outlet, useLocation, useNavigation } from 'react-router-dom';

// import { Footer } from '@/components/footer';
// import { Header } from '@/components/header';
// import { LAYOUT } from '@/constants/layout';

// import { PendingUI } from './components/loadingStatus';

// const Root = () => {
//   const navigation = useNavigation();
//   const isLoading = navigation.state !== 'idle';

//   const { pathname } = useLocation();
//   const isLanding = pathname === '/';

//   return (
//     <>
//       {isLoading ? (
//         <PendingUI />
//       ) : (
//         <>
//           {!isLanding && <Header />}
//           <main
//             style={{
//               paddingTop: !isLanding ? `${LAYOUT.HEADER_HEIGHT}px` : 0,
//             }}
//           >
//             <Outlet />
//           </main>
//           {!isLanding && <Footer />}
//         </>
//       )}
//     </>
//   );
// };

// export default Root;
