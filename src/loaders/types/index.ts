import type { Dashboard } from '@/schemas/dashboard'; // 대시보드 스키마에서 필요한 타입을 가져옵니다.

/**
 * @description rootLoader가 반환하는 데이터의 타입입니다.
 */
export interface RootLoaderData {
  dashboards: Dashboard[];
}
