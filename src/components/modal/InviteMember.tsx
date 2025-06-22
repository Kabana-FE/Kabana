import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import { inviteMember } from '@/apis/invitation';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Input from '@/components/common/input';
import type { InviteMemberProps } from '@/components/modal/types';
import TOAST_MESSAGES from '@/constants/messages/toastMessages';
import { useToast } from '@/hooks/useToast';
import type { InviteMemberInput } from '@/schemas/invitation';
import { inviteMemberSchema } from '@/schemas/invitation';
/**
 * 구성원 초대 모달 컴포넌트
 *
 * @param {number} dashboardId - 초대할 대시보드의 ID
 * @param {boolean} isModalOpen - 모달의 열림 여부
 * @param {() => void} toggleModal - 모달의 열람/닫힘 상태를 토글하는 함수
 *
 * @description
 * - 대시보드에 이메일을 입력하여 구성원을 초대하는 폼 입니다.
 * - 초대 요청 성공 시 해당 이메일을 가진 유저에게 초대가 갑니다.
 */
const InviteMember = ({ dashboardId, isModalOpen, toggleModal }: InviteMemberProps) => {
  const { showSuccess, showError } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<InviteMemberInput>({
    resolver: zodResolver(inviteMemberSchema),
  });
  const email = useWatch({ control, name: 'email' });
  const onSubmit = async (data: InviteMemberInput) => {
    try {
      await inviteMember(dashboardId, data);
      toggleModal();
      showSuccess(TOAST_MESSAGES.INVITATION.SUCCESS(data.email));
      reset();
    } catch (err) {
      showError(TOAST_MESSAGES.INVITATION.FAILURE);
      console.error('🩺 구성원 초대 실패:', err);
    }
  };

  return (
    <Dialog.Root
      className='w-327 rounded-lg px-16 py-24 tablet:w-568 tablet:px-24'
      isModalOpen={isModalOpen}
      toggleModal={isSubmitting ? () => {} : toggleModal}
    >
      <Dialog.Close resetContent={reset} toggleModal={toggleModal} />
      <Dialog.Title className='text-xl font-bold tablet:text-2xl'>초대하기</Dialog.Title>
      <Dialog.Content className='pt-16 pb-24 tablet:pt-24'>
        <form className='flex flex-col gap-8' id='inviteMember' onSubmit={handleSubmit(onSubmit)}>
          <Input.Root>
            <Input.Label className='tablet:text-2lg' htmlFor='email'>
              이메일
            </Input.Label>
            <Input.Field id='email' type='email' {...register('email')} placeholder='user@email.com' />
            <Input.ErrorMessage>{errors.email?.message}</Input.ErrorMessage>
          </Input.Root>
        </form>
      </Dialog.Content>
      <Dialog.ButtonArea>
        <Button
          className='w-full rounded-lg'
          disabled={!email?.trim() || isSubmitting}
          form='inviteMember'
          size='lg'
          type='submit'
          variant='filled'
        >
          {isSubmitting ? '초대 중' : '초대'}
        </Button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default InviteMember;
