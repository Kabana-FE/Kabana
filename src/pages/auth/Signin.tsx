import { useState } from 'react';

import AddIcon from '@/assets/icons/AddIcon';
import CheckIcon from '@/assets/icons/CheckIcon';
import ErrorIcon from '@/assets/icons/ErrorIcon';
import InfoIcon from '@/assets/icons/InfoIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import SuccessIcon from '@/assets/icons/SuccessIcon';
import WarningIcon from '@/assets/icons/WarningIcon';
import Input from '@/components/common/input';
import { useAuth } from '@/hooks/useAuth';
import { useKabanaStore } from '@/stores';

const Signin = () => {
  const { login, signup, logout } = useAuth();
  const user = useKabanaStore((state) => state.user);
  const isLoggedIn = useKabanaStore((state) => state.isLoggedIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleLogin = () => {
    login({ email, password });
  };

  const handleSignup = () => {
    signup({ nickname, email, password });
  };

  const handleLogout = () => {
    logout();
  };
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('검색어:', query);
    // debounce 함수와 API 호출 로직 추가 가능
  };

  const hasError = false;
  const errorMessage = hasError ? '이메일을 입력해주세요.' : '';

  return (
    <div className='space-y-4 p-8'>
      <h1 className='text-xl font-bold'>인증 테스트 페이지</h1>
      <SuccessIcon size={20} />
      <WarningIcon size={20} />
      <InfoIcon size={20} />
      <ErrorIcon size={20} />
      <CheckIcon color='black' size={20} />

      <div className='flex flex-col space-y-2'>
        <input
          className='rounded border p-2'
          placeholder='이름 (회원가입 전용)'
          type='text'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          className='rounded border p-2'
          placeholder='이메일'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='rounded border p-2'
          placeholder='비밀번호'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className='flex space-x-4'>
        <button className='rounded bg-blue-500 px-4 py-2 text-white' onClick={handleLogin}>
          로그인
        </button>
        <button className='rounded bg-green-500 px-4 py-2 text-white' onClick={handleSignup}>
          회원가입
        </button>
        <button className='rounded bg-red-500 px-4 py-2 text-white' onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      <div className='mt-4'>
        <h2>현재 로그인 상태: {isLoggedIn ? '✅ 로그인됨' : '❌ 로그아웃됨'}</h2>
        {user && (
          <div className='mt-2'>
            <p>유저명: {user.nickname}</p>
            <p>이메일: {user.email}</p>
          </div>
        )}
      </div>

      <Input.Root>
        <Input.Label htmlFor='email'>이메일</Input.Label>
        <Input.Field
          autoComplete='email'
          id='email'
          isInvalid={hasError}
          leftIcon={<SearchIcon />}
          placeholder='이메일을 입력해주세요'
          type='email'
        />
        <Input.ErrorMessage>{errorMessage}</Input.ErrorMessage>
      </Input.Root>

      <Input.Root>
        <Input.Field name='comment' placeholder='댓글을 입력해주세요' type='textarea' />
      </Input.Root>

      <Input.Root>
        <Input.Label
          className='flex h-76 w-76 cursor-pointer items-center justify-center rounded-md bg-[#F5F5F5] transition-colors hover:bg-gray-200'
          htmlFor='fileUpload'
        >
          <AddIcon />
        </Input.Label>
        <Input.Field id='fileUpload' name='fileUpload' type='file' />
      </Input.Root>

      <Input.Root>
        <Input.Field />
      </Input.Root>
    </div>
  );
};

export default Signin;
