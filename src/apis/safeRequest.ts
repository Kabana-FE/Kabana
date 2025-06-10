import THROWN_ERRORS from '@/constants/errors/thrownErrors';
import STATUS_CODES from '@/constants/statusCodes';

/**
 * API 호출을 안전하게 수행하고, 실패 시 500 에러를 발생시킵니다.
 *
 * - API 요청 중 발생한 에러를 캐치하여 500 서버 에러로 통일합니다.
 * - 요청이 성공하면 응답 데이터를 반환합니다.
 * @throws {Response} 요청 실패 시, status 500을 가진 Response 객체를 던져 React Router에서 서버 에러로 처리되도록 합니다.
 *
 * @template T
 * @param apiCall - 실행할 비동기 API 호출 함수
 * @param label - 로깅 및 디버깅용 라벨
 * @returns 요청에 성공한 경우 반환되는 데이터
 * @throws 요청 실패 시 500 상태 코드를 가진 Response를 던집니다.
 */
async function safeRequest<T>(apiCall: () => Promise<T>, label = ''): Promise<T> {
  try {
    const data = await apiCall();
    console.log(`✅ ${label} data:`, data);
    return data;
  } catch (err: unknown) {
    const error = err as { response?: { data?: any }; message?: string };
    console.error(`❌ ${label} 요청 에러:`, error.response?.data ?? error.message ?? err);
    throw new Response(THROWN_ERRORS.FETCH_FAILED, {
      status: STATUS_CODES.SERVER_ERROR,
    });
  }
}

export default safeRequest;
