import { FileUpload, Text, TextArea } from './internals';
import type { FieldProps } from './types';

const componentMap: Record<'textarea' | 'file', React.ElementType> = {
  textarea: TextArea,
  file: FileUpload,
};

const Field = ({ type = 'text', ...props }: FieldProps) => {
  const Component = type in componentMap ? componentMap[type as keyof typeof componentMap] : Text;

  return <Component type={type} {...props} />;
};

export default Field;
