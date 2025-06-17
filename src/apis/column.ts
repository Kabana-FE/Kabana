import { requestDelete, requestGet, requestPost, requestPut } from '@/apis/base/request';
import { COLUMN_ENDPOINTS } from '@/constants/paths';
import type { Column, ColumnListData, ColumnListParams, CreateColumnInput, UpdateColumnInput } from '@/schemas/column';
import { columnListResponseSchema, columnSchema } from '@/schemas/column';
/**
 * @description 새 컬럼을 생성합니다.
 * @param dashboardInput 생성할 컬럼 데이터 (title)
 * @returns 생성된 컬럼 정보 (서버 응답을 columnSchema로 검증합니다.)
 */
export const createColumn = async (columnInput: CreateColumnInput) => {
  const response = await requestPost<Column, CreateColumnInput>(COLUMN_ENDPOINTS.CREATE, columnInput);
  return columnSchema.parse(response);
};
/**
 * @description 컬럼 목록을 조회합니다.
 * @param params 쿼리 파라미터 (dashboardId)
 * @returns 컬럼 목록 (서버 응답을 dashboardListResponseSchema로 검증합니다.)
 */
export const getColumnList = async (params: ColumnListParams) => {
  const response = await requestGet<ColumnListData>(COLUMN_ENDPOINTS.LIST, { params });
  return columnListResponseSchema.parse(response);
};
/**
 * @description 특정 컬럼 정보를 수정합니다.
 * @param columnId 수정할 컬럼 ID
 * @param columnInput 수정할 컬럼 데이터
 * @returns 수정된 컬럼 정보 (서버 응답을 dashboardSchema로 검증합니다.)
 */
export const updateColumn = async (columnId: number, columnInput: UpdateColumnInput) => {
  const response = await requestPut<Column, UpdateColumnInput>(COLUMN_ENDPOINTS.UPDATE(String(columnId)), columnInput);
  return columnSchema.parse(response);
};
/**
 * @description 특정 컬럼을 삭제합니다.
 * @param columnId 삭제할 컬럼 ID
 * @returns
 */
export const deleteColumn = async (columnId: number) => {
  const response = await requestDelete<void>(COLUMN_ENDPOINTS.DELETE(String(columnId)));
  return response;
};
