import type { ActionFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';

import { deleteDashboard, deleteInvitee, updateDashboard } from '@/apis/dashboard';
import { inviteMember } from '@/apis/invitation';
import { deleteMember } from '@/apis/member';
import TOAST_MESSAGES from '@/constants/messages/toastMessages';
import { ROUTES } from '@/constants/paths';
import { updateDashboardSchema } from '@/schemas/dashboard';
import { useKabanaStore } from '@/stores';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const dashboardId = Number(params.dashboardId);
  const formData = await request.formData();
  const intent = formData.get('intent');

  if (!intent || typeof intent !== 'string') {
    return new Response('Invalid intent', { status: 400 });
  }

  try {
    switch (intent) {
      case 'updateDashboard': {
        const title = formData.get('title');
        const color = formData.get('color');

        if (typeof title !== 'string' || typeof color !== 'string') {
          throw new Error('Invalid form data');
        }

        const parsed = updateDashboardSchema.parse({ title, color });
        await updateDashboard(dashboardId, parsed);
        return null;
      }

      case 'deleteMember': {
        const memberId = formData.get('memberId');
        if (typeof memberId !== 'string') throw new Error('Invalid memberId');

        await deleteMember(Number(memberId));
        return null;
      }

      case 'deleteInvitee': {
        const invitationId = formData.get('invitationId');
        if (typeof invitationId !== 'string') throw new Error('Invalid invitationId');

        await deleteInvitee({ dashboardId, invitationId: Number(invitationId) });
        return null;
      }

      case 'inviteMember': {
        const email = formData.get('email');
        if (typeof email !== 'string') {
          throw new Error('Invalid email');
        }

        try {
          await inviteMember(dashboardId, { email });
          useKabanaStore.getState().addToast(TOAST_MESSAGES.INVITATION.SUCCESS(email), 'success');
        } catch {
          useKabanaStore.getState().addToast(TOAST_MESSAGES.INVITATION.FAILURE, 'error');
        }

        return null;
      }

      case 'deleteDashboard': {
        await deleteDashboard(dashboardId);
        return redirect(ROUTES.DASHBOARD_LIST);
      }

      default:
        throw new Error(`Unknown intent: ${intent}`);
    }
  } catch (error) {
    console.error(`🩺 [${intent}] 실패`, error);
    return new Response('요청 처리 중 오류가 발생했습니다.', { status: 500 });
  }
};
