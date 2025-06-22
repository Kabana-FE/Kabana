import type { ActionFunctionArgs } from 'react-router';

import { createCard } from '@/apis/card';
import { createColumn } from '@/apis/column';
import type { CreateColumnInput } from '@/schemas/column';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  // const detailIdString: string | undefined = params.dashboardId;
  const formData = await request.formData();
  const intent = formData.get('intent');
  switch (intent) {
    case 'createTodo': {
      const dashboardId = Number(params.dashboardId);
      const assigneeUserId = Number(formData.get('assigneeUserId'));
      const columnId = Number(formData.get('columnId'));
      const tags = JSON.parse(formData.get('tags') as string);
      const rawDueDate = formData.get('dueDate') as string;
      const formattedDueDate = rawDueDate.replace('T', ' ');
      await createCard({
        dashboardId: dashboardId,
        assigneeUserId,
        columnId,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        dueDate: formattedDueDate,
        imageUrl: formData.get('imageUrl') as string,
        tags,
      });
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    case 'createComment':
      break;
    case 'editComment':
      break;
    case 'deleteComment':
      break;
    case 'createColumn': {
      const title = String(formData.get('title'));
      const dashboardId = Number(formData.get('dashboardId'));
      if (typeof title !== 'string') throw new Error('Invalid title');
      type CreateColumnWithDashboardId = CreateColumnInput & { dashboardId: number };
      const payload: CreateColumnWithDashboardId = {
        title,
        dashboardId,
      };
      await createColumn(payload);
      return null;
    }
    case 'editColumn':
      break;
    case 'deleteColumn':
  }

  return null;
};
