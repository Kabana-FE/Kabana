import { HttpStatusCode } from 'axios';
import { redirect } from 'react-router-dom';

import { getDashboardList } from '@/apis/dashboard';
import { ROUTES } from '@/constants/paths';
import { useKabanaStore } from '@/stores';
import handleLoaderError from '@/utils/error/handleLoaderError';

import type { authGuardLoaderData } from './types';

/**
 * @description
 * 라우트 진입 시 로그인 여부를 검사하는 로더입니다.
 *
 * 1. 로그인하지 않은 사용자가 보호된 경로에 접근하려 할 경우 → 로그인 페이지로 리디렉션합니다.
 * 2. 로그인한 사용자가 공개 전용 경로(예: 로그인, 회원가입 등)에 접근하려 할 경우 → 대시보드 목록 페이지로 리디렉션합니다.
 * 3. 로그인한 사용자가 보호된 경로에 접근하면 → 대시보드 목록 데이터를 로딩하여 반환합니다.
 *
 * @param {boolean} isPrivateOnly
 * - `true`: 로그인된 사용자만 접근 가능한 보호된 경로
 * - `false`: 로그인된 사용자는 접근할 수 없는 공개 전용 경로
 *
 * @returns {Promise<AuthGuardLoaderData | null> | Response}
 * - 접근 가능 시: 대시보드 목록 데이터를 포함한 객체 또는 null
 * - 접근 불가 시: `redirect(...)`를 포함한 Response 객체
 */
export const authGuardLoader = async (isPrivateOnly = false): Promise<authGuardLoaderData | null> => {
  const isLoggedIn = useKabanaStore.getState().isLoggedIn;
  const clearAuth = useKabanaStore.getState().clearAuth;

  if (!isPrivateOnly && isLoggedIn) {
    console.warn('⚠️ 로그인한 사용자가 공개 전용 경로에 접근하려 했습니다. 대시보드로 리디렉션합니다.');
    throw redirect(ROUTES.DASHBOARD_LIST);
  }

  if (isPrivateOnly && !isLoggedIn) {
    console.warn('⚠️ 로그인하지 않은 사용자가 보호된 경로에 접근하려 했습니다. 로그인 페이지로 리디렉션합니다.');
    throw redirect(ROUTES.SIGNIN);
  }

  if (isPrivateOnly && isLoggedIn) {
    try {
      const dashboardListResponse = await getDashboardList({
        navigationMethod: 'pagination',
        page: 1,
      });
      const rawDashboardListResponse = await getDashboardList({
        navigationMethod: 'infiniteScroll',
        size: 10,
        cursorId: null,
      });

      return {
        dashboards: dashboardListResponse.dashboards,
        totalCount: dashboardListResponse.totalCount,
        pageSize: 10,

        //const dashboardListResponse = dashboardListResponseSchema.parse(rawDashboardListResponse);
      };
    } catch (error) {
      // 401이면 토큰 만료 → 자동 로그아웃
      if (error instanceof Response && error.status === HttpStatusCode.Unauthorized) {
        clearAuth();
        useKabanaStore.persist.clearStorage();
        throw redirect(ROUTES.SIGNIN);
      }

      return handleLoaderError(error);
    }
  }

  return null;
};
