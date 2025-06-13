import { useNavigate } from 'react-router-dom';

import ErrorImage from '@/assets/images/ErrorImage';
import Button from '@/components/button';
import { ROUTES } from '@/constants/paths';

interface ErrorDisplayProps {
  status?: number;
  title: string;
  message: string;
}

/**
 * @description 에러 정보를 받아 일관된 UI로 표시하는 재사용 가능한 컴포넌트
 */
const ErrorDisplay = ({ status, title, message }: ErrorDisplayProps) => {
  const navigate = useNavigate();

  return (
    <div
      className='bg-background flex size-full flex-col items-center justify-center gap-y-6 p-4 text-center'
      role='alert'
    >
      <ErrorImage className='h-auto w-48' />
      <div className='flex flex-col gap-y-2'>
        {status && <p className='text-destructive font-mono text-lg font-bold'>{status}</p>}
        <h1 className='text-xl font-bold'>{title}</h1>
        <p className='text-muted-foreground text-sm'>{message}</p>
      </div>
      <div className='flex gap-x-3'>
        <Button variant='outlined' onButtonClick={() => navigate(-1)}>
          이전 페이지로
        </Button>
        <Button onButtonClick={() => navigate(ROUTES.APP, { replace: true })}>홈으로 가기</Button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
