import { requestDelete, requestGet } from '@/apis/base/request';
import { MEMBER_ENDPOINTS } from '@/constants/paths';
import type { MemberListData, MemberListParams } from '@/schemas/member';

/**
 * @description 특정 대시보드의 멤버 목록을 페이지네이션으로 조회합니다.
 * @param params 쿼리 파라미터 객체 (`dashboardId`, `page`, `size`)
 * @returns 멤버 목록과 전체 멤버 수
 */
export const getMemberList = async (params: MemberListParams) => {
  return requestGet<MemberListData>(MEMBER_ENDPOINTS.LIST, { params });
};

/**
 * @description 대시보드의 특정 멤버를 삭제합니다.
 * @param memberId 삭제할 멤버의 ID
 */
export const deleteMember = async (memberId: number) => {
  const response = await requestDelete<void>(MEMBER_ENDPOINTS.DELETE(String(memberId)));
  return response;
};
