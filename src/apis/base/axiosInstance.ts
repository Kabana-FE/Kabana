/* eslint-disable @typescript-eslint/naming-convention */
import type { AxiosError } from 'axios';
import axios, { HttpStatusCode } from 'axios';

import DEV_ERRORS from '@/constants/errors/devErrors';
import { useAuthStore } from '@/stores/useAuthStore';

/**
 * .env 파일에서 설정한 VITE_BASE_URL을 기준으로 Axios 인스턴스를 생성하여 반환합니다.
 * 이 인스턴스를 통해 공통 설정이 적용된 API 요청을 수행할 수 있습니다.
 *
 * @example
 * ```ts
 * import axiosInstance from '@/apis/axiosInstance';
 *
 * axiosInstance.get('/users')
 *   .then(response => console.log(response.data));
 * ```
 * @see {@link https://axios-http.com/docs/instance Axios 공식 문서 - 인스턴스}
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 요청 인터셉터
 * @description 요청을 보내기 전에 토큰을 헤더에 추가합니다.
 * @param config Axios 요청 설정 객체
 * @returns 수정된 Axios 요청 설정 객체
 * @see {@link https://axios-http.com/docs/interceptors Axios 공식 문서 - 인터셉터}
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    console.error('🩺 Request Interceptor Error:', error);
    return Promise.reject(error);
  },
);

/**
 * 응답 인터셉터
 * @description 모든 응답을 받은 후 에러를 중앙에서 처리합니다.
 * 이 인터셉터는 성공적인 응답과 에러 응답을 모두 처리합니다.
 * 성공적인 응답은 그대로 반환하고, 에러가 발생한 경우에는 에러 메시지를 포함한 Response 객체를 throw합니다.
 * @remarks error.response: 서버가 응답했으나 에러인 경우, 상태코드를 포함해 throw합니다.
 * @remarks error.request: 요청은 성공했으나 응답을 받지 못한 경우 (네트워크 문제, 서버 다운 등)
 * @remarks 클라이언트 측의 잘못된 요청 에러: 요청을 보내기 전, 요청 설정 단계에서 발생한 에러(예를 들어, 요청 URL이 잘못되었거나 필수 파라미터가 누락된 경우)
 * @param error AxiosError
 * @throws 에러 메시지를 포함한 `Response` 객체 (loader에서 catch)
 * @returns 성공 응답 또는 에러 처리 결과
 * @see {@link https://axios-http.com/docs/interceptors Axios 공식 문서 - 인터셉터}
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    let errorMessage = DEV_ERRORS.GENERAL.UNKNOWN;
    let errorStatus = HttpStatusCode.InternalServerError;

    if (error.response) {
      const { status, data } = error.response;
      errorStatus = status;
      const serverMessage = (data as { message?: string })?.message;

      console.error(`🩺API Error ${status}:`, data);

      switch (status) {
        case HttpStatusCode.BadRequest:
          errorMessage = serverMessage || DEV_ERRORS.API.BAD_REQUEST;
          break;

        case HttpStatusCode.Unauthorized:
        case HttpStatusCode.Forbidden:
          errorMessage = serverMessage || DEV_ERRORS.API.UNAUTHORIZED;
          break;

        case HttpStatusCode.NotFound:
          errorMessage = serverMessage || DEV_ERRORS.API.DATA_NOT_FOUND;
          break;

        default:
          errorMessage = serverMessage || DEV_ERRORS.API.SERVER_ERROR;
          break;
      }
    } else if (error.request) {
      errorMessage = DEV_ERRORS.API.FETCH_FAILED;
      errorStatus = HttpStatusCode.ServiceUnavailable;
      console.error('🩺Network Error:', error.request);
    } else {
      errorMessage = DEV_ERRORS.API.REQUEST_SETUP_FAILED;
      errorStatus = HttpStatusCode.BadRequest;
      console.error('🩺Axios Config Error:', error.message);
    }

    // 모든 에러 분기 처리가 끝난 후, 최종적으로 Response 객체를 생성하여 throw
    throw new Response(JSON.stringify({ message: errorMessage }), {
      status: errorStatus,
    });
  },
);

export default axiosInstance;
