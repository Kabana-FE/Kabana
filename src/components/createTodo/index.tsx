import Dialog from '@/components/dialog';
import useKabanaStore from '@/stores/store';

const CreateTodo = () => {
  const createTodo = useKabanaStore((state) => state.createTodo);
  const toggleCreateTodo = useKabanaStore((state) => state.toggleCreateTodo);
  return (
    <Dialog.Root
      className='w-327 rounded-2xl px-16 py-24 tablet:w-584'
      setToggleModal={() => {
        toggleCreateTodo();
      }}
      toggleModal={createTodo}
    >
      <Dialog.Title className='text-[16px] font-bold'>제목입니다</Dialog.Title>
      <Dialog.Content className='my-32' />
      <Dialog.ButtonArea className='flex justify-between'>
        <button onClick={() => toggleCreateTodo()}>취소</button>
        <button>생성</button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default CreateTodo;
