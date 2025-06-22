import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import EyeIcon from '@/assets/icons/EyeIcon';
import EyeOffIcon from '@/assets/icons/EyeOffIcon';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import TOAST_MESSAGES from '@/constants/messages/toastMessages';
import { ROUTES } from '@/constants/paths/routes';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import type { SignupRequest } from '@/schemas/auth';
import { signupRequestSchema } from '@/schemas/auth';

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);
  const { showSuccess, showError } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupRequest>({
    resolver: zodResolver(signupRequestSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      checkPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: SignupRequest) => {
    try {
      await signup(data);
      await navigate(ROUTES.SIGNIN, { replace: true });
      showSuccess(TOAST_MESSAGES.AUTH.SIGNUP_SUCCESS);
    } catch (error) {
      // 토스트 메세지로 변경 예정
      // alert(`회원가입 실패: ${error}`);
      showError(TOAST_MESSAGES.AUTH.SIGNUP_FAILURE);
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
        <Input.Label htmlFor='nickname'>닉네임</Input.Label>
        <Input.Field
          id='nickname'
          placeholder='닉네임을 입력해 주세요'
          type='text'
          {...register('nickname')}
          isInvalid={!!errors.nickname}
        />
        <Input.ErrorMessage>{errors.nickname?.message}</Input.ErrorMessage>
      </Input.Root>

      <Input.Root>
        <Input.Label htmlFor='password'>비밀번호</Input.Label>
        <Input.Field
          id='password'
          placeholder='8자 이상 입력해 주세요'
          rightIcon={
            <button
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
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

      <Input.Root>
        <Input.Label htmlFor='checkPassword'>비밀번호 확인</Input.Label>
        <Input.Field
          id='checkPassword'
          placeholder='비밀번호를 한 번 더 입력해 주세요'
          rightIcon={
            <button
              aria-label={showCheckPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              className='cursor-pointer focus:outline-none'
              type='button'
              onClick={() => setShowCheckPassword((prev) => !prev)}
            >
              {showCheckPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          }
          type={showCheckPassword ? 'text' : 'password'}
          {...register('checkPassword')}
          isInvalid={!!errors.checkPassword}
        />
        <Input.ErrorMessage>{errors.checkPassword?.message}</Input.ErrorMessage>
      </Input.Root>

      <label className='flex items-center gap-2 text-lg'>
        <input
          className='h-20 w-20 accent-capybara'
          type='checkbox'
          {...register('agreeToTerms')}
          onChange={(e) => {
            setValue('agreeToTerms', e.target.checked);
            trigger('agreeToTerms');
          }}
        />
        <span className='ml-5'>이용약관에 동의합니다.</span>
      </label>

      <Input.ErrorMessage>{errors.agreeToTerms?.message}</Input.ErrorMessage>

      <Button className='rounded-md' disabled={isSubmitting || !isValid} type='submit'>
        {isSubmitting ? '가입 중...' : '가입하기'}
      </Button>
    </form>
  );
};

export default SignupForm;
