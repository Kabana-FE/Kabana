import type { ActionFunctionArgs } from 'react-router';

import { createCard, deleteCard, editCard } from '@/apis/card';
import { createComment, deleteComment, editComment } from '@/apis/comment';

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
    case 'editTodo': {
      const assigneeUserId = Number(formData.get('assigneeUserId'));
      const columnId = Number(formData.get('columnId'));
      const rawDueDate = formData.get('dueDate') as string;
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const imageUrl = formData.get('imageUrl') as string;
      const formattedDueDate = rawDueDate.replace('T', ' ');
      const tags = JSON.parse(formData.get('tags') as string);
      const cardId = Number(formData.get('cardId'));
      return await editCard(
        {
          columnId,
          assigneeUserId,
          title,
          description,
          dueDate: formattedDueDate,
          tags,
          imageUrl,
        },
        cardId,
      );
    }

    case 'deleteTodo':
      {
        const cardId = Number(formData.get('cardId'));
        await deleteCard(cardId);
      }
      break;
    case 'createComment': {
      const cardId = Number(formData.get('cardId'));
      const columnId = Number(formData.get('columnId'));
      const dashboardId = Number(formData.get('dashboardId'));
      const content = formData.get('content') as string;
      await createComment({
        cardId,
        columnId,
        dashboardId,
        content,
      });
      return { message: 'success' };
    }
    case 'editComment': {
      const commentId = Number(formData.get('commentId'));
      const content = formData.get('content') as string;
      await editComment(commentId, { content });
      return { message: 'success' };
    }
    case 'deleteComment':
      {
        const commentId = Number(formData.get('commentId'));
        await deleteComment(commentId);
        return { message: 'success' };
      }
      break;
    case 'createColumn':
      break;
    case 'editColumn':
      break;
    case 'deleteColumn':
  }

  return null;
};
