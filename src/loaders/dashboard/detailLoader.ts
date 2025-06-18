import { HttpStatusCode } from 'axios';
import type { LoaderFunctionArgs } from 'react-router-dom';

import { getCardList } from '@/apis/card';
import { getColumns } from '@/apis/column';
import { getMemberList } from '@/apis/member';
import { columnsSchema, type ColumnsType } from '@/schemas/column';
import { memberListResponseSchema } from '@/schemas/member';
import handleLoaderError from '@/utils/error/handleLoaderError';

import type { DashboardDetailLoaderData } from './types';
/**
 * @description
 * 대시보드 상세 페이지에 필요한 모든 데이터를 병렬로 요청합니다.
 *
 * ✅ 포함되는 데이터
 * - 대시보드 상세 정보 (본문)
 * - 대시보드 멤버 목록 (헤더)
 *
 * ✅ 데이터 요청 방식
 * `Promise.allSettled`을 사용해 요청을 병렬로 수행하며,
 * 실패한 요청이 하나라도 있다면 첫 번째 에러를 throw합니다.
 * 성공 시, 두 API의 응답을 조합한 데이터를 반환합니다.
 *
 * ✅ 스키마 유효성 검사
 * - API 응답을 Zod 스키마 (`dashboardSchema`, `memberListSchema`)로 검증하여
 *   서버 응답 구조가 예상과 다를 경우 에러를 발생시킵니다.
 *
 * @param {LoaderFunctionArgs} params React Router에서 전달된 라우트 파라미터 객체
 * @returns {Promise<DashboardDetailLoaderData>} 대시보드 상세 페이지 렌더링에 필요한 데이터 객체
 *
 * @throws {Response}
 * - `dashboardId`가 존재하지 않거나 숫자가 아니면 400 Bad Request를 throw
 * - API 응답이 Zod 스키마와 맞지 않으면 ZodError를 throw
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
    const results = await Promise.allSettled([getColumns(dashboardId), getMemberList({ dashboardId, size: 4 })]);

    const rejectedPromises = results.filter((result) => result.status === 'rejected');

    if (rejectedPromises.length > 0) {
      rejectedPromises.forEach((promise, index) => {
        const apiName = index === 0 ? 'getDashboardDetail' : 'getMemberList';
        console.error(`🩺 ${apiName} API 호출 실패:`, (promise as PromiseRejectedResult).reason);
      });
      // 첫 번째 에러를 ErrorBoundary로 던져서 UI를 중단시킵니다.
      throw rejectedPromises[0].reason;
    }

    // 모든 Promise가 성공했을 때만 데이터를 추출합니다.
    // 주의: 타입 단언이 필요할 수 있습니다.
    const columnsRaw = (results[0] as PromiseFulfilledResult<ColumnsType>).value;
    const memberListRaw = (results[1] as PromiseFulfilledResult<unknown>).value;

    const columnList = columnsRaw.data;
    // console.log('columnsRaw', columnsRaw);
    const cardsRaw = await Promise.allSettled(columnList.map((column) => getCardList(column.id)));

    const cardList = [];
    for (const result of cardsRaw) {
      if (result.status === 'fulfilled') {
        cardList.push(result.value);
      }
    }
    // const flatedCardRawList = cardRawList.flatMap((result) => result.cards);
    // zod 검사
    const columns = columnsSchema.parse(columnsRaw);
    const memberListResponse = memberListResponseSchema.parse(memberListRaw);
    // const cardList = cardListValidateSchema.parse(flatedCardRawList);
    return { columns, memberListResponse, cardList };
  } catch (error: unknown) {
    return handleLoaderError(error);
  }
};
