import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { inviteMember } from '@/apis/invitation';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import type { InviteMemberProps } from '@/components/modal/types';
import type { InviteMemberInput } from '@/schemas/invitation';
import { inviteMemberSchema } from '@/schemas/invitation';
import useKabanaStore from '@/stores/store';
/**
 * 구성원 초대 모달 컴포넌트
 *
 * @param {number} props.dashboardId - 초대할 대시보드의 ID
 *
 * @description
 * - 대시보드에 이메일을 입력하여 구성원을 초대하는 폼 입니다.
 * - 초대 요청 성공 시 해당 이메일을 가진 유저에게 초대가 갑니다.
 */
const InviteMember = ({ dashboardId }: InviteMemberProps) => {
  const modalIsOpen = useKabanaStore((state) => state.inviteMember);
  const toggleModal = useKabanaStore((store) => store.toggleInviteMember);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<InviteMemberInput>({
    resolver: zodResolver(inviteMemberSchema),
  });
  const email = watch('email');
  const onSubmit = async (data: InviteMemberInput) => {
    try {
      await inviteMember(dashboardId, data);
      toggleModal();
      reset();
    } catch (err) {
      console.error('🩺구성원 초대 실패:', err);
    }
  };

  return (
    <Dialog.Root
      className='w-327 rounded-lg px-16 py-24 tablet:w-568 tablet:px-24'
      modalIsOpen={modalIsOpen}
      toggleModal={toggleModal}
    >
      <Dialog.Close resetContent={reset} toggleModal={toggleModal} />
      <Dialog.Title className='text-xl font-bold tablet:text-2xl'>초대하기</Dialog.Title>
      <Dialog.Content className='pt-16 pb-24 tablet:pt-24'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
          <label className='text-lg tablet:text-2lg'>이메일</label>
          <input
            {...register('email')}
            className='rounded-lg border border-gray-300 px-16 py-12 text-md'
            placeholder='user@email.com'
            type='email'
          />
          {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
        </form>
      </Dialog.Content>
      <Dialog.ButtonArea>
        <Button className='w-full rounded-lg' disabled={!email?.trim()} size='lg' type='submit' variant='filled'>
          생성
        </Button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default InviteMember;
