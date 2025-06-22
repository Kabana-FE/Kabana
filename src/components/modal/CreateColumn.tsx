import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Form, useFetcher } from 'react-router';

import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Input from '@/components/common/input';
import type { CreateColumnProps } from '@/components/modal/types';
import TOAST_MESSAGES from '@/constants/messages/toastMessages';
import { useToast } from '@/hooks/useToast';
import type { CreateColumnInput } from '@/schemas/column';
import { createColumnSchema } from '@/schemas/column';
/**
 * 새로운 컬럼을 생성하는 모달 컴포넌트
 *
 * @param {number} dashboardId - 컬럼이 생성될 대상 대시보드의 ID
 * @param {boolean} isModalOpen - 모달의 열림 여부
 * @param {() => void} toggleModal - 모달의 열람/닫힘 상태를 토글하는 함수
 *
 * @description
 * - 사용자는 제목을 입력하여 컬럼을 생성할 수 있습니다.
 */
const CreateColumn = ({ dashboardId, isModalOpen, toggleModal }: CreateColumnProps) => {
  const { showSuccess, showError } = useToast();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateColumnInput>({
    resolver: zodResolver(createColumnSchema),
  });
  const title = useWatch({ control, name: 'title' });
  const onSubmit = async (data: CreateColumnInput) => {
    const formData = new FormData();
    formData.append('intent', 'createColumn');
    formData.append('dashboardId', String(dashboardId));
    formData.append('title', data.title);

    fetcher.submit(formData, { method: 'post' });
    toggleModal();
  };

  useEffect(() => {
    if (fetcher.data?.success) {
      showSuccess(TOAST_MESSAGES.API.CREATE_SUCCESS('컬럼'));
      reset();
      toggleModal();
    }
    if (fetcher.data?.error) {
      showError(TOAST_MESSAGES.API.CREATE_FAILURE('컬럼'));
    }
  }, [fetcher.data]);

  return (
    <Dialog.Root
      className='w-327 rounded-lg px-16 py-24 tablet:w-568 tablet:px-24'
      isModalOpen={isModalOpen}
      toggleModal={isSubmitting ? () => {} : toggleModal}
    >
      <Dialog.Close resetContent={reset} toggleModal={toggleModal} />
      <Dialog.Title className='text-xl font-bold tablet:text-2xl'>새 컬럼 생성</Dialog.Title>
      <Dialog.Content className='pt-16 pb-24 tablet:pt-24'>
        <Form className='flex flex-col gap-8' id='createColumn' onSubmit={handleSubmit(onSubmit)}>
          <Input.Root>
            <Input.Label className='tablet:text-2lg' htmlFor='title'>
              이름
            </Input.Label>
            <Input.Field id='title' {...register('title')} placeholder='새 컬럼 이름' type='text' />
            <Input.ErrorMessage>{errors.title?.message}</Input.ErrorMessage>
          </Input.Root>
        </Form>
      </Dialog.Content>
      <Dialog.ButtonArea>
        <Button
          className='w-full rounded-lg'
          disabled={!title?.trim() || isSubmitting}
          form='createColumn'
          size='lg'
          type='submit'
          variant='filled'
        >
          {isSubmitting ? '생성 중' : '생성'}
        </Button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default CreateColumn;
