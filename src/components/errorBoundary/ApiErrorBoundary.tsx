import { useRouteError } from 'react-router-dom';

import UI_ERRORS from '@/constants/errors/uiErrors';
import parseRouteError from '@/utils/error/parseRouteError';

import ErrorDisplay from './ErrorDisplay';
import type { ErrorDisplayProps } from './types';

/**
 * @description
 * API 관련 에러(loader/action)를 처리하기 위한 에러 바운더리.
 * 라우트의 errorElement로 사용되어, 데이터 로딩 실패 시 사용자에게 피드백을 제공합니다.
 */
export const ApiErrorBoundary = () => {
  const error = useRouteError();
  const { status, userMessage, devMessage } = parseRouteError(error);

  console.error(`[🩺 API Error - ${status}]: ${devMessage}`, { originalError: error });

  const displayProps: ErrorDisplayProps = {
    status,
    message: userMessage,
    title: UI_ERRORS.BOUNDARY_TITLES.API,
    variant: ['retry'],
  };
  return <ErrorDisplay {...displayProps} />;
};
