import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateColumn } from '@/apis/column';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Input from '@/components/common/input';
import type { EditColumnProps } from '@/components/modal/types';
import type { UpdateColumnInput } from '@/schemas/column';
import { updateColumnSchema } from '@/schemas/column';
import useKabanaStore from '@/stores/store';
/**
 * @description 컬럼 제목을 수정하거나 컬럼을 삭제할 수 있는 모달 컴포넌트입니다.
 *
 * @param {EditColumnProps} props
 * @param {number} props.columnId - 수정 또는 삭제할 대상 컬럼의 ID
 * @param {string} props.initialTitle - 수정 폼에 표시될 기존 컬럼 제목
 *
 * @description
 * - 사용자는 제목을 수정하여 컬럼 정보를 업데이트하거나,
 * - 삭제 버튼을 클릭해 삭제 확인 모달(`DeleteAlert`)을 열 수 있습니다.
 */
const EditColumn = ({ columnId, initialTitle }: EditColumnProps) => {
  const modalIsOpen = useKabanaStore((state) => state.editColumn);
  const toggleEditColumn = useKabanaStore((store) => store.toggleEditColumn);
  const toggleDeleteAlert = useKabanaStore((store) => store.toggleDeleteAlert);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateColumnInput>({
    resolver: zodResolver(updateColumnSchema),
    defaultValues: {
      title: initialTitle,
    },
  });

  const onSubmit = async (data: UpdateColumnInput) => {
    try {
      await updateColumn(columnId, data);
      toggleEditColumn();
      reset();
    } catch (err) {
      console.error('🩺컬럼 수정 실패:', err);
    }
  };

  return (
    <Dialog.Root
      className='w-327 rounded-lg px-16 py-24 tablet:w-568 tablet:px-24'
      modalIsOpen={modalIsOpen}
      toggleModal={isSubmitting ? () => {} : toggleEditColumn}
    >
      <Dialog.Close resetContent={reset} toggleModal={toggleEditColumn} />
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
            toggleEditColumn();
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
