/* eslint-disable @typescript-eslint/naming-convention */
import type { AxiosError } from 'axios';
import axios, { HttpStatusCode } from 'axios';

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
 * @description
 * 모든 API 에러를 React Router가 처리할 수 있는 표준 Response 객체로 변환하여 throw합니다.
 * 이 인터셉터의 주된 역할은 다양한 형태의 AxiosError를 일관된 형식으로 만들어,
 * 에러 처리 로직을 parseRouteError 유틸리티에서 중앙 관리할 수 있도록 하는 것입니다.
 *
 * @param {AxiosError} error - 인터셉터가 가로챈 axios 에러 객체.
 * @returns {Promise<any>} - 성공적인 응답은 그대로 반환됩니다.
 * @throws {Response} - 에러가 발생하면, 항상 Response 객체를 throw하여 React Router의 errorElement로 처리를 위임합니다.
 *
 * @section 에러 분기 처리
 * 1. error.response: 서버가 응답했으나 에러 상태 코드(4xx, 5xx)를 반환한 경우.
 * - 서버가 보낸 원본 데이터(error.response.data)를 그대로 담아 Response 객체를 생성합니다.
 * - parseRouteError 유틸리티가 이 data를 파싱하여 개발자용 상세 로그를 추출합니다.
 *
 * 2. error.request: 요청은 성공했으나 응답을 받지 못한 경우 (네트워크 오류, 서버 다운 등).
 * - `503 Service Unavailable` 상태를 가진 Response 객체를 생성합니다.
 *
 * 3. else: 그 외 요청 설정 단계 등에서 발생한 클라이언트 측 에러.
 * - `500 Internal Server Error` 상태를 가진 Response 객체를 생성합니다.
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data, statusText } = error.response;

      console.error(`🩺 API Error ${status}:`, data);

      throw new Response(JSON.stringify(data), { status, statusText });
    }

    if (error.request) {
      console.error('🩺 Network Error:', error.request);
      throw new Response(JSON.stringify({ message: '네트워크 연결을 확인해주세요.' }), {
        status: HttpStatusCode.ServiceUnavailable,
      });
    }

    console.error('🩺 Axios Config Error:', error.message);
    throw new Response(JSON.stringify({ message: error.message }), {
      status: HttpStatusCode.InternalServerError,
    });
  },
);

export default axiosInstance;
