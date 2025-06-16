import { getDashboardList } from '@/apis/dashboard';
import { getInvitationList } from '@/apis/invitation';
import { dashboardListResponseSchema } from '@/schemas/dashboard';
import { invitationListSchema } from '@/schemas/invitation';
import handleLoaderError from '@/utils/error/handleLoaderError';

export const loader = async () => {
  try {
    const results = await Promise.allSettled([
      getDashboardList({ navigationMethod: 'pagination', size: 5 }),
      getInvitationList({}),
    ]);

    const rejectedPromises = results.filter((result) => result.status === 'rejected');

    if (rejectedPromises.length > 0) {
      rejectedPromises.forEach((promise, index) => {
        const apiName = index === 0 ? 'getDashboardList' : 'getInvitationList';
        console.error(`🩺 ${apiName} API 호출 실패:`, (promise as PromiseRejectedResult).reason);
      });
      // 첫 번째 에러를 ErrorBoundary로 던져서 UI를 중단시킵니다.
      throw rejectedPromises[0].reason;
    }

    const rawDashboardList = (results[0] as PromiseFulfilledResult<unknown>).value;
    const rawInvitationList = (results[1] as PromiseFulfilledResult<unknown>).value;

    const dashboardList = dashboardListResponseSchema.parse(rawDashboardList);
    const invitationList = invitationListSchema.parse(rawInvitationList);

    return { dashboardList, invitationList };
  } catch (error) {
    return handleLoaderError(error);
  }
};
