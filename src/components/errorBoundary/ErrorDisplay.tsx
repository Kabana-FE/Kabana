import { useNavigate } from 'react-router-dom';

import ErrorImage from '@/assets/images/ErrorImage';
import Button from '@/components/button';
import { ROUTES } from '@/constants/paths';

import type { ErrorDisplayProps } from './types';

/**
 * @description 에러 정보를 받아 일관된 UI로 표시하는 재사용 가능한 컴포넌트
 * @param {number} status - 표시할 HTTP 상태 코드 (옵션)
 * @param {string} title - 에러의 주 제목
 * @param {string} message - 에러의 상세 메시지
 * @param {boolean} showBackButton - '이전 페이지로' 버튼 표시 여부 (기본값: true)
 */
/** */
const ErrorDisplay = ({ status, title, message, showBackButton = true }: ErrorDisplayProps) => {
  const navigate = useNavigate();

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-10 bg-Magnolia' role='alert'>
      <ErrorImage className='h-auto w-[20rem]' />
      <h1 className='text-xl font-bold text-gray-black'>{title}</h1>

      <div className='flex max-w-md flex-col items-center justify-center gap-y-6 rounded-2xl bg-gray-100 p-10 text-center shadow-xl'>
        <div className='flex flex-col gap-y-1'>
          {status && <p className='text-lg font-bold text-red'>{status}</p>}
          <p className='text-md text-gray-500'>{message}</p>
        </div>
        <div className='mt-4 flex gap-x-3'>
          {showBackButton && (
            <Button variant='outlined' onButtonClick={() => navigate(-1)}>
              이전 페이지로
            </Button>
          )}
          <Button onButtonClick={() => navigate(ROUTES.APP, { replace: true })}>홈으로 가기</Button>
        </div>
      </div>
    </div>
  );
};
export default ErrorDisplay;
