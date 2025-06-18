import { requestGet } from '@/apis/base/request';
import type { ColumnDetailsType, ColumnsType } from '@/schemas/column';

export const getColumns = async (dashboardId: number) => {
  // return requestGet<Dashboard>(`${DASHBOARD_ENDPOINTS.DETAIL}/${dashboardId}`);
  return requestGet<ColumnsType>(`columns?dashboardId=${dashboardId}`);
};

export const getColumnDetails = async (columnId: number) => {
  return requestGet<ColumnDetailsType>('');
};
