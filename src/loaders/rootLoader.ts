import { HttpStatusCode } from 'axios';
import { redirect } from 'react-router-dom';

import { getDashboardList } from '@/apis/dashboard';
import { ROUTES } from '@/constants/paths';
import type { DashboardListData } from '@/schemas/dashboard';
import { useAuthStore } from '@/stores/useAuthStore';
import handleLoaderError from '@/utils/error/handleLoaderError';

import type { RootLoaderData } from './types';

/**
 * @description
 * 앱의 최상위 로더. 앱이 로드될 때 가장 먼저 실행됩니다.
 * - 사용자의 로그인 상태를 확인합니다.
 * - 로그인 상태일 경우, 모든 페이지에서 공통으로 필요한 데이터(예: 사이드바의 대시보드 목록)를 불러옵니다.
 * - 이 과정에서 API 호출을 통해 토큰의 유효성을 암묵적으로 검증하고, 401 에러 발생 시 사용자를 자동으로 로그아웃 처리합니다.
 */
export const rootLoader = async (): Promise<RootLoaderData> => {
  const { isLoggedIn, clearAuth } = useAuthStore.getState();

  if (!isLoggedIn) {
    return { dashboards: [] };
  }

  try {
    const dashboardListResponse: DashboardListData = await getDashboardList({
      navigationMethod: 'infiniteScroll',
      size: 10,
    });
    return { dashboards: dashboardListResponse.dashboards };
  } catch (error: unknown) {
    if (error instanceof Response && error.status === HttpStatusCode.Unauthorized) {
      console.warn('⚠️ Token is invalid or expired. Logging out.');
      clearAuth();
      useAuthStore.persist.clearStorage();
      throw redirect(ROUTES.SIGNIN);
    }

    return handleLoaderError(error);
  }
};
