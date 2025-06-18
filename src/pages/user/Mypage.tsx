import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';

import { changePassword } from '@/apis/auth';
import AddIcon from '@/assets/icons/AddIcon';
import ChevronIcon from '@/assets/icons/ChevronIcon';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import type { MypageLoaderData } from '@/loaders/myPage/types';
import type { ChangePasswordRequest } from '@/schemas/auth';
import { changePasswordRequestSchema } from '@/schemas/auth';
import type { UserInfo } from '@/schemas/user';

const MyPage = () => {
  const initialData = useLoaderData() as MypageLoaderData;
  const [myProfile, setMyProfile] = useState<UserInfo>(initialData.myInfo);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordRequest>({
    resolver: zodResolver(changePasswordRequestSchema),
  });

  const onSubmit = async (data: ChangePasswordRequest) => {
    try {
      await changePassword(data);
    } catch (err) {
      console.error('🩺비밀번호 변경 실패:', err);
      if (err instanceof Response) {
        const error = await err.json().catch(() => {});
        const errorMessage = error.message;
        setError('password', {
          type: 'value',
          message: errorMessage,
        });
      }
    }
  };

  return (
    <div className='flex min-h-screen flex-col gap-6 bg-gray-100 px-12 py-16 tablet:gap-18 tablet:px-16'>
      <nav className='flex items-center gap-8'>
        <ChevronIcon direction='left' size={18} />
        <span>돌아가기</span>
      </nav>
      <div className='flex flex-col gap-16 tablet:gap-24'>
        <section className='flex h-496 max-w-672 flex-col gap-40 rounded-lg bg-white p-16 tablet:h-366 tablet:gap-24 tablet:p-24'>
          <header>
            <h2 className='text-2lg font-bold tablet:text-2xl'>프로필</h2>
          </header>
          <div className='flex flex-col gap-40 tablet:flex-row tablet:gap-42'>
            <Input.Root>
              <Input.Label
                className='flex size-100 cursor-pointer items-center justify-center rounded-md bg-[#f5f5f5] tablet:size-182'
                htmlFor='fileUpload'
              >
                <AddIcon className='tablet:size-18' size={12} />
              </Input.Label>
              <Input.Field id='fileUpload' type='file' />
            </Input.Root>
            <form className='flex flex-1 flex-col gap-24'>
              <div className='flex flex-col gap-16'>
                <Input.Root>
                  <Input.Label className='text-md tablet:text-lg' htmlFor='email'>
                    이메일
                  </Input.Label>
                  <Input.Field
                    readOnly
                    className='cursor-default focus:border-1 focus:border-gray-300 focus:ring-0 focus:outline-none'
                    id='email'
                    placeholder={myProfile.email}
                    type='text'
                  />
                </Input.Root>
                <Input.Root>
                  <Input.Label className='text-md tablet:text-lg' htmlFor='nickname'>
                    닉네임
                  </Input.Label>
                  <Input.Field id='nickname' placeholder={myProfile.nickname} type='text' />
                </Input.Root>
              </div>
              <Button className='rounded-lg' size='lg' type='submit' variant='filled'>
                저장
              </Button>
            </form>
          </div>
        </section>
        <section className='flex h-454 max-w-672 flex-col gap-40 rounded-lg bg-white p-16 tablet:h-466 tablet:gap-24 tablet:p-24'>
          <header>
            <h2 className='text-2lg font-bold tablet:text-2xl'>비밀번호 변경</h2>
          </header>
          <form className='flex flex-col gap-24' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-16'>
              <Input.Root>
                <Input.Label className='text-md tablet:text-lg' htmlFor='currentPassword'>
                  현재 비밀번호
                </Input.Label>
                <Input.Field
                  id='currentPassword'
                  placeholder='현재 비밀번호 입력'
                  type='password'
                  {...register('password')}
                />
                <Input.ErrorMessage>{errors.password?.message}</Input.ErrorMessage>
              </Input.Root>
              <Input.Root>
                <Input.Label className='text-md tablet:text-lg' htmlFor='newPassword'>
                  새 비밀번호
                </Input.Label>
                <Input.Field
                  id='newPassword'
                  placeholder='새 비밀번호 입력'
                  type='password'
                  {...register('newPassword')}
                />
                <Input.ErrorMessage>{errors.newPassword?.message}</Input.ErrorMessage>
              </Input.Root>
              <Input.Root>
                <Input.Label className='text-md tablet:text-lg' htmlFor='checkPassword'>
                  새 비밀번호 확인
                </Input.Label>
                <Input.Field
                  id='checkPassword'
                  placeholder='새 비밀번호 입력'
                  type='password'
                  {...register('checkPassword')}
                />
                <Input.ErrorMessage>{errors.checkPassword?.message}</Input.ErrorMessage>
              </Input.Root>
            </div>
            <Button className='rounded-lg' size='lg' type='submit' variant='filled'>
              {isSubmitting ? '변경 중' : '변경'}
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default MyPage;
