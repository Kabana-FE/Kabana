import type TagType from './types';
const Tag = ({ children, className }: TagType) => {
  return <span className={className}>{children}</span>;
};

export default Tag;
