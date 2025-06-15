import { FileUpload, Text, TextArea } from './internals';
import type { FieldProps } from './types';

const compoentMap: Record<string, React.ElementType> = {
  textarea: TextArea,
  file: FileUpload,
};

const Field = ({ type = 'text', ...props }: FieldProps) => {
  const Component = compoentMap[type] ?? Text;

  return <Component type={type} {...props} />;
};

export default Field;
