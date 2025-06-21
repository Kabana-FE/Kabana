import type { Dashboard } from '@/schemas/dashboard';

/**
 * @description authGuardLoader가 반환하는 데이터의 타입입니다.
 * @property {import('@/schemas/dashboard').Dashboard[]} dashboards - 로드된 대시보드 배열입니다.
 * @property {number} totalCount - 전체 대시보드 개수입니다.
 * @property {number | null} cursorId - 다음 페이지를 로드하기 위한 커서 ID입니다.
 * @property {number} pageSize - 페이지당 대시보드 개수입니다.
 */
export interface authGuardLoaderData {
  dashboards: Dashboard[];

  cursorId?: number | null;
  pageSize?: number;

  totalCount: number;
}
