import { deleteColumn } from '@/apis/column';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import type { DeleteAlertProps } from '@/components/modal/types';
import TOAST_MESSAGES from '@/constants/messages/toastMessages';
import { useToast } from '@/hooks/useToast';
/**
 * 컬럼 삭제를 확인하는 모달 컴포넌트
 *
 * @param {number} columnId - 삭제할 대상 컬럼의 ID
 * @param {boolean} isModalOpen - 모달의 열림 여부
 * @param {() => void} toggleModal - 모달의 열람/닫힘 상태를 토글하는 함수
 *
 * @description
 * - 사용자가 컬럼 삭제를 시도할 때 경고 메시지를 띄워 확인을 받는 모달입니다.
 * - 삭제 버튼 클릭 시 서버에 컬럼 삭제 요청을 보내고, 성공 시 모달을 닫습니다.
 * - 취소 버튼을 누르면 단순히 모달이 닫힙니다.
 */
const DeleteAlert = ({ columnId, isModalOpen, toggleModal }: DeleteAlertProps) => {
  const { showSuccess, showError } = useToast();
  const handleDelete = async () => {
    try {
      await deleteColumn(columnId);
      toggleModal();
      showSuccess(TOAST_MESSAGES.API.DELETE_SUCCESS('컬럼'));
    } catch (error) {
      showError(TOAST_MESSAGES.API.DELETE_FAILURE('컬럼'));
      console.error('🩺컬럼 삭제 실패:', error);
    }
  };

  return (
    <Dialog.Root
      className='w-327 rounded-2xl px-16 py-24 tablet:w-568 tablet:px-24'
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
    >
      <Dialog.Content className='pb-32 text-center text-lg font-medium tablet:pb-40 tablet:text-xl'>
        컬럼의 모든 카드가 삭제됩니다. 정말 삭제할까요?
      </Dialog.Content>
      <Dialog.ButtonArea className='flex gap-8'>
        <Button className='w-full rounded-lg' size='lg' variant='outlined' onClick={toggleModal}>
          취소
        </Button>
        <Button className='w-full rounded-lg' size='lg' variant='filled' onClick={handleDelete}>
          삭제
        </Button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default DeleteAlert;
