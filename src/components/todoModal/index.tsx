import useKabanaStore from '@/stores/store';

import Dialog from '../dialog';
import type TodoModalType from './types';
/**
 * TodoModal 컴포넌트는 할 일과 관련된 내용을 입력받는 모달 UI를 렌더링합니다.
 *
 * @component
 * @param {string} [title='할일 관련모달'] - 모달 상단에 표시될 제목입니다.
 * @param {() => void} [onSubmit] - "생성" 버튼 클릭 시 실행될 콜백 함수입니다.
 * @param {React.ReactNode} [children] - 모달 본문 영역에 삽입될 React 엘리먼트입니다.
 *
 * @example
 * <TodoModal
 *   title="할 일 추가"
 *   onSubmit={handleSubmit}
 * >
 *   <input type="text" placeholder="할 일을 입력하세요" />
 * </TodoModal>
 */

const TodoModal = ({ title = '할일 관련모달', onSubmit, children }: TodoModalType) => {
  const setToggleModal = useKabanaStore((state) => state.setToggleModal);
  return (
    <Dialog.Root className='w-327 rounded-2xl px-16 py-24 tablet:w-584'>
      <Dialog.Title className='text-[16px] font-bold'>{title}</Dialog.Title>
      <Dialog.Content className='my-32'>{children}</Dialog.Content>
      <Dialog.ButtonArea className='flex justify-between'>
        <button onClick={setToggleModal}>취소</button>
        <button onClick={onSubmit}>생성</button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default TodoModal;
