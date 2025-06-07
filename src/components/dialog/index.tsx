import { Children, type PropsWithChildren, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from 'zustand';

import useDashBoardStore from '@/stores/store';

import { type DialogProp } from './types';

const Root = ({ children }: PropsWithChildren) => {
  const isOpen = useStore(useDashBoardStore, (state) => state.isOpen);
  const setIsOpen = useStore(useDashBoardStore, (state) => state.setIsOpen);
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
  return <div className={`text-2xl text-gray-700 ${style}`}>{children}</div>;
};

const Close = () => {
  return <button>x</button>;
};

const Content = ({ children, style }: DialogProp) => {
  return <div className={style}>{children}</div>;
};
const ButtonArea = ({ children, style }: DialogProp) => {
  return <div className={style}>{children}</div>;
};

export default {
  Root: Root,
  Title: Title,
  Close: Close,
  Content: Content,
  ButtonArea: ButtonArea,
};
