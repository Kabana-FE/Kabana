import type { ActionFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';

import { cancelInvitee, deleteDashboard, updateDashboard } from '@/apis/dashboard';
import { deleteMember } from '@/apis/member';
import { ROUTES } from '@/constants/paths';
import { updateDashboardSchema } from '@/schemas/dashboard';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const dashboardId = Number(params.dashboardId);
  const formData = await request.formData();
  const intent = formData.get('intent');

  const handleUpdateDashboard = async (formData: FormData, dashboardId: number) => {
    const title = formData.get('title');
    const color = formData.get('color');

    if (typeof title !== 'string' || typeof color !== 'string') {
      throw new Error('Invalid form data');
    }

    const parsed = updateDashboardSchema.parse({ title, color });
    await updateDashboard(dashboardId, parsed);

    return null;
  };

  const handleDeleteMember = async (formData: FormData) => {
    const memberId = formData.get('memberId');
    if (typeof memberId !== 'string') throw new Error('Invalid memberId');

    await deleteMember(Number(memberId));
    return null;
  };

  const handleCancelInvitee = async (formData: FormData, dashboardId: number) => {
    const invitationId = formData.get('invitationId');
    if (typeof invitationId !== 'string') throw new Error('Invalid invitationId');

    await cancelInvitee({ dashboardId, invitationId: Number(invitationId) });
    return null;
  };

  const handleDeleteDashboard = async (dashboardId: number) => {
    await deleteDashboard(dashboardId);
    return redirect(ROUTES.DASHBOARD_LIST);
  };

  try {
    switch (intent) {
      case 'updateDashboard':
        return handleUpdateDashboard(formData, dashboardId);
      case 'deleteMember':
        return handleDeleteMember(formData);
      case 'cancelInvitee':
        return handleCancelInvitee(formData, dashboardId);
      case 'deleteDashboard':
        return handleDeleteDashboard(dashboardId);
      default:
        throw new Error(`Unknown intent: ${intent}`);
    }
  } catch (error) {
    console.error(`🩺 [${intent}] 실패`, error);
    return new Response('요청 처리 중 오류가 발생했습니다.', { status: 500 });
  }
};
