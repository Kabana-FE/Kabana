import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/useAuthStore';

const Signin = () => {
  const { login, signup, logout } = useAuth();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

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

  return (
    <div className='space-y-4 p-8'>
      <h1 className='text-xl font-bold'>인증 테스트 페이지</h1>

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
    </div>
  );
};

export default Signin;
