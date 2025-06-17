import { useRouteError } from 'react-router-dom';

import UI_ERRORS from '@/constants/errors/uiErrors';
import parseRouteError from '@/utils/error/parseRouteError';

import ErrorDisplay from './ErrorDisplay';
import type { ErrorDisplayProps } from './types';

/**
 * @description
 * 앱의 최상단에서 발생하는 모든 에러를 처리하는 전역 에러 바운더리.
 * 라우터의 최상위 errorElement로 사용됩니다.
 */
const GlobalErrorBoundary = () => {
  const error = useRouteError();
  const { status, userMessage, devMessage } = parseRouteError(error);

  console.error(`[🩺 Global Error - ${status}]: ${devMessage}`, { originalError: error });

  const displayProps: ErrorDisplayProps = {
    status,
    message: userMessage,
    title: UI_ERRORS.BOUNDARY_TITLES.GLOBAL,
  };
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex flex-1 flex-col'>
        <ErrorDisplay {...displayProps} />
      </main>
    </div>
  );
};

export default GlobalErrorBoundary;
