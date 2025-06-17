import CloseIcon from '@/assets/icons/CloseIcon';

import type { DialogCloseProp } from './types';

const Close = ({ toggleModal, resetContent }: DialogCloseProp) => {
  return (
    <button
      aria-label='닫기'
      onClick={() => {
        toggleModal();
        if (resetContent) {
          resetContent();
        }
      }}
    >
      <CloseIcon className='w-13 tablet:w-14' />
    </button>
  );
};

export default Close;
