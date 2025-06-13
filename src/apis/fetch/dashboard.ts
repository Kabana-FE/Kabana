import { requestDelete, requestGet, requestPost, requestPut } from '@/apis/request';
import { DASHBOARD_ENDPOINTS } from '@/constants/paths';
import type {
  CreateDashboardInput,
  Dashboard,
  DashboardListData,
  DashboardListParams,
  UpdateDashboardInput,
} from '@/schemas/dashboard';
import { dashboardListResponseSchema, dashboardSchema } from '@/schemas/dashboard';

/**
 * @description 새 대시보드를 생성합니다.
 * @param dashboardInput 생성할 대시보드 데이터 (title, color)
 * @returns 생성된 대시보드 정보 (서버 응답을 dashboardSchema로 검증합니다.)
 */
export const createDashboard = async (dashboardInput: CreateDashboardInput) => {
  const response = await requestPost<Dashboard, CreateDashboardInput>(DASHBOARD_ENDPOINTS.CREATE, dashboardInput);
  return dashboardSchema.parse(response);
};

/**
 * @description 대시보드 목록을 페이지네이션으로 조회합니다.
 * @param params 쿼리 파라미터 (navigationMethod, cursorId, page, size)3
 * @returns 대시보드 목록과 커서 ID (서버 응답을 dashboardListResponseSchema로 검증합니다.)
 */
export const getDashboardList = async (params: DashboardListParams) => {
  const response = await requestGet<DashboardListData>(DASHBOARD_ENDPOINTS.LIST, { params });
  return dashboardListResponseSchema.parse(response);
};

/**
 * @description 특정 대시보드의 상세 정보를 조회합니다.
 * @param dashboardId 조회할 대시보드 ID
 * @returns 대시보드 상세 정보 (서버 응답을 dashboardSchema로 검증합니다.)
 */
export const getDashboardDetail = async (dashboardId: number) => {
  const response = await requestGet<Dashboard>(DASHBOARD_ENDPOINTS.DETAIL(String(dashboardId)));
  return dashboardSchema.parse(response);
};

/**
 * @description 특정 대시보드 정보를 수정합니다.
 * @param dashboardId 수정할 대시보드 ID
 * @param dashboardInput 수정할 대시보드 데이터
 * @returns 수정된 대시보드 정보 (서버 응답을 dashboardSchema로 검증합니다.)
 */
export const updateDashboard = async (dashboardId: number, dashboardInput: UpdateDashboardInput) => {
  const response = await requestPut<Dashboard, UpdateDashboardInput>(
    DASHBOARD_ENDPOINTS.UPDATE(String(dashboardId)),
    dashboardInput,
  );
  return dashboardSchema.parse(response);
};

/**
 * @description 특정 대시보드를 삭제합니다.
 * @param dashboardId 삭제할 대시보드 ID
 */
export const deleteDashboard = async (dashboardId: number) => {
  const response = await requestDelete<void>(DASHBOARD_ENDPOINTS.DELETE(String(dashboardId)));
  return response;
};
