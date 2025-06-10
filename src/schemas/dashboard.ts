import { z } from 'zod';

import UI_ERRORS from '@/constants/errors/uiErrors';

/**
 * @description 페이지네이션 방식 유효성 검사를 위한 스키마
 * @see src/types/dto.d.ts -> NavigationMethod
 */
export const navigationMethodSchema = z.union([z.literal('infiniteScroll'), z.literal('pagination')]);

/**
 * To server
 * @description 대시보드 목록 조회 요청 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 * @see src/types/dto.d.ts -> FindDashboardsRequestDto
 */
export const dashboardListSchema = z.object({
  navigationMethod: navigationMethodSchema,
  cursorId: z.number().int().positive().optional(),
  page: z.number().int().positive().optional(),
  size: z.number().int().positive().optional(),
});

/**
 * From server
 * @description 서버로부터 받은 대시보드 데이터의 유효성을 검사하는 스키마
 * @see src/types/dto.d.ts -> DashboardApplicationServiceResponseDto
 */
export const dashboardSchema = z.object({
  id: z.number(),
  title: z.string(),
  color: z.string(),
  // ISO 8601 형식의 날짜 문자열인지 검사할 수 있습니다.
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  createdByMe: z.boolean(),
  userId: z.number(),
});

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

export type NavigationMethod = z.infer<typeof navigationMethodSchema>;
export type CreateDashboardInput = z.infer<typeof createDashboardSchema>;
export type UpdateDashboardInput = z.infer<typeof updateDashboardSchema>;
export type DashboardListParams = z.infer<typeof dashboardListSchema>;
export type Dashboard = z.infer<typeof dashboardSchema>;
