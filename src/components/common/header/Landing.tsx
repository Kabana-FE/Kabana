import { Link } from 'react-router';

import HorizontalLogo from '@/assets/images/HorizontalLogo';
import LogoTextImage from '@/assets/images/LogoTextImage';
import { ROUTES } from '@/constants/paths';

const LandingHeader = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-10 flex h-60 items-center justify-between bg-black px-24 py-16 tablet:h-70 tablet:px-40 pc:px-80'>
      <LogoTextImage className='tablet:hidden' size={160} />
      <HorizontalLogo className='hidden tablet:block' size={200} />
      <div className='flex items-center gap-24 text-md font-normal text-white tablet:gap-36 tablet:text-lg'>
        <Link to={ROUTES.SIGNIN}>로그인</Link>
        <Link to={ROUTES.SIGNUP}>회원가입</Link>
      </div>
    </header>
  );
};

export default LandingHeader;
