import { Children, type PropsWithChildren, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

import useKabanaStore from '@/stores/store';

import { type DialogProp } from './types';
/**
 * @property {string} [style] - <Dialog.Close/>를 제외한 나머지 요소에 style prop으로 커스텀이 가능합니다다
 * // <Dialog.Root>는 필수적으로 들어가야 하고, 나머지 요소는 선택사항입니다
 * @example
 * <Dialog.Root>
 *  <Dialog.Close/> => 이것처럼 처음 쓰셔도 무조건 타이들 옆에 들어가도록 해놨습니다.
 *  <Dialog.Title> ==> Title과 Close는 style props로 커스텀이 불가능합니다.
 *  <Dialog.Contents style="ddddd">
 *    본문 내용이 들어갑니다.
 *  <Dialog.Contents/>
 *  <Dialog.ButtonArea>
 *    버튼들이 들어갑니다
 *  <Dialog.ButtonArea/>
 * <Dialog.Root>
 *
 */
const Root = ({ children }: PropsWithChildren) => {
  const isOpen = useKabanaStore((state) => state.isOpen);
  const setIsOpen = useKabanaStore((state) => state.setIsOpen);
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  const _children = Children.toArray(children) as ReactElement[];
  const [title, close] = [
    _children.filter((child) => child.type === Title),
    _children.filter((child) => child.type === Close),
  ];
  const exceptTitleArea = [_children.filter((child) => child.type !== Title && child.type !== Close)];
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className='absolute z-50 h-screen w-screen bg-black opacity-50'
      onClick={() => {
        setIsOpen();
      }}
    >
      <dialog open className='fixed inset-0 m-auto w-fit bg-white' onClick={(e) => e.stopPropagation()}>
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
const Title = ({ children, style }: DialogProp) => {
  return <div className={twMerge(`text-2xl text-gray-700 ${style}`)}>{children}</div>;
};

const Close = () => {
  const setIsOpen = useKabanaStore((state) => state.setIsOpen);
  return <button onClick={setIsOpen}>x</button>;
};

const Content = ({ children, style }: DialogProp) => {
  return <div className={twMerge(`${style}`)}>{children}</div>;
};
const ButtonArea = ({ children, style }: DialogProp) => {
  return <div className={twMerge(`${style}`)}>{children}</div>;
};

export default {
  Root: Root,
  Title: Title,
  Close: Close,
  Content: Content,
  ButtonArea: ButtonArea,
};
