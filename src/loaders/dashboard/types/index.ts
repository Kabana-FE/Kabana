import type { MemberListData } from '@/schemas/member'; // 멤버 스키마에서 필요한 타입을 가져옵니다.
import type { DashboardApplicationServiceResponseDto } from '@/types/dto'; // 필요한 경우 DTO에서 직접 가져올 수도 있습니다.

/**
 * @description detailLoader가 반환하는 데이터의 타입입니다.
 */
export interface DashboardDetailLoaderData {
  dashboardDetail: DashboardApplicationServiceResponseDto; // DTO에서 가져온 상세 대시보드 정보
  memberListResponse: MemberListData; // 멤버 목록 스키마에서 가져온 멤버 리스트 정보
}
