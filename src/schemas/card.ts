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

export type CreateTodoType = z.infer<typeof createTodoSchema>;
