import { requestPost } from '@/apis/base/request';
import { DASHBOARD_ENDPOINTS } from '@/constants/paths';
import type { InvitationResponse, InviteMemberInput } from '@/schemas/invitation';
export const inviteMember = async (dashboardId: number, invitationInput: InviteMemberInput) => {
  return requestPost<InvitationResponse, InviteMemberInput>(
    DASHBOARD_ENDPOINTS.INVITE(String(dashboardId)),
    invitationInput,
  );
};
