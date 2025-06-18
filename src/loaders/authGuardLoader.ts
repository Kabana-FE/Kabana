import { redirect } from 'react-router-dom';

import { ROUTES } from '@/constants/paths';
import { useKabanaStore } from '@/stores';

/**
 * @description
 * Zustand 스토어의 상태를 React 컴포넌트 외부에서 동기적으로 읽어오는 함수입니다.
 * 로더(Loader)와 같이 React 훅을 사용할 수 없는 환경에서 사용됩니다.
 *
 * @returns {boolean} 사용자의 로그인 여부
 */
const checkIsLoggedIn = (): boolean => {
  return useKabanaStore.getState().isLoggedIn;
};

/**
 * @description
 * 라우트 진입 시 로그인 여부를 검사하고,
 * 로그인되지 않은 사용자는 로그인 페이지로 리다이렉트하는 보호용 로더(Auth Guard)입니다.
 *
 * 주로 Private Route(예: 마이페이지, 대시보드 등) 진입 전에 사용됩니다.
 * 로더는 React 훅을 사용할 수 없으므로, 스토어의 `getState()`를 통해 직접 상태를 확인합니다.
 *
 * @example
 * {
 * path: '/mypage',
 * loader: authGuardLoader,
 * element: <MyPage />,
 * }
 *
 * @returns {null | Response}
 * - 로그인된 경우: `null`을 반환하여 페이지 로드를 계속 진행합니다.
 * - 로그인되지 않은 경우: 로그인 페이지로 리다이렉트하는 `Response` 객체를 반환합니다.
 */
export const authGuardLoader = () => {
  if (!checkIsLoggedIn()) {
    return redirect(ROUTES.SIGNIN);
  }

  return null;
};
