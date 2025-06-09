import { Children, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

import useKabanaStore from '@/stores/store';

import type DialogProp from './types';
/**
 * Dialog 모달의 루트 컴포넌트입니다.
 *
 * @component
 * @param {string} [className] - 모달의 전체 스타일을 커스텀할 때 사용합니다.
 *
 * @remarks
 * - `<Dialog.Root>`는 필수로 포함되어야 합니다.
 * - 내부에는 최소 하나 이상의 서브 컴포넌트가 포함되거나, 직접 너비와 높이를 지정해야 모달이 올바르게 표시됩니다.
 * - `<Dialog.Close />`는 항상 `<Dialog.Title />` 오른쪽에 고정되도록 구현되어 있습니다.
 *
 * @example
 * ```tsx
 * <Dialog.Root>
 *   <Dialog.Close /> // 항상 Title 오른쪽에 표시됨
 *   <Dialog.Title>타이틀</Dialog.Title>
 *   <Dialog.Content className="p-4">
 *     본문 내용
 *   </Dialog.Content>
 *   <Dialog.ButtonArea>
 *     <button>확인</button>
 *     <button>취소</button>
 *   </Dialog.ButtonArea>
 * </Dialog.Root>
 * ```
 */

const Root = ({ children, className }: DialogProp) => {
  const { toggleModal, setToggleModal } = useKabanaStore((state) => ({
    toggleModal: state.toggleModal,
    setToggleModal: state.setToggleModal,
  }));
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  const _children = Children.toArray(children) as ReactElement[];
  const [title, close] = [
    _children.filter((child) => child.type === Title),
    _children.filter((child) => child.type === Close),
  ];
  const exceptTitleArea = [_children.filter((child) => child.type !== Title && child.type !== Close)];
  if (!toggleModal) {
    return null;
  }

  return createPortal(
    <div
      className='absolute z-50 h-screen w-screen bg-black opacity-50'
      onClick={() => {
        setToggleModal();
      }}
    >
      <dialog open className={twMerge('inset-0 m-auto bg-white', className)} onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-between'>
          {title}
          {close}
        </div>
        {exceptTitleArea}
      </dialog>
    </div>,
    modalRoot,
  );
};
const Title = ({ children, className }: DialogProp) => {
  return <div className={twMerge('text-2xl text-gray-700', className)}>{children}</div>;
};

const Close = () => {
  const setToggleModal = useKabanaStore((state) => state.setToggleModal);
  return <button onClick={setToggleModal}>x</button>;
};

const Content = ({ children, className }: DialogProp) => {
  return <div className={className}>{children}</div>;
};
const ButtonArea = ({ children, className }: DialogProp) => {
  return <div className={className}>{children}</div>;
};

export default {
  Root: Root,
  Title: Title,
  Close: Close,
  Content: Content,
  ButtonArea: ButtonArea,
};
