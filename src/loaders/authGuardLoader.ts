import { redirect } from 'react-router-dom';

import { ROUTES } from '@/constants/paths';

//! 토큰 관련은 추후 수정 필요
const isLoggedIn = () => !!localStorage.getItem('accessToken');

/**
 * @description
 * 라우트 진입 시 로그인 여부를 검사하고,
 * 로그인되지 않은 사용자는 로그인 페이지로 리다이렉트하는 보호용 로더입니다.
 *
 * 주로 Private Route(예: 마이페이지, 대시보드 등) 진입 전에 사용됩니다.
 *
 * @example
 * {
 *   path: '/mypage',
 *   loader: protectedRouteLoader,
 *   element: <MyPage />,
 * }
 *
 * @returns {null | Response}
 * 로그인된 경우에는 null을 반환하여 페이지 로드를 계속 진행합니다.
 * 로그인되지 않은 경우에는 로그인 페이지로 리다이렉트(redirect)합니다.
 */
export const authGuardLoader = () => {
  if (!isLoggedIn()) {
    return redirect(ROUTES.SIGNIN);
  }

  return null;
};
