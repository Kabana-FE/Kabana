import { deleteColumn } from '@/apis/column';
import useKabanaStore from '@/stores/store';

import Button from '../common/button';
import Dialog from '../common/dialog';
import type { DeleteAlertProps } from './types';
/**
 * @description 컬럼 삭제를 확인하는 모달 컴포넌트입니다.
 *
 * @param {DeleteAlertProps} props
 * @param {number} props.columnId - 삭제할 대상 컬럼의 ID
 *
 * @description
 * - 사용자가 컬럼 삭제를 시도할 때 경고 메시지를 띄워 확인을 받는 모달입니다.
 * - 삭제 버튼 클릭 시 서버에 컬럼 삭제 요청을 보내고, 성공 시 모달을 닫습니다.
 * - 취소 버튼을 누르면 단순히 모달이 닫힙니다.
 */
const DeleteAlert = ({ columnId }: DeleteAlertProps) => {
  const modalIsOpen = useKabanaStore((state) => state.deleteAlert);
  const toggleModal = useKabanaStore((store) => store.toggleDeleteAlert);

  const handleDelete = async () => {
    try {
      await deleteColumn(columnId);
      toggleModal();
    } catch (error) {
      console.error('컬럼 삭제 실패:', error);
    }
  };

  return (
    <Dialog.Root
      className='w-327 rounded-2xl px-16 py-24 tablet:w-568 tablet:px-24'
      modalIsOpen={modalIsOpen}
      toggleModal={toggleModal}
    >
      <Dialog.Content className='pb-32 text-center text-lg font-medium tablet:pb-40 tablet:text-xl'>
        컬럼의 모든 카드가 삭제됩니다.
      </Dialog.Content>
      <Dialog.ButtonArea className='flex gap-8'>
        <Button className='w-full rounded-lg' size='lg' variant='outlined' onClick={toggleModal}>
          취소
        </Button>
        <Button className='w-full rounded-lg' size='lg' type='submit' variant='filled' onClick={handleDelete}>
          삭제
        </Button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default DeleteAlert;
