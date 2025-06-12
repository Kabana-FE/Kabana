import { requestDelete, requestGet } from '@/apis/request';
import safeRequest from '@/apis/safeRequest';
import { MEMBER_ENDPOINTS } from '@/constants/paths';
import type { MemberListData, MemberListParams } from '@/schemas/member';
import { memberListResponseSchema } from '@/schemas/member';

/**
 * @description 특정 대시보드의 멤버 목록을 페이지네이션으로 조회합니다.
 * @param params 쿼리 파라미터 객체 (`dashboardId`, `page`, `size`)
 * @returns 멤버 목록과 전체 멤버 수
 */
export const getMemberList = (params: MemberListParams) => {
  return safeRequest(async () => {
    const response = await requestGet<MemberListData>(MEMBER_ENDPOINTS.LIST, { params });
    return memberListResponseSchema.parse(response);
  }, 'GET MEMBER LIST');
};

/**
 * @description 대시보드의 특정 멤버를 삭제합니다.
 * @param memberId 삭제할 멤버의 ID
 */
export const deleteMember = (memberId: number) => {
  return safeRequest(() => requestDelete<void>(MEMBER_ENDPOINTS.DELETE(String(memberId))), 'DELETE MEMBER');
};
