import type { LoaderFunctionArgs } from 'react-router-dom';

import { getDashboardDetail } from '@/apis/fetch/dashboard';
import { getMemberList } from '@/apis/fetch/member';

/**
 * 대시보드 상세 페이지에 필요한 모든 데이터를 미리 불러옵니다.
 * - 대시보드 상세 정보
 * - 대시보드 멤버 목록 (헤더용)
 * - 대시보드 컬럼 (본문용)
 */
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const dashboardIdString = params.dashboardId;

  if (!dashboardIdString) {
    throw new Response('Dashboard ID not found in URL parameters.', { status: 400 });
  }

  const dashboardId = Number(dashboardIdString);
  if (isNaN(dashboardId)) {
    console.error(`Invalid Dashboard ID: "${dashboardIdString}" is not a number.`);
    throw new Response('Not Found', { status: 404 });
  }

  const [dashboardDetail, memberListResponse] = await Promise.all([
    getDashboardDetail(dashboardId),
    getMemberList({ dashboardId, size: 4 }),
  ]);

  return { dashboardDetail, memberListResponse };
};
