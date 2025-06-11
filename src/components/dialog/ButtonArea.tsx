import type { DialogProp } from './types';

const ButtonArea = ({ children, className }: DialogProp) => {
  return <div className={className}>{children}</div>;
};
export default ButtonArea;
