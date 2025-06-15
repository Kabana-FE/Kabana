export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export interface ErrorMessageProps {
  className?: string;
  children: React.ReactNode;
}

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isInvalid?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'autoComplete'> {
  type: 'textarea';
}

export interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'file';
}

export type FieldProps = TextInputProps | TextAreaProps | FileUploadProps;

export interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
