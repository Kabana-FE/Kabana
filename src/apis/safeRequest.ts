import axios from 'axios';

import DEV_ERRORS from '@/constants/errors/devErrors';
import STATUS_CODES from '@/constants/statusCodes';

// 에러 처리 흐름은 아직 정리가 안됐습니다. 에러 바운더리 만들고 나서 다시 정리할 예정입니다.
// 지금은 safeRequest가 대략 이런 역할을 한다는 것만 확인하시면 좋을것 같아요.

/**
 * @description 비동기 API 요청을 안전하게 처리하는 함수입니다.
 * - 요청이 성공하면 응답 데이터를 반환합니다.
 * - 예상된 클라이언트 에러 (4xx): 서버가 의도적으로 보낸 에러입니다.(예: 로그인 실패, 중복된 이메일 등)
 * 이 경우, 서버의 응답을 그대로 다시 던져서 각 action에서 개별적으로 처리하도록 합니다.
 * - 예상치 못한 시스템 에러 (5xx, 네트워크 오류 등): 서버 다운, 네트워크 끊김 등 복구 불가능한 에러입니다.
 * 이 경우, 앱 전체가 멈추지 않도록 통일된 500 에러를 던져서 전역 errorElement가 처리하도록 합니다.
 *
 * @template T 서버 응답 데이터 타입 (단순 추론용, 실제 검증은 호출부에서 수행)
 * @param apiCall 실행할 비동기 API 호출 함수
 * @param label 로깅 및 디버깅용 라벨
 * @returns 요청에 성공한 경우 반환되는 데이터
 * @throws 요청 실패 시 상태 코드를 가진 Response를 던집니다.
 */
const safeRequest = async <T>(apiCall: () => Promise<T>, label: string = ''): Promise<T> => {
  try {
    const data = await apiCall();
    console.log(`✅ ${label} data:`, data); // 나중에 지우지말고 주석처리 해주세요
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      const { status, data } = err.response;

      if (status >= 400 && status < 500) {
        console.warn(`CLIENT_ERROR: ${label}`, data);
        // Response 객체로 감싸서 throw하면 react-router의 action/loader에서 잡을 수 있습니다.
        throw new Response(JSON.stringify(data), { status });
      }
    }

    console.error(`❌ SERVER_ERROR: ${label} 요청 에러:`, err);
    throw new Response(JSON.stringify({ message: DEV_ERRORS.API.FETCH_FAILED }), {
      status: STATUS_CODES.SERVER_ERROR,
    });
  }
};

export default safeRequest;
