import {
  createDashboardSchema,
  dashboardListSchema,
  dashboardSchema,
  navigationMethodSchema,
  updateDashboardSchema,
} from './dashboard';
import { errorResponseSchema } from './errorResponse';
import { memberListSchema, memberSchema } from './member';

/**
 * Zod 스키마 레지스트리
 * - 애플리케이션 전체에서 사용되는 Zod 스키마들을 중앙에서 관리합니다.
 * - 키(key)를 통해 원하는 스키마를 쉽게 조회하고 사용할 수 있습니다.
 */
export const zodRegistry = {
  // Error
  errorResponse: errorResponseSchema,

  // Dashboard
  navigationMethod: navigationMethodSchema,
  dashboardList: dashboardListSchema,
  dashboard: dashboardSchema,
  createDashboard: createDashboardSchema,
  updateDashboard: updateDashboardSchema,

  // Member
  member: memberSchema,
  memberList: memberListSchema,
};

/**
 * zodRegistry의 모든 키(key)들을 유니온 타입으로 만듭니다.
 * -> "errorResponse" | "navigationMethod" | "dashboard" | ...
 */
export type ZodSchemaKey = keyof typeof zodRegistry;

export type ZodSchemaMap = typeof zodRegistry;
