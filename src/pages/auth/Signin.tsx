import { Link } from 'react-router-dom';

import VerticalLogo from '@/assets/images/VerticalLogo';
import LoginForm from '@/components/loginForm';

const Signin = () => {
  return (
    <section className='flex w-350 flex-col items-center justify-center gap-25 tablet:w-520 pc:w-600'>
      <Link to='/'>
        <VerticalLogo className='tablet:size-330 pc:size-400' size={230} />
      </Link>
      <LoginForm />

      <p className='text-lg text-capybara'>
        회원이 아니신가요?
        <Link className='ml-8 font-semibold underline hover:text-[#653f3f] active:text-[#4b2828]' to='/signup'>
          회원가입하기
        </Link>
      </p>
    </section>
  );
};

export default Signin;
