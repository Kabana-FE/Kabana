import CloseIcon from '@/assets/icons/CloseIcon';

import type { DialogCloseProp } from './types';

const Close = ({ toggleModal }: DialogCloseProp) => {
  return (
    <button onClick={() => toggleModal()}>
      <CloseIcon size={12.9} />
    </button>
  );
};

export default Close;
