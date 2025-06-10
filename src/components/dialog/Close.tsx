import type { DialogCloseProp } from './types';

const Close = ({ setToggleModal }: DialogCloseProp) => {
  return <button onClick={() => setToggleModal()}>x</button>;
};

export default Close;
