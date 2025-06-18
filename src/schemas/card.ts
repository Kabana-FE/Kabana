import { z } from 'zod';

import UI_ERRORS from '@/constants/errors/uiErrors';

export const createTodoSchema = z.object({
  assigneeUserId: z.coerce.number(),
  dashboardId: z.coerce.number(),
  columnId: z.coerce.number(),
  title: z
    .string()
    .trim()
    .min(1, { message: UI_ERRORS.VALIDATION.STRING_MIN(1) }),
  description: z
    .string()
    .trim()
    .min(1, { message: UI_ERRORS.VALIDATION.STRING_MIN(1) }),
  dueDate: z.string().min(1, { message: '날짜 형식이 올바르지 않습니다' }),
  tags: z.array(z.string(), { message: 'error' }).min(1, { message: '최소 1개' }).max(3, { message: '최대 3개' }),
  imageUrl: z.instanceof(FileList, { message: '파일을 선택해주세요' }),
});

export const cardSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  dueDate: z.string(),
  assignee: z.object({
    profileImageUrl: z.string(),
    nickname: z.string(),
    id: z.coerce.number(),
  }),
  imageUrl: z.string(),
  teamId: z.string(),
  columnId: z.coerce.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const getCardListSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  cards: z.array(cardSchema).optional(),
});

export const cardListValidateSchema = z.array(getCardListSchema);

export type CreateTodoType = z.infer<typeof createTodoSchema>;
export type GetCardListType = z.infer<typeof getCardListSchema>;
export type CardListValidateType = z.infer<typeof cardListValidateSchema>;
export type CardType = z.infer<typeof cardSchema>;
