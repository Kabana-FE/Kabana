import { Link } from 'react-router-dom';

import VerticalLogo from '@/assets/images/VerticalLogo';
import Button from '@/components/button';
import UI_ERRORS from '@/constants/errors/uiErrors';
import { ROUTES } from '@/constants/paths';

/**
 * @description 404 Not Found 에러 페이지.
 * 존재하지 않는 URL 경로로 접근했을 때 표시되는 전용 페이지입니다.
 * 다른 에러와 달리, 사용자에게 친근한 안내를 제공하는 데 초점을 맞춥니다.
 */
const NotFound = () => {
  const { TITLE, MESSAGE } = UI_ERRORS.NOT_FOUND;

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-y-16 bg-gray-100 text-center'>
      <header>
        <Link to={ROUTES.APP}>
          <VerticalLogo aria-label='카바나 로고' className='h-auto w-64' />
        </Link>
      </header>

      <main className='flex flex-col items-center gap-y-6'>
        <h1 className='text-6xl font-extrabold text-capybara'>404</h1>
        <div className='flex flex-col gap-y-2'>
          <p className='text-2xl font-bold text-gray-800'>{TITLE}</p>
          <p className='text-gray-600'>{MESSAGE}</p>
        </div>
      </main>

      <footer className='mt-8'>
        <Button className='px-10 py-4' size='lg' onButtonClick={() => (window.location.href = ROUTES.APP)}>
          홈으로 돌아가기
        </Button>
      </footer>
    </div>
  );
};

export default NotFound;
