import { HttpStatusCode } from 'axios';
import { isRouteErrorResponse } from 'react-router-dom';
import { ZodError } from 'zod';

import UI_ERRORS from '@/constants/errors/uiErrors';

/**
 * @description
 * React Router의 loader 함수 내 catch 블록에서 사용되는 중앙 에러 처리 유틸리티입니다.
 * 이 함수의 주된 목적은 loader에서 발생하는 모든 종류의 에러를,
 * React Router의 errorElement가 처리할 수 있는 표준 Response 객체로 변환하여 throw하는 것입니다.
 *
 * @param {unknown} error - Loader의 catch블록에서 포착된 알 수 없는 타입의 에러.
 * @throws {Response} - 에러의 종류에 따라 적절한 메시지와 상태를 담은 Response 객체를 항상 throw합니다.
 * @returns {never} - 이 함수는 항상 에러를 throw하므로, 반환 타입은 never입니다.
 *
 * @section 에러 처리 분기
 * 1. isRouteErrorResponse(error) || error instanceof Response:
 * - 에러가 이미 axios 인터셉터 등에 의해 표준화된 Response 객체인 경우입니다.
 * - 이 경우, 추가 처리 없이 그대로 다시 throw하여 errorElement로 전달합니다.
 *
 * 2. error instanceof ZodError:
 * - 서버로부터 받은 데이터가 프론트엔드에서 정의한 스키마(Zod)와 일치하지 않는 경우입니다.
 * - 이는 클라이언트가 해결할 수 없는 서버-클라이언트 간의 데이터 계약 위반이므로,
 * 개발자를 위해 상세한 Zod 에러를 콘솔에 기록하고, 사용자에게는 일반적인 서버 에러(500)로 응답합니다.
 *
 * 3. else(그 외 모든 에러):
 * - loader내 로직에서 발생한 예상치 못한 모든 종류의 에러를 처리합니다.
 * - 에러를 콘솔에 기록하고, 포괄적인 에러 메시지를 담은 Response객체를 throw합니다.
 */
const handleLoaderError = (error: unknown): never => {
  if (isRouteErrorResponse(error) || error instanceof Response) {
    throw error;
  }

  if (error instanceof ZodError) {
    console.error('🩺 Zod 유효성 검사 실패:', error.errors);
    throw new Response(JSON.stringify({ message: UI_ERRORS.API[HttpStatusCode.InternalServerError] }), {
      status: HttpStatusCode.InternalServerError,
      statusText: 'Invalid Data Schema From Server',
    });
  }

  console.error('🩺 loader 내부에서 예상치 못한 에러 발생:', error);
  throw new Response(JSON.stringify({ message: UI_ERRORS.UNKNOWN }), {
    status: HttpStatusCode.InternalServerError,
  });
};

export default handleLoaderError;
