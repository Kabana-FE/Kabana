import { twMerge } from 'tailwind-merge';

import type { ErrorMessageProps } from './types';

const ErrorMessage = ({ children, className }: ErrorMessageProps) => {
  if (!children) return null;

  return <p className={twMerge('text-md text-red', className)}>{children}</p>;
};

export default ErrorMessage;
