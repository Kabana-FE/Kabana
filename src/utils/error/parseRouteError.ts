import { AxiosError, HttpStatusCode } from 'axios';
import { isRouteErrorResponse } from 'react-router-dom';

import UI_ERRORS from '@/constants/errors/uiErrors';

import type { ParsedError } from './types';

/**
 * @description
 * useRouteError()로 받은 unknown 타입의 에러를 파싱하여 에러 처리에 필요한 정보를 담은 객체를 반환합니다.
 * 이 함수는 에러의 종류를 판별하고, 개발자와 사용자에게 각각 다른 메시지를 제공합니다.
 * @param {unknown} error - useRouteError()로부터 받은 에러 객체
 * @returns {ParsedError} - 상태 코드, 사용자 메시지, 개발자용 로그 메시지를 담은 객체
 *
 * @section 에러 분기 처리 기준
 * 1. isRouteErrorResponse(error): loader나 action에서 throw new Response(...)를 통해 발생한 에러입니다.
 * - 주된 경우: axios인터셉터가 API 응답 에러(4xx, 5xx)를 잡아 Response객체로 throw한 경우입니다.
 * - 특징: status와 data프로퍼티를 가지고 있어, 서버 응답에 기반한 상세한 처리가 가능합니다.
 *
 * 2. error instanceof AxiosError: Axios 라이브러리에서 발생한 에러 (네트워크 오류, 요청 취소 등)
 * - 주로 응답을 받지 못한 경우(error.request) 또는 요청 설정 오류(error.message)일 수 있습니다.
 * - 네트워크 오류나 요청 설정 오류는 일반적으로 로더(loader)나 액션(action)까지 요청이 도달하기 전에 발생하기 때문에 isRouteErrorResponse로 처리하기 어려운 경우가 많습니다.
 *
 * 3. error instanceof Error: 일반적인 자바스크립트 런타임 에러입니다.
 * - 주된 경우: <RenderErrorBoundary>로 감싸지 않은 컴포넌트에서 렌더링 중 에러가 발생하면 잡아냅니다.
 * - 특징: message 프로퍼티에 에러 메시지가 담겨 있습니다. API 통신과는 관련이 없을 수 있습니다.
 *
 * 4. else: 위 두 가지에 해당하지 않는, 예측 불가능한 모든 종류의 에러입니다.
 *
 * @section 메시지 분리 원칙
 * devMessage(개발자용 메시지 추출)
 * - 목적: 디버깅을 위해 최대한 상세하고 원본에 가까운 정보를 제공합니다.
 * - 내용: 서버가 보내준 원본 에러 메시지(error.data.message)나 자바스크립트 에러 메시지를 포함합니다.
 * - 사용처: console.error를 통해 개발자 도구에 로깅됩니다. 사용자에게는 절대 노출되지 않습니다.
 *
 * userMessage(사용자용 메시지 결정)
 * - 목적: 사용자에게 혼란을 주지 않는, 안전하고 이해하기 쉬운 메시지를 제공합니다.
 * - 내용: HTTP 상태 코드에 따라 미리 정의된, 일관되고 친절한 한글 메시지입니다.
 * - 사용처: ErrorDisplay 컴포넌트를 통해 화면에 직접 렌더링됩니다.
 */
const parseRouteError = (error: unknown): ParsedError => {
  if (isRouteErrorResponse(error)) {
    const status = error.status;

    // 개발자용 상세 메시지 추출
    let devMessage = '서버로부터 구체적인 에러 메시지를 받지 못했습니다.';
    const errorData = error.data;

    if (
      typeof errorData === 'object' &&
      errorData !== null &&
      'message' in errorData &&
      typeof (errorData as { message: unknown }).message === 'string'
    ) {
      devMessage = (errorData as { message: string }).message;
    } else if (typeof errorData === 'string') {
      try {
        const parsed = JSON.parse(errorData);
        devMessage = parsed.message || '파싱된 JSON에 message 속성이 없습니다.';
      } catch {
        devMessage = errorData;
      }
    }

    // 사용자용 메시지 결정
    const userMessage = (UI_ERRORS.API as Record<number, string>)[status] || UI_ERRORS.UNKNOWN;

    return { status, userMessage, devMessage };
  }

  // AxiosError 처리 추가
  if (error instanceof AxiosError) {
    if (error.request && !error.response) {
      return {
        status: HttpStatusCode.ServiceUnavailable,
        userMessage: UI_ERRORS.NETWORK_CONNECTION,
        devMessage: `네트워크 요청 실패: ${error.message} (코드: ${error.code || 'N/A'})`,
      };
    }

    // 기타 Axios 에러 (예: 요청 설정 에러)
    return {
      status: HttpStatusCode.InternalServerError,
      userMessage: UI_ERRORS.UNKNOWN,
      devMessage: `Axios 요청 설정 또는 기타 에러: ${error.message} (코드: ${error.code || 'N/A'})`,
    };
  }

  if (error instanceof Error) {
    return {
      status: 500,
      userMessage: UI_ERRORS.CLIENT,
      devMessage: error.message,
    };
  }

  return {
    status: 500,
    userMessage: UI_ERRORS.UNKNOWN,
    devMessage: '알 수 없는 타입의 에러입니다.',
  };
};

export default parseRouteError;
