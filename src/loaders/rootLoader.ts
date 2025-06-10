import { getDashboardList } from '@/apis/fetch/dashboard';

//! 토큰 받는건 추후 수정 필요
const getAuthToken = () => localStorage.getItem('accessToken');

export const rootLoader = async () => {
  const token = getAuthToken();

  // 로그인 상태가 아니면, 대시보드 목록을 불러오지 않습니다.
  if (!token) {
    return { dashboards: [] };
  }

  try {
    const dashboardListResponse = await getDashboardList({
      navigationMethod: 'infiniteScroll',
      size: 10,
    });
    return { dashboards: dashboardListResponse.dashboards };
  } catch (error) {
    console.error(error);
    return { dashboards: [] };
  }
};
