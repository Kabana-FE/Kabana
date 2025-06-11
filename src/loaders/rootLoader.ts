import { getDashboardList } from '@/apis/fetch/dashboard';
import type { DashboardListData } from '@/schemas/dashboard';

import type { RootLoaderData } from './types';

//! 토큰 받는건 추후 수정 필요
const getAuthToken = () => localStorage.getItem('accessToken');

export const rootLoader = async (): Promise<RootLoaderData> => {
  const token: string | null = getAuthToken();

  // 로그인 상태가 아니면, 대시보드 목록을 불러오지 않습니다.
  if (!token) {
    return { dashboards: [] };
  }

  try {
    const dashboardListResponse: DashboardListData = await getDashboardList({
      navigationMethod: 'infiniteScroll',
      size: 10,
    });
    return { dashboards: dashboardListResponse.dashboards };
  } catch (error: unknown) {
    console.error(error);
    return { dashboards: [] };
  }
};
