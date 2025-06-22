import type { DialogProp } from './types';

const Content = ({ children, className }: DialogProp) => {
  return <div className={className}>{children}</div>;
};

export default Content;
