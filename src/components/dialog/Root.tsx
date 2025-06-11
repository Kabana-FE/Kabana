import { Children } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

import Close from './Close';
import Title from './Title';
import type { DialogRootProp } from './types';

const Root = ({ children, className, modalIsOpen, toggleModal }: DialogRootProp) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  const _children = Children.toArray(children) as React.ReactElement[];
  const [title, close] = [
    _children.find((child) => child.type === Title),
    _children.find((child) => child.type === Close),
  ];
  const exceptTitleArea = [_children.filter((child) => child.type !== Title && child.type !== Close)];
  if (!modalIsOpen) {
    return null;
  }

  return createPortal(
    <div
      className='absolute z-50 h-screen w-screen bg-black/50'
      onClick={() => {
        toggleModal();
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

export default Root;
