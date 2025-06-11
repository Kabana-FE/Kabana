import type { DialogCloseProp } from './types';

const Close = ({ toggleModal }: DialogCloseProp) => {
  return <button onClick={() => toggleModal()}>x</button>;
};

export default Close;
