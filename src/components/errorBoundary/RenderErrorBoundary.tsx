import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';

import UI_ERRORS from '@/constants/errors/uiErrors';

import ErrorDisplay from './ErrorDisplay';
import type { ErrorDisplayProps, RenderErrorBoundaryProps } from './types';

/**
 * @description 렌더링 중 발생하는 에러를 처리하기 위한 Fallback 컴포넌트입니다.
 * react-error-boundary 라이브러리의 FallbackProps를 받습니다.
 * @param {Error} error - 발생한 렌더링 에러 객체.
 */
const RenderErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const displayProps: ErrorDisplayProps = {
    message: UI_ERRORS.CLIENT,
    title: UI_ERRORS.BOUNDARY_TITLES.RENDER,
    variant: 'retry',
    onRetry: resetErrorBoundary,
  };

  return <ErrorDisplay {...displayProps} />;
};

/**
 * @description
 * UI의 특정 부분(컴포넌트)을 감싸서, 해당 부분에서 발생하는 렌더링 에러를 처리하는 바운더리입니다.
 * 이 컴포넌트로 감싸진 자식 컴포넌트에서 렌더링 오류 발생 시,
 * Fallback UI가 나타나며 앱 전체나 페이지 전체가 중단되는 것을 방지합니다.
 *
 * @example
 * <RenderErrorBoundary>
 *   <PotentiallyCrashingChart />
 * </RenderErrorBoundary>
 */
const RenderErrorBoundary = ({ children }: RenderErrorBoundaryProps) => {
  return <ErrorBoundary FallbackComponent={RenderErrorFallback}>{children}</ErrorBoundary>;
};

export default RenderErrorBoundary;
