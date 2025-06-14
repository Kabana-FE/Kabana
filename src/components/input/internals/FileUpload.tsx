import { twMerge } from 'tailwind-merge';

import type { FileUploadProps } from '@/components/input/types';

const FileUpload = ({ className, type, ...props }: FileUploadProps) => {
  return <input className={twMerge('sr-only', className)} type={type} {...props} />;
};

export default FileUpload;
