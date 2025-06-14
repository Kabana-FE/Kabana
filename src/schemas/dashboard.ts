import { z } from 'zod';

import UI_ERRORS from '@/constants/errors/uiErrors';

/**
 * @description 페이지네이션 방식 유효성 검사를 위한 스키마
 * @see src/types/dto.d.ts -> NavigationMethod
 */
export const navigationMethodSchema = z.union([z.literal('infiniteScroll'), z.literal('pagination')]);

/**
 * From server
 * @description 서버로부터 받은 대시보드 데이터의 유효성을 검사하는 스키마
 * @see src/types/dto.d.ts -> DashboardApplicationServiceResponseDto
 */
export const dashboardSchema = z.object({
  id: z.number(),
  title: z.string(),
  color: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  createdByMe: z.boolean(),
  userId: z.number(),
});

/**
 * To server
 * @description 대시보드 목록 조회 요청 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 * @see src/types/dto.d.ts -> FindDashboardsRequestDto
 */
export const dashboardListParamsSchema = z.object({
  navigationMethod: navigationMethodSchema,
  cursorId: z.number().int().positive().optional(),
  page: z.number().int().positive().optional(),
  size: z.number().int().positive().optional(),
});

/**
 * From Server
 * @description 대시보드 목록 응답 데이터의 유효성을 검사하는 스키마
 */
export const dashboardListResponseSchema = z.object({
  dashboards: z.array(dashboardSchema),
  cursorId: z.number().nullable(),
});

//! 유효성 에러 메시지 처리는 react-hook-form에서 처리할수도 있고 추후 다시 정리
/**
 * To server
 * @description 대시보드 생성 폼 유효성 검사를 위한 스키마
 * @see src/types/dto.d.ts -> CreateDashboardRequestDto
 */
export const createDashboardSchema = z.object({
  title: z
    .string()
    .min(1, { message: UI_ERRORS.VALIDATION.REQUIRED('대시보드 이름') })
    .max(20, { message: UI_ERRORS.VALIDATION.STRING_MAX(20) }),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});

/**
 * @description 대시보드 수정 폼 유효성 검사를 위한 스키마
 * - createDashboardSchema의 모든 필드를 선택적으로(optional) 만듭니다.
 * @see src/types/dto.d.ts -> UpdateDashboardRequestDto
 */
export const updateDashboardSchema = createDashboardSchema.partial();

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
  imageUrl: z.any().optional(),
});

export type NavigationMethod = z.infer<typeof navigationMethodSchema>;
export type CreateDashboardInput = z.infer<typeof createDashboardSchema>;
export type UpdateDashboardInput = z.infer<typeof updateDashboardSchema>;
export type DashboardListParams = z.infer<typeof dashboardListParamsSchema>;
export type DashboardListData = z.infer<typeof dashboardListResponseSchema>;
export type Dashboard = z.infer<typeof dashboardSchema>;
export type CreateTodoType = z.infer<typeof createTodoSchema>;
