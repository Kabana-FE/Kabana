import { HttpStatusCode } from 'axios';
import { ZodError } from 'zod';

import DEV_ERRORS from '@/constants/errors/devErrors';

/**
 * @description
 * React Router Loader에서 발생하는 에러를 처리하고, 표준화된 Response 객체를 throw하는 유틸리티 함수.
 * `loader`의 `catch` 블록에서 호출
 * @param error - Loader의 `catch` 블록에서 포착된 알 수 없는 타입의 에러. `Promise.allSettled`의 `reason`이 될 수 있습니다.
 * @returns 이 함수는 절대 값을 반환하지 않고, 항상 에러를 throw하므로 반환 타입은 'never'입니다.
 * @throws {Response} 에러의 종류에 따라 적절한 메시지와 상태를 담은 `Response` 객체를 항상 throw합니다.
 * @remarks
 * - `error`가 이미 표준화된 Response 객체인 경우(주로 Axios Interceptor가 생성): 원본 `error`를 그대로 throw합니다.
 * - `error`가 `ZodError`인 경우: `DEV_ERRORS.VALIDATION.SCHEMA_MISMATCH` 메시지를 담은 새 Response 객체를 throw합니다.
 * - 예상치 못한 에러인 경우, `DEV_ERRORS.GENERAL.UNEXPECTED` 메시지를 담은 새 Response 객체를 throw합니다.
 */
export function handleLoaderError(error: unknown): never {
  if (error instanceof Response) {
    throw error;
  }

  if (error instanceof ZodError) {
    console.error('🩺Zod validation failed:', error.errors);
    throw new Response(DEV_ERRORS.VALIDATION.SCHEMA_MISMATCH, {
      status: HttpStatusCode.InternalServerError,
    });
  }

  throw new Response(DEV_ERRORS.GENERAL.UNEXPECTED, {
    status: HttpStatusCode.InternalServerError,
  });
}
