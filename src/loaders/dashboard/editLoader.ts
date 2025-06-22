import { HttpStatusCode } from 'axios';
import type { LoaderFunctionArgs } from 'react-router';

import { getDashboardDetail, getInviteeList } from '@/apis/dashboard';
import { getMemberList } from '@/apis/member';
import type { DashboardEditLoaderData } from '@/loaders/dashboard/types';
import { dashboardSchema, inviteeListSchema } from '@/schemas/dashboard';
import { memberListResponseSchema } from '@/schemas/member';
import handleLoaderError from '@/utils/error/handleLoaderError';

export const loader = async ({ params }: LoaderFunctionArgs): Promise<DashboardEditLoaderData> => {
  const dashboardIdString: string | undefined = params.dashboardId;

  if (!dashboardIdString) {
    throw new Response(JSON.stringify({ message: 'URL 파라미터에 dashboardId가 누락되었습니다.' }), {
      status: HttpStatusCode.BadRequest,
    });
  }

  const dashboardId: number = Number(dashboardIdString);
  if (isNaN(dashboardId)) {
    console.error(`🩺 Invalid Dashboard ID: "${dashboardIdString}" is not a number.`);
    throw new Response(
      JSON.stringify({
        message: `URL 파라미터 dashboardId가 유효한 숫자가 아닙니다: "${dashboardIdString}"`,
      }),
      {
        status: HttpStatusCode.BadRequest,
      },
    );
  }
  try {
    const results = await Promise.allSettled([
      getMemberList({ dashboardId, size: 4 }),
      getInviteeList({ dashboardId, size: 5 }),
      getDashboardDetail(dashboardId),
    ]);

    const rejectedPromises = results.filter((result) => result.status === 'rejected');

    if (rejectedPromises.length > 0) {
      rejectedPromises.forEach((promise, index) => {
        const apiName = index === 0 ? 'getMemberList' : index === 1 ? 'getInviteeList' : 'getDashboardDetail';
        console.error(`🩺 ${apiName} API 호출 실패:`, (promise as PromiseRejectedResult).reason);
      });
      // 첫 번째 에러를 ErrorBoundary로 던져서 UI를 중단시킵니다.
      throw rejectedPromises[0].reason;
    }
    const rawMemberList = (results[0] as PromiseFulfilledResult<unknown>).value;
    const rawInviteeList = (results[1] as PromiseFulfilledResult<unknown>).value;
    const rawDashboardDetail = (results[2] as PromiseFulfilledResult<unknown>).value;

    const memberList = memberListResponseSchema.parse(rawMemberList);
    const inviteeList = inviteeListSchema.parse(rawInviteeList);
    const dashboardDetail = dashboardSchema.parse(rawDashboardDetail);

    return { memberList, inviteeList, dashboardDetail };
  } catch (error) {
    return handleLoaderError(error);
  }
};
