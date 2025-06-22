import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useFetcher } from 'react-router-dom';

import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Input from '@/components/common/input';
import type { InviteMemberProps } from '@/components/modal/types';
import TOAST_MESSAGES from '@/constants/messages/toastMessages';
import { useToast } from '@/hooks/useToast';
import type { InviteMemberInput } from '@/schemas/invitation';
import { inviteMemberSchema } from '@/schemas/invitation';

const InviteMember = ({ dashboardId, isModalOpen, toggleModal, onInviteSuccess }: InviteMemberProps) => {
  const { showSuccess } = useToast();
  const fetcher = useFetcher();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<InviteMemberInput>({
    resolver: zodResolver(inviteMemberSchema),
  });

  const email = useWatch({ control, name: 'email' });
  const isSubmitting = fetcher.state === 'submitting';

  const onInviteMember = (data: InviteMemberInput) => {
    const formData = new FormData();
    formData.append('intent', 'inviteMember');
    formData.append('email', data.email);
    fetcher.submit(formData, { method: 'post' });
    toggleModal();
  };

  useEffect(() => {
    if (fetcher.data) {
      showSuccess(TOAST_MESSAGES.INVITATION.SUCCESS(email));
      reset();
      toggleModal();
      onInviteSuccess?.();
    }
  }, [fetcher.data]);

  return (
    <Dialog.Root
      className='w-327 rounded-lg px-16 py-24 tablet:w-568 tablet:px-24'
      isModalOpen={isModalOpen}
      toggleModal={isSubmitting ? () => {} : toggleModal}
    >
      <Dialog.Close resetContent={reset} toggleModal={toggleModal} />
      <Dialog.Title className='text-xl font-bold tablet:text-2xl'>초대하기</Dialog.Title>
      <Dialog.Content className='pt-16 pb-24 tablet:pt-24'>
        <fetcher.Form
          action={`/dashboards/${dashboardId}/edit`}
          className='flex flex-col gap-8'
          id='inviteMember'
          method='post'
          onSubmit={handleSubmit(onInviteMember)}
        >
          <input name='intent' type='hidden' value='inviteMember' />
          <Input.Root>
            <Input.Label className='tablet:text-2lg' htmlFor='email'>
              이메일
            </Input.Label>
            <Input.Field id='email' placeholder='user@email.com' type='email' {...register('email')} />
            <Input.ErrorMessage>{errors.email?.message}</Input.ErrorMessage>
          </Input.Root>
        </fetcher.Form>
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
