import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import useKabanaStore from '@/stores/store';

import Color from '../color';

const CreateDashboard = () => {
  const modalIsOpen = useKabanaStore((state) => state.createDashboard);
  const toggleModal = useKabanaStore((store) => store.toggleCreateDashboard);
  return (
    <Dialog.Root
      className='w-327 rounded-lg px-16 py-20 tablet:w-568 tablet:p-32'
      modalIsOpen={modalIsOpen}
      toggleModal={toggleModal}
    >
      <Dialog.Close toggleModal={toggleModal} />
      <Dialog.Title className='text-xl font-bold tablet:text-2xl'>새로운 대시보드</Dialog.Title>
      <Dialog.Content className='pt-16 pb-24 tablet:pt-24'>
        <form className='flex flex-col gap-8'>
          <label className='text-lg tablet:text-2lg'>대시보드 이름</label>
          <input
            className='rounded-lg border border-gray-300 px-16 py-12 text-md'
            placeholder='뉴프로젝트'
            type='text'
          />
          <Color />
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

export default CreateDashboard;
