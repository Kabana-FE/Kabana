import useKabanaStore from '@/stores/store';

import Button from '../common/button';
import Dialog from '../common/dialog';

const InviteMember = () => {
  const modalIsOpen = useKabanaStore((state) => state.inviteMember);
  const toggleModal = useKabanaStore((store) => store.toggleInviteMember);
  return (
    <Dialog.Root
      className='w-327 rounded-lg px-16 py-24 tablet:w-568 tablet:px-24'
      modalIsOpen={modalIsOpen}
      toggleModal={toggleModal}
    >
      <Dialog.Close toggleModal={toggleModal} />
      <Dialog.Title className='text-xl font-bold tablet:text-2xl'>초대하기</Dialog.Title>
      <Dialog.Content className='pt-16 pb-24 tablet:pt-24'>
        <form className='flex flex-col gap-8'>
          <label className='text-lg tablet:text-2lg'>이메일</label>
          <input
            className='rounded-lg border border-gray-300 px-16 py-12 text-md'
            placeholder='user@email.com'
            type='email'
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

export default InviteMember;
