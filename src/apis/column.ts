import { requestDelete, requestGet, requestPost, requestPut } from '@/apis/base/request';
import { COLUMN_ENDPOINTS } from '@/constants/paths';
import type { Column, ColumnListData, ColumnListParams, CreateColumnInput, UpdateColumnInput } from '@/schemas/column';
/**
 * @description 새 컬럼을 생성합니다.
 * @param dashboardInput 생성할 컬럼 데이터 (title)
 * @returns 생성된 컬럼 정보 (서버 응답을 columnSchema로 검증합니다.)
 */
export const createColumn = async (columnInput: CreateColumnInput) => {
  return requestPost<Column, CreateColumnInput>(COLUMN_ENDPOINTS.CREATE, columnInput);
};
/**
 * @description 컬럼 목록을 조회합니다.
 * @param params 쿼리 파라미터 (dashboardId)
 * @returns 컬럼 목록 (서버 응답을 dashboardListResponseSchema로 검증합니다.)
 */
export const getColumnList = async (params: ColumnListParams) => {
  return requestGet<ColumnListData>(COLUMN_ENDPOINTS.LIST, { params });
};
/**
 * @description 특정 컬럼 정보를 수정합니다.
 * @param columnId 수정할 컬럼 ID
 * @param columnInput 수정할 컬럼 데이터
 * @returns 수정된 컬럼 정보 (서버 응답을 dashboardSchema로 검증합니다.)
 */
export const updateColumn = async (columnId: number, columnInput: UpdateColumnInput) => {
  return requestPut<Column, UpdateColumnInput>(COLUMN_ENDPOINTS.UPDATE(String(columnId)), columnInput);
};
/**
 * @description 특정 컬럼을 삭제합니다.
 * @param columnId 삭제할 컬럼 ID
 * @returns
 */
export const deleteColumn = async (columnId: number) => {
  return requestDelete<void>(COLUMN_ENDPOINTS.DELETE(String(columnId)));
};
import type { ColumnsType } from '@/schemas/column';

export const getColumns = async (dashboardId: number) => {
  // return requestGet<Dashboard>(`${DASHBOARD_ENDPOINTS.DETAIL}/${dashboardId}`);
  return requestGet<ColumnsType>(`columns?dashboardId=${dashboardId}`);
};
