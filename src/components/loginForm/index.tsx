import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import EyeIcon from '@/assets/icons/EyeIcon';
import EyeOffIcon from '@/assets/icons/EyeOffIcon';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { useAuth } from '@/hooks/useAuth';
import { type LoginRequest, loginRequestSchema } from '@/schemas/auth';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data);
      navigate('/dashboards', { replace: true });
    } catch (error) {
      // 토스트 메세지로 변경 예정
      alert(`로그인 실패: ${error}`);
    }
  };

  return (
    <form noValidate className='flex w-full flex-col gap-20' onSubmit={handleSubmit(onSubmit)}>
      <Input.Root>
        <Input.Label htmlFor='email'>이메일</Input.Label>
        <Input.Field
          autoComplete='email'
          id='email'
          placeholder='이메일을 입력해 주세요'
          type='email'
          {...register('email')}
          isInvalid={!!errors.email}
        />
        <Input.ErrorMessage>{errors.email?.message}</Input.ErrorMessage>
      </Input.Root>

      <Input.Root>
        <Input.Label htmlFor='password'>비밀번호</Input.Label>
        <Input.Field
          id='password'
          placeholder='비밀번호를 입력해 주세요'
          rightIcon={
            <button
              className='cursor-pointer focus:outline-none'
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          }
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          isInvalid={!!errors.password}
        />
        <Input.ErrorMessage>{errors.password?.message}</Input.ErrorMessage>
      </Input.Root>
      <Button
        className='rounded-md'
        disabled={isSubmitting || !isDirty || Object.keys(errors).length > 0}
        type='submit'
      >
        {isSubmitting ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
};

export default LoginForm;
