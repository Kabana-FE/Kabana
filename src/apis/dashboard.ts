import { requestDelete, requestGet, requestPost, requestPut } from '@/apis/base/request';
import { DASHBOARD_ENDPOINTS } from '@/constants/paths';
import type {
  CancelInviteeParams,
  CreateDashboardInput,
  Dashboard,
  DashboardListData,
  DashboardListParams,
  InviteeList,
  InviteeListParams,
  UpdateDashboardInput,
} from '@/schemas/dashboard';

/**
 * @description 새 대시보드를 생성합니다.
 * @param dashboardInput 생성할 대시보드 데이터 (title, color)
 */
export const createDashboard = async (dashboardInput: CreateDashboardInput) => {
  return requestPost<Dashboard, CreateDashboardInput>(DASHBOARD_ENDPOINTS.CREATE, dashboardInput);
};

/**
 * @description 대시보드 목록을 페이지네이션으로 조회합니다.
 * @param params 쿼리 파라미터 (navigationMethod, cursorId, page, size)
 */
export const getDashboardList = async (params: DashboardListParams) => {
  return requestGet<DashboardListData>(DASHBOARD_ENDPOINTS.LIST, { params });
};

/**
 * @description 특정 대시보드의 상세 정보를 조회합니다.
 * @param dashboardId 조회할 대시보드 ID
 */
export const getDashboardDetail = async (dashboardId: number) => {
  return requestGet<Dashboard>(DASHBOARD_ENDPOINTS.DETAIL(String(dashboardId)));
};

/**
 * @description 특정 대시보드 정보를 수정합니다.
 * @param dashboardId 수정할 대시보드 ID
 * @param dashboardInput 수정할 대시보드 데이터
 */
export const updateDashboard = async (dashboardId: number, dashboardInput: UpdateDashboardInput) => {
  return requestPut<Dashboard, UpdateDashboardInput>(DASHBOARD_ENDPOINTS.UPDATE(String(dashboardId)), dashboardInput);
};

/**
 * @description 특정 대시보드를 삭제합니다.
 * @param dashboardId 삭제할 대시보드 ID
 */
export const deleteDashboard = async (dashboardId: number) => {
  return requestDelete(DASHBOARD_ENDPOINTS.DELETE(String(dashboardId)));
};

/**
 * @description 특정 대시보드 초대 목록을 조회합니다.
 * @param params 쿼리 파라미터 (dashboardId, page, size)
 */
export const getInviteeList = async (params: InviteeListParams) => {
  const { dashboardId, ...queryParams } = params;
  return requestGet<InviteeList>(DASHBOARD_ENDPOINTS.GET_INVITATIONS(String(dashboardId)), { params: queryParams });
};

export const cancelInvitee = async (params: CancelInviteeParams) => {
  return requestDelete(DASHBOARD_ENDPOINTS.CANCEL_INVITATION(String(params.dashboardId), String(params.invitationId)));
};
