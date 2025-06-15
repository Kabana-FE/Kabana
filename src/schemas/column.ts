import { z } from 'zod';
/**
 * To server
 * @description 컬럼 생성 폼 유효성 검사를 위한 스키마
 */
export const createColumnSchema = z.object({
  title: z.string(),
});
/**
 * From server
 * @description 서버로부터 받은 컬럼 데이터의 유효성을 검사하는 스키마
 */
export const columnSchema = z.object({
  id: z.number(),
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
  data: z.array(columnSchema),
});
/**
 * To server
 * @description 컬럼 수정 및 삭제 요청 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 */
export const columnParamsSchema = z.object({
  columnId: z.number(),
});
/**
 * To server
 * @description 컬럼 수정 폼 유효성 검사를 위한 스키마
 */
export const updateColumnSchema = z.object({
  title: z.string(),
});

export type CreateColumnInput = z.infer<typeof createColumnSchema>;
export type Column = z.infer<typeof columnSchema>;
export type ColumnListParams = z.infer<typeof columnListParamsSchema>;
export type ColumnListData = z.infer<typeof columnListResponseSchema>;
export type ColumnParams = z.infer<typeof columnParamsSchema>;
export type UpdateColumnInput = z.infer<typeof updateColumnSchema>;
