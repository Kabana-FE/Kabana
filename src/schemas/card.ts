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
  tags: z
    .array(z.string(), { message: 'error' })
    .min(1, { message: '1개 이상의 태그를 추가해주세요' })
    .max(4, { message: '태그는 4개까지 추가할 수 있습니다' }),
  imageUrl: z.string().optional().nullable(),
});

export const editTodoResponse = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  tags: z
    .array(z.string(), { message: 'error' })
    .min(1, { message: '1개 이상의 태그를 추가해주세요' })
    .max(4, { message: '태그는 4개까지 추가할 수 있습니다' }),
  dueDate: z.string().min(1, { message: '날짜 형식이 올바르지 않습니다' }),
  assignee: z.object({
    profileImageUrl: z.string(),
    nickname: z.string(),
    id: z.number(),
  }),
  imageUrl: z.string().optional().nullable(),
  teamId: z.string(),
  columnId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const editTodoSchema = z.object({
  assigneeUserId: z.coerce.number(),
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
  tags: z
    .array(z.string(), { message: 'error' })
    .min(1, { message: '1개 이상의 태그를 추가해주세요' })
    .max(4, { message: '태그는 4개까지 추가할 수 있습니다' }),
  imageUrl: z.string().optional().nullable(),
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

export const uploadImageSchema = z.object({
  imageUrl: z.string(),
});
export type CreateTodoType = z.infer<typeof createTodoSchema>;
export type EditTodoType = z.infer<typeof editTodoSchema>;
export type GetCardListType = z.infer<typeof getCardListSchema>;
export type CardListValidateType = z.infer<typeof cardListValidateSchema>;
export type CardType = z.infer<typeof cardSchema>;
export type CardImageType = z.infer<typeof uploadImageSchema>;
export type EditTodoResponseType = z.infer<typeof editTodoResponse>;
