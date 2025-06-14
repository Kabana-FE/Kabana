import { useNavigate } from 'react-router-dom';

import ErrorImage from '@/assets/images/ErrorImage';
import Button from '@/components/common/button';
import { ROUTES } from '@/constants/paths';

import type { ErrorDisplayProps } from './types';

/**
 * @description 에러 정보를 받아 일관된 UI로 표시하는 재사용 가능한 컴포넌트
 * @param {number} status - 표시할 HTTP 상태 코드 (옵션)
 * @param {string} title - 에러의 주 제목
 * @param {string} message - 에러의 상세 메시지
 * @param {'back' | 'retry' } variant - 표시할 버튼 종류
 * @param {() => void} onRetry - '다시 시도' 버튼 클릭 시 실행될 함수
 */
/** */
const ErrorDisplay = ({ status, title, message, variant, onRetry }: ErrorDisplayProps) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-10 bg-Magnolia' role='alert'>
      <ErrorImage className='h-auto w-320' />
      <h1 className='text-xl font-bold text-gray-black'>{title}</h1>

      <div className='flex max-w-md flex-col items-center justify-center gap-y-6 rounded-2xl bg-gray-100 p-10 text-center shadow-xl'>
        <div className='flex flex-col gap-y-1'>
          {status && <p className='text-lg font-bold text-red'>{status}</p>}
          <p className='text-md text-gray-500'>{message}</p>
        </div>
        <div className='mt-4 flex gap-x-3'>
          {variant === 'back' && (
            <Button variant='outlined' onClick={() => navigate(-1)}>
              이전 페이지로
            </Button>
          )}
          {variant === 'retry' && onRetry && (
            <Button variant='outlined' onClick={onRetry}>
              다시 시도
            </Button>
          )}
          <Button onClick={() => navigate(ROUTES.APP, { replace: true })}>홈으로 가기</Button>
        </div>
      </div>
    </div>
  );
};
export default ErrorDisplay;
