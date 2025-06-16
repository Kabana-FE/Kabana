import { requestPost } from '@/apis/base/request';
import { DASHBOARD_ENDPOINTS } from '@/constants/paths';
import { type InvitationResponse, invitationResponseSchema, type InviteMemberInput } from '@/schemas/invitation';

export const inviteMember = async (dashboardId: number, invitationInput: InviteMemberInput) => {
  const response = await requestPost<InvitationResponse, InviteMemberInput>(
    DASHBOARD_ENDPOINTS.INVITE(String(dashboardId)),
    invitationInput,
  );
  return invitationResponseSchema.parse(response);
};
