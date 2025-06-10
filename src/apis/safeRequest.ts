import THROWN_ERRORS from '@/constants/errors/thrownErrors';
import STATUS_CODES from '@/constants/statusCodes';

/**
 * @description 비동기 API 요청을 안전하게 처리하는 함수입니다.
 * - API 요청 중 발생한 에러를 캐치하여 500 서버 에러로 통일합니다.
 * - 요청이 성공하면 응답 데이터를 반환합니다.
 *
 * @template T 서버 응답 데이터 타입 (단순 추론용, 실제 검증은 호출부에서 수행)
 * @param apiCall 실행할 비동기 API 호출 함수
 * @param label 로깅 및 디버깅용 라벨
 * @returns 요청에 성공한 경우 반환되는 데이터
 * @throws 요청 실패 시 500 상태 코드를 가진 Response를 던집니다.
 */
const safeRequest = async <T>(apiCall: () => Promise<T>, label: string = ''): Promise<T> => {
  try {
    const data = await apiCall();
    console.log(`✅ ${label} data:`, data); // 나중에 지우지말고 주석처리 해주세요
    return data;
  } catch (err: unknown) {
    const error = err as { response?: { data?: any }; message?: string };
    console.error(`❌ ${label} 요청 에러:`, error.response?.data ?? error.message ?? err);
    throw new Response(THROWN_ERRORS.FETCH_FAILED, {
      status: STATUS_CODES.SERVER_ERROR,
    });
  }
};

export default safeRequest;
