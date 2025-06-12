import type { Dashboard } from '@/schemas/dashboard';
import type { MemberListData } from '@/schemas/member';

/**
 * @description 대시보드 상세 페이지 로더(detailLoader)가 반환하는 데이터의 타입입니다.
 */
export interface DashboardDetailLoaderData {
  dashboardDetail: Dashboard;
  memberListResponse: MemberListData;
}
