import useKabanaStore from '@/stores/store';

import Button from '../common/button';
import Dialog from '../common/dialog';

const CreateColumn = () => {
  const modalIsOpen = useKabanaStore((state) => state.createColumn);
  const toggleModal = useKabanaStore((store) => store.toggleCreateColumn);

  return (
    <Dialog.Root
      className='w-327 rounded-lg px-16 py-24 tablet:w-568 tablet:px-24'
      modalIsOpen={modalIsOpen}
      toggleModal={toggleModal}
    >
      <Dialog.Close toggleModal={toggleModal} />
      <Dialog.Title className='text-xl font-bold tablet:text-2xl'>새 컬럼 생성</Dialog.Title>
      <Dialog.Content className='pt-16 pb-24 tablet:pt-24'>
        <form className='flex flex-col gap-8'>
          <label className='text-lg tablet:text-2lg'>이름</label>
          <input
            className='rounded-lg border border-gray-300 px-16 py-12 text-md'
            placeholder='새 컬럼 이름'
            type='text'
          />
        </form>
      </Dialog.Content>
      <Dialog.ButtonArea>
        <Button className='w-full rounded-lg' size='lg' type='submit' variant='filled'>
          생성
        </Button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default CreateColumn;
