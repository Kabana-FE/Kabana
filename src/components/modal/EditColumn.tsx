import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';

import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Input from '@/components/common/input';
import type { EditColumnProps } from '@/components/modal/types';
import TOAST_MESSAGES from '@/constants/messages/toastMessages';
import { useToast } from '@/hooks/useToast';
import type { UpdateColumnInput } from '@/schemas/column';
import { updateColumnSchema } from '@/schemas/column';
/**
 * 컬럼 수정 및 삭제 모달 컴포넌트
 *
 * @param {number} columnId - 수정 또는 삭제할 대상 컬럼의 ID
 * @param {string} initialTitle - 수정 폼에 표시될 기존 컬럼 제목
 * @param {boolean} isModalOpen - 모달의 열림 여부
 * @param {() => void} toggleModal - 모달의 열람/닫힘 상태를 토글하는 함수
 * @param {() => void} toggleDeleteAlert - 삭제 모달의 열람/닫힘 상태를 토글하는 함수
 *
 * @description
 * - 사용자는 제목을 수정하여 컬럼 정보를 업데이트하거나,
 * - 삭제 버튼을 클릭해 삭제 확인 모달(`DeleteAlert`)을 열 수 있습니다.
 */
const EditColumn = ({ columnId, initialTitle, isModalOpen, toggleModal, toggleDeleteAlert }: EditColumnProps) => {
  const { showSuccess, showError } = useToast();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateColumnInput>({
    resolver: zodResolver(updateColumnSchema),
    defaultValues: {
      title: initialTitle,
    },
  });

  const onSubmit = (data: UpdateColumnInput) => {
    const formData = new FormData();
    formData.append('intent', 'editColumn');
    formData.append('title', data.title);
    formData.append('columnId', String(columnId));

    fetcher.submit(formData, { method: 'post' });
    toggleModal();
  };

  useEffect(() => {
    if (fetcher.data?.success) {
      showSuccess(TOAST_MESSAGES.API.UPDATE_SUCCESS('컬럼'));
      reset();
      toggleModal();
    }
    if (fetcher.data?.error) {
      showError(fetcher.data.error || TOAST_MESSAGES.API.UPDATE_FAILURE('컬럼'));
    }
  }, [fetcher.data]);

  return (
    <Dialog.Root
      className='w-327 rounded-lg px-16 py-24 tablet:w-568 tablet:px-24'
      isModalOpen={isModalOpen}
      toggleModal={isSubmitting ? () => {} : toggleModal}
    >
      <Dialog.Close resetContent={reset} toggleModal={toggleModal} />
      <Dialog.Title className='text-xl font-bold tablet:text-2xl'>컬럼 관리</Dialog.Title>
      <Dialog.Content className='pt-16 pb-24 tablet:pt-24'>
        <form className='flex flex-col gap-8' id='editColumn' onSubmit={handleSubmit(onSubmit)}>
          <Input.Root>
            <Input.Label className='tablet:text-2lg' htmlFor='title'>
              이름
            </Input.Label>
            <Input.Field id='title' {...register('title')} placeholder={initialTitle} type='text' />
            <Input.ErrorMessage>{errors.title?.message}</Input.ErrorMessage>
          </Input.Root>
        </form>
      </Dialog.Content>
      <Dialog.ButtonArea className='flex gap-8'>
        <Button
          className='w-full rounded-lg'
          size='lg'
          variant='outlined'
          onClick={() => {
            toggleModal();
            toggleDeleteAlert();
          }}
        >
          삭제
        </Button>
        <Button
          className='w-full rounded-lg'
          disabled={isSubmitting}
          form='editColumn'
          size='lg'
          type='submit'
          variant='filled'
        >
          {isSubmitting ? '변경 중' : '변경'}
        </Button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default EditColumn;
