import type { LoaderFunctionArgs } from 'react-router-dom';

import { getDashboardDetail } from '@/apis/fetch/dashboard';
import { getMemberList } from '@/apis/fetch/member';
import DEV_ERRORS from '@/constants/errors/devErrors';
import STATUS_CODES from '@/constants/statusCodes';
import type { Dashboard } from '@/schemas/dashboard';
import type { MemberListData } from '@/schemas/member';

import type { DashboardDetailLoaderData } from './types';

/**
 * 대시보드 상세 페이지에 필요한 모든 데이터를 미리 불러옵니다.
 * - 대시보드 상세 정보
 * - 대시보드 멤버 목록 (헤더용)
 * - 대시보드 컬럼 (본문용)
 */
export const loader = async ({ params }: LoaderFunctionArgs): Promise<DashboardDetailLoaderData> => {
  const dashboardIdString: string | undefined = params.dashboardId;

  if (!dashboardIdString) {
    throw new Response(DEV_ERRORS.VALIDATION.PARAM_MISSING_IN_URL('dashboardId'), { status: STATUS_CODES.BAD_REQUEST });
  }

  const dashboardId: number = Number(dashboardIdString);
  if (isNaN(dashboardId)) {
    console.error(`🩺Invalid Dashboard ID: "${dashboardIdString}" is not a number.`);
    throw new Response(DEV_ERRORS.VALIDATION.PARAM_INVALID_FORMAT('dashboardId', 'dashboardId'), {
      status: STATUS_CODES.BAD_REQUEST,
    });
  }

  try {
    const [dashboardDetail, memberListResponse]: [Dashboard, MemberListData] = await Promise.all([
      getDashboardDetail(dashboardId),
      getMemberList({ dashboardId, size: 4 }),
    ]);

    return { dashboardDetail, memberListResponse };
  } catch (error: unknown) {
    console.error('🩺Failed to load dashboard detail or member list:', error);

    if (error instanceof Response) {
      throw error;
    } else {
      throw new Response(DEV_ERRORS.API.FETCH_FAILED, { status: STATUS_CODES.SERVER_ERROR });
    }
  }
};
