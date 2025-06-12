import type { Dashboard } from '@/schemas/dashboard';

/**
 * @description rootLoader가 반환하는 데이터의 타입입니다.
 */
export interface RootLoaderData {
  dashboards: Dashboard[];
}
