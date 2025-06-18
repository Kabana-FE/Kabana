import { redirect } from 'react-router-dom';

import UI_ERRORS from '@/constants/errors/uiErrors';
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
 * 라우트 진입 시 로그인 여부를 검사합니다.
 * - 로그인되지 않은 사용자는 로그인 페이지로 리다이렉트합니다 (Auth Guard).
 * - 로그인된 사용자가 특정 공용 페이지(로그인, 회원가입)에 접근하는 것을 방지합니다.(대시보드 페이지로 리다이렉트)
 *
 * @param {object} options - 로더 옵션
 * @param {boolean} options.isPublicOnly
 * - true일 경우, 로그인된 사용자가 접근하지 못하는 공개 전용 경로임을 의미합니다.기본값은 false입니다.
 * - false일 경우, 로그인하지 않은 사용자가 접근하지 못하는 보호된 경로임을 의미합니다.
 *
 * @returns {null | Response}
 * - 접근 허용: `null`을 반환하여 페이지 로드를 계속 진행합니다.
 * - 접근 제한: 지정된 페이지로 리다이렉트하는 `Response` 객체를 반환합니다.
 */
export const authGuardLoader = (isPrivateOnly: boolean = false) => {
  const isLoggedIn = checkIsLoggedIn();

  if (isPrivateOnly && isLoggedIn) {
    console.warn('⚠️ 로그인한 사용자가 공개 전용 경로에 접근하려 했습니다. 대시보드로 리디렉션합니다.');
    sessionStorage.setItem('auth-redirect-toast', UI_ERRORS.AUTH_GUARD.NEED_SIGNOUT);
    throw redirect(ROUTES.DASHBOARD_LIST);
  }

  if (!isPrivateOnly && !isLoggedIn) {
    console.warn('⚠️ 로그인하지 않은 사용자가 보호된 경로에 접근하려 했습니다. 로그인 페이지로 리디렉션합니다.');
    sessionStorage.setItem('auth-redirect-toast', UI_ERRORS.AUTH_GUARD.NEED_SIGNIN);
    throw redirect(ROUTES.SIGNIN);
  }

  return null;
};

// ! 로그인페이지와 대시보드 페이지에서 토스트 처리할 예정.-> 세션스토리지 사용
