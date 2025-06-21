import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';

import { changePassword } from '@/apis/auth';
import { updateMyInfo, uploadProfileImg } from '@/apis/user';
import AddIcon from '@/assets/icons/AddIcon';
import ChevronIcon from '@/assets/icons/ChevronIcon';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import TOAST_MESSAGES from '@/constants/messages/toastMessages';
import { useToast } from '@/hooks/useToast';
import type { MypageLoaderData } from '@/loaders/myPage/types';
import type { ChangePasswordRequest } from '@/schemas/auth';
import { changePasswordRequestSchema } from '@/schemas/auth';
import type { UpdateUser, UserInfo } from '@/schemas/user';
import { updateUserInfoSchema } from '@/schemas/user';

const MyPage = () => {
  const initialData = useLoaderData() as MypageLoaderData;
  const [myProfile, setMyProfile] = useState<UserInfo>(initialData.myInfo);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { showSuccess, showError } = useToast();

  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    formState: { isSubmitting: isSubmittingInfo },
  } = useForm<UpdateUser>({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: {
      nickname: myProfile.nickname,
    },
  });

  const onSubmitInfo = async (data: UpdateUser) => {
    try {
      const updatedData = {
        ...data,
        profileImageUrl: myProfile.profileImageUrl,
      };
      await updateMyInfo(updatedData);
      showSuccess(TOAST_MESSAGES.API.UPDATE_SUCCESS('프로필'));
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    } catch (err) {
      showError(TOAST_MESSAGES.API.UPDATE_FAILURE('프로필'));
      console.error('🩺 프로필 수정 실패:', err);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    const formData = new FormData();
    formData.append('image', file);
    try {
      const updatedProfile = await uploadProfileImg(formData);
      setMyProfile((prev) => ({
        ...prev,
        profileImageUrl: updatedProfile.profileImageUrl,
      }));
      showSuccess(TOAST_MESSAGES.API.UPDATE_SUCCESS('프로필 사진'));
    } catch (error) {
      showError(TOAST_MESSAGES.API.UPDATE_FAILURE('프로필 사진'));
      console.error('🩺 이미지 업로드 실패:', error);
    }
  };

  const {
    register: registerPwd,
    handleSubmit: handleSubmitPwd,
    setError,
    formState: { errors, isSubmitting: isSubmittingPwd },
  } = useForm<ChangePasswordRequest>({
    resolver: zodResolver(changePasswordRequestSchema),
  });

  const onSubmitPwd = async (data: ChangePasswordRequest) => {
    try {
      await changePassword(data);
      showSuccess(TOAST_MESSAGES.API.UPDATE_SUCCESS('비밀번호'));
    } catch (err) {
      showError(TOAST_MESSAGES.API.UPDATE_FAILURE('비밀번호'));
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
                {previewUrl || myProfile.profileImageUrl ? (
                  <img
                    alt='프로필 이미지 미리보기'
                    className='h-full w-full rounded-md object-cover'
                    src={(previewUrl ?? myProfile.profileImageUrl) || undefined}
                  />
                ) : (
                  <AddIcon className='tablet:size-18' size={12} />
                )}
              </Input.Label>
              <Input.Field id='fileUpload' type='file' onChange={handleFileChange} />
            </Input.Root>
            <form className='flex flex-1 flex-col gap-24' onSubmit={handleSubmitInfo(onSubmitInfo)}>
              <div className='flex flex-col gap-16'>
                <Input.Root>
                  <Input.Label className='text-md tablet:text-lg' htmlFor='email'>
                    이메일
                  </Input.Label>
                  <Input.Field
                    readOnly
                    autoComplete='email'
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
                  <Input.Field
                    {...registerInfo('nickname')}
                    id='nickname'
                    placeholder={myProfile.nickname}
                    type='text'
                  />
                </Input.Root>
              </div>
              <Button className='rounded-lg' disabled={isSubmittingInfo} size='lg' type='submit' variant='filled'>
                {isSubmittingInfo ? '저장 중' : '저장'}
              </Button>
            </form>
          </div>
        </section>
        <section className='flex h-454 max-w-672 flex-col gap-40 rounded-lg bg-white p-16 tablet:h-466 tablet:gap-24 tablet:p-24'>
          <header>
            <h2 className='text-2lg font-bold tablet:text-2xl'>비밀번호 변경</h2>
          </header>
          <form className='flex flex-col gap-24' onSubmit={handleSubmitPwd(onSubmitPwd)}>
            <div className='flex flex-col gap-16'>
              <Input.Root>
                <Input.Label className='text-md tablet:text-lg' htmlFor='currentPassword'>
                  현재 비밀번호
                </Input.Label>
                <Input.Field
                  id='currentPassword'
                  placeholder='현재 비밀번호 입력'
                  type='password'
                  {...registerPwd('password')}
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
                  {...registerPwd('newPassword')}
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
                  {...registerPwd('checkPassword')}
                />
                <Input.ErrorMessage>{errors.checkPassword?.message}</Input.ErrorMessage>
              </Input.Root>
            </div>
            <Button className='rounded-lg' size='lg' type='submit' variant='filled'>
              {isSubmittingPwd ? '변경 중' : '변경'}
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default MyPage;
