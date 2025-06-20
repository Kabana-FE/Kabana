import type { Dashboard } from '@/schemas/dashboard';
import type { InvitationList } from '@/schemas/invitation';
import type { MemberListData } from '@/schemas/member';

/**
 * @description 대시보드 상세 페이지 로더(detailLoader)가 반환하는 데이터의 타입입니다.
 * @property {import('@/schemas/dashboard').Dashboard} dashboardDetail - 대시보드의 상세 정보입니다.
 * @property {import('@/schemas/member').MemberListData} memberListResponse - 멤버 목록이 포함된 응답 데이터입니다.
 */
export interface DashboardDetailLoaderData {
  dashboardDetail: Dashboard;
  memberListResponse: MemberListData;
}

/**
 * @description 나의 대시보드 페이지 로더(listLoader)가 반환하는 데이터의 타입입니다.
 * @property {import('@/schemas/invitation').InvitationList} invitationList - 내가 초대 받은 리스트 응답 데이터입니다.
 */
export interface DashboardListLoaderData {
  invitationList: InvitationList;
}
