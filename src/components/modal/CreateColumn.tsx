import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createColumn } from '@/apis/column';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import type { CreateColumnProps } from '@/components/modal/types';
import type { CreateColumnInput } from '@/schemas/column';
import { createColumnSchema } from '@/schemas/column';
import useKabanaStore from '@/stores/store';
/**
 * @description 새로운 컬럼을 생성하는 모달 컴포넌트입니다.
 *
 * @param {CreateColumnProps} props
 * @param {number} props.dashboardId - 컬럼이 생성될 대상 대시보드의 ID
 *
 * @description
 * - 사용자는 제목을 입력하여 컬럼을 생성할 수 있습니다.
 */
const CreateColumn = ({ dashboardId }: CreateColumnProps) => {
  const modalIsOpen = useKabanaStore((state) => state.createColumn);
  const toggleModal = useKabanaStore((store) => store.toggleCreateColumn);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateColumnInput>({
    resolver: zodResolver(createColumnSchema),
  });
  const title = watch('title');
  const onSubmit = async (data: CreateColumnInput) => {
    const payload = { ...data, dashboardId };
    try {
      await createColumn(payload);
      toggleModal();
      reset();
    } catch (err) {
      console.error('컬럼 생성 실패:', err);
    }
  };

  return (
    <Dialog.Root
      className='w-327 rounded-lg px-16 py-24 tablet:w-568 tablet:px-24'
      modalIsOpen={modalIsOpen}
      toggleModal={toggleModal}
    >
      <Dialog.Close resetContent={reset} toggleModal={toggleModal} />
      <Dialog.Title className='text-xl font-bold tablet:text-2xl'>새 컬럼 생성</Dialog.Title>
      <Dialog.Content className='pt-16 pb-24 tablet:pt-24'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
          <label className='text-lg tablet:text-2lg'>이름</label>
          <input
            {...register('title')}
            className='rounded-lg border border-gray-300 px-16 py-12 text-md'
            placeholder='새 컬럼 이름'
            type='text'
          />
        </form>
        {errors.title && <span className='text-sm text-red-500'>{errors.title.message}</span>}
      </Dialog.Content>
      <Dialog.ButtonArea>
        <Button className='w-full rounded-lg' disabled={!title?.trim()} size='lg' type='submit' variant='filled'>
          생성
        </Button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default CreateColumn;
