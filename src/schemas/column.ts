import { z } from 'zod';

import UI_ERRORS from '@/constants/errors/uiErrors';
/**
 * To server
 * @description 컬럼 생성 폼 유효성 검사를 위한 스키마
 */
export const createColumnSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: UI_ERRORS.VALIDATION.REQUIRED('컬럼 이름') }),
});
/**
 * From server
 * @description 서버로부터 받은 컬럼 데이터의 유효성을 검사하는 스키마
 */
export const columnSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  teamId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
/**
 * To server
 * @description 컬럼 목록 조회 요청 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 */
export const columnListParamsSchema = z.object({
  dashboardId: z.number(),
});
/**
 * From server
 * @description 컬럼 목록 응답 데이터의 유효성을 검사하는 스키마
 */
export const columnListResponseSchema = z.object({
  result: z.literal('SUCCESS'),
  data: z.array(columnSchema).nullable(),
});
/**
 * To server
 * @description 컬럼 수정 폼 유효성 검사를 위한 스키마
 */
export const updateColumnSchema = z.object({
  title: z.string().min(1, { message: UI_ERRORS.VALIDATION.REQUIRED('컬럼 이름') }),
});

export type CreateColumnInput = z.infer<typeof createColumnSchema>;
export type Column = z.infer<typeof columnSchema>;
export type ColumnListParams = z.infer<typeof columnListParamsSchema>;
export type ColumnListData = z.infer<typeof columnListResponseSchema>;
export type UpdateColumnInput = z.infer<typeof updateColumnSchema>;

export const columnsSchema = z.object({
  result: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      teamId: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  ),
});

export const columnDetailsSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  cards: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      dueDate: z.string(),
      assignee: z.object({
        profileImageUrl: z.string(),
        nickname: z.string(),
        id: z.number(),
      }),
      imageUrl: z.string(),
      teamId: z.string(),
      columnId: z.number(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  ),
});

// to Sever
export type ColumnsType = z.infer<typeof columnsSchema>;
export type ColumnDetailsType = z.infer<typeof columnDetailsSchema>;
