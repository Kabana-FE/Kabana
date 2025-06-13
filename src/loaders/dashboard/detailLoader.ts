import { HttpStatusCode } from 'axios';
import type { LoaderFunctionArgs } from 'react-router-dom';

import { getDashboardDetail } from '@/apis/dashboard';
import { getMemberList } from '@/apis/member';
import DEV_ERRORS from '@/constants/errors/devErrors';
import type { Dashboard } from '@/schemas/dashboard';
import type { MemberListData } from '@/schemas/member';
import { handleLoaderError } from '@/utils/handleLoaderError';

import type { DashboardDetailLoaderData } from './types';

/**
 * @description
 * 대시보드 상세 페이지에 필요한 모든 데이터를 병렬로 요청합니다.
 * - 대시보드 상세 정보 (본문)
 * - 대시보드 멤버 목록 (헤더)
 *
 * `Promise.allSettled`을 사용해 요청을 병렬로 수행하며,
 * 실패한 요청이 하나라도 있다면 첫 번째 에러를 throw합니다.
 * 성공 시, 두 API의 응답을 조합한 데이터를 반환합니다.
 *
 * @param {LoaderFunctionArgs} params React Router에서 전달된 라우트 파라미터 객체
 * @returns {Promise<DashboardDetailLoaderData>} 대시보드 상세 페이지 렌더링에 필요한 데이터 객체
 *
 * @throws {Response}
 * - `dashboardId`가 존재하지 않으면 400 Bad Request
 * - `dashboardId`가 숫자가 아니면 400 Bad Request
 * - API 요청 중 하나라도 실패하면 해당 에러를 그대로 전파 (React Router의 errorElement로 전달됨)
 *
 * @example
 * ```tsx
 * const { dashboardDetail, memberListResponse } = useLoaderData() as DashboardDetailLoaderData;
 * ```
 */
export const loader = async ({ params }: LoaderFunctionArgs): Promise<DashboardDetailLoaderData> => {
  const dashboardIdString: string | undefined = params.dashboardId;

  if (!dashboardIdString) {
    throw new Response(DEV_ERRORS.VALIDATION.PARAM_MISSING_IN_URL('dashboardId'), {
      status: HttpStatusCode.BadRequest,
    });
  }

  const dashboardId: number = Number(dashboardIdString);
  if (isNaN(dashboardId)) {
    console.error(`🩺Invalid Dashboard ID: "${dashboardIdString}" is not a number.`);
    throw new Response(DEV_ERRORS.VALIDATION.PARAM_INVALID_FORMAT('dashboardId', 'dashboardId'), {
      status: HttpStatusCode.BadRequest,
    });
  }

  try {
    const results = await Promise.allSettled([
      getDashboardDetail(dashboardId),
      getMemberList({ dashboardId, size: 4 }),
    ]);

    const rejectedPromises = results.filter((result) => result.status === 'rejected');

    if (rejectedPromises.length > 0) {
      rejectedPromises.forEach((promise, index) => {
        const apiName = index === 0 ? 'getDashboardDetail' : 'getMemberList';
        console.error(`🩺${apiName} failed with reason:`, (promise as PromiseRejectedResult).reason);
      });
      // 첫 번째 에러를 ErrorBoundary로 던져서 UI를 중단시킵니다.
      throw rejectedPromises[0].reason;
    }

    // 모든 Promise가 성공했을 때만 데이터를 추출합니다.
    // 주의: 타입 단언이 필요할 수 있습니다.
    const dashboardDetail = (results[0] as PromiseFulfilledResult<Dashboard>).value;
    const memberListResponse = (results[1] as PromiseFulfilledResult<MemberListData>).value;

    return { dashboardDetail, memberListResponse };
  } catch (error: unknown) {
    handleLoaderError(error);
  }
};
