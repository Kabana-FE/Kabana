import { z } from 'zod';

import UI_ERRORS from '@/constants/errors/uiErrors';
export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  cardId: z.number(),
  author: z.object({
    profileImageUrl: z.string(),
    nickname: z.string(),
    id: z.number(),
  }),
});

export const createCommentSchema = z.object({
  content: z.string().min(1, { message: UI_ERRORS.VALIDATION.STRING_MIN(1) }),
  cardId: z.number(),
  columnId: z.number(),
  dashboardId: z.number(),
});

export const commentsSchema = z.array(commentSchema);

export const getCommentsSchema = z.object({
  cursorId: z.number(),
  comments: commentsSchema,
});

export type GetCommentsType = z.infer<typeof getCommentsSchema>;
export type CommentsType = z.infer<typeof commentsSchema>;
export type CommentType = z.infer<typeof commentSchema>;
export type CreateComment = z.infer<typeof createCommentSchema>;
