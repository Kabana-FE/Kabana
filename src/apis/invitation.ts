import { DASHBOARD_ENDPOINTS, INVITATION_ENDPOINTS } from '@/constants/paths';
import type {
  Invitation,
  InvitationList,
  InvitationListParams,
  InviteMemberInput,
  RespondInvitationParams,
} from '@/schemas/invitation';

import { requestGet, requestPost, requestPut } from './base/request';

/**
 * @description 초대 목록을 조회합니다.
 * @param params 쿼리 파라미터 (cursorId, title, size)
 */
export const getInvitationList = async (params: InvitationListParams) => {
  return requestGet<InvitationList>(INVITATION_ENDPOINTS.LIST, { params });
};

/**
 * @description 초대에 응답합니다.
 * @param dashboardId 수정할 대시보드 ID
 * @param dashboardInput 수정할 대시보드 데이터
 */
export const respondInvitation = async (invitationId: number, respond: RespondInvitationParams) => {
  return requestPut<Invitation, RespondInvitationParams>(INVITATION_ENDPOINTS.RESPOND(String(invitationId)), respond);
};

export const inviteMember = async (dashboardId: number, invitationInput: InviteMemberInput) => {
  return requestPost<Invitation, InviteMemberInput>(DASHBOARD_ENDPOINTS.INVITE(String(dashboardId)), invitationInput);
};
