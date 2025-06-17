import { requestGet } from '@/apis/base/request';
import type { ColumnsSchema } from '@/schemas/column';

export const getColumns = async (dashboardId: number) => {
  // return requestGet<Dashboard>(`${DASHBOARD_ENDPOINTS.DETAIL}/${dashboardId}`);
  return requestGet<ColumnsSchema>(`columns?dashboardId=${dashboardId}`);
};
