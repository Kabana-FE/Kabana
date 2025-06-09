// 라우터 정의용 path 패턴
export const ROUTES = {
  APP: '/',
  SIGNIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD_LIST: '/dashboards',
  DASHBOARD_DETAIL: '/dashboard/:dashboardId',
  DASHBOARD_EDIT: '/dashboard/:dashboardId/edit',
  MYPAGE: '/mypage',
  NOT_FOUND: '*',
};

// 동적 경로를 생성하는 헬퍼 함수(실제 이동, 링크 생성용 함수)
export const getDashboardDetailPath = (dashboardId: string) => `/dashboard/${dashboardId}`;
export const getDashboardEditPath = (dashboardId: string) => `/dashboard/${dashboardId}/edit`;
